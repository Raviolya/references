from flask import Flask, url_for, request, redirect,jsonify
from flask_mail import Mail, Message
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
from werkzeug.security import check_password_hash, generate_password_hash # для хэширования паролей
from datetime import datetime, timedelta

app = Flask(__name__)
#Настройка базы данных
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///kurs.db'
db=SQLAlchemy(app)

class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email=db.Column(db.String(50), nullable=False)
    data=db.Column(db.DateTime(20), default = datetime.utcnow)
    status=db.Column(db.String(5), default="Нет")

    def serialize(self):
        return {
            'id': self.id,
            'email': self.email,
            'data': self.data.strftime("%Y-%m-%d %H:%M"),
            'status': self.status,
        }
    

#Таблица зарегистрированных
class Users(db.Model, UserMixin):
    id= db.Column(db.Integer, primary_key=True)
    username= db.Column(db.String(128), nullable=False, unique = True)
    password = db.Column(db.String(255), nullable=False)


#Настройка SMTP сервера:
app.config["MAIL_SERVER"] = 'smtp.yandex.ru'
app.config["MAIL_PORT"]=465
app.config["MAIL_USE_TLS"] = False
app.config["MAIL_USERNAME"] = "ravil.ganibaev@yandex.ru"
app.config["MAIL_PASSWORD"] = "ncunyliapbhzklkv"
app.config["MAIL_USE_SSL"] = True
app.config['MAIL_DEFAULT_SENDER'] = 'ravil.ganibaev@yandex.ru' #адрес от которого будет отправляться письма о готовности справки
mail=Mail(app)

#Для сессий:
app.config['SECRET_KEY']='2d75155246883f023ee10d89cfae0663e3515f9a'

#Настройка авторизации
manager=LoginManager(app)



@manager.user_loader
def load_user(user_id):
    return Users.query.get(user_id)

@app.route('/api/auth')
@login_required
def auth():
    if current_user.is_authenticated:
        
        return jsonify({'authenticated': True, 'user_id': current_user.id})
    else:
        return jsonify({'authenticated': False})

@app.route('/login', methods=['POST'])
def login_page():
    if request.method == 'POST':
        username = request.form.get('username')
        user=Users.query.filter_by(username=username).first()
        password = request.form.get('password')
        if (user and password):
            if check_password_hash(user.password, password):
                login_user(user)
                return {"data": ["Данные успешно отправлены"]}
            else:
                 return {"data": ["Данные не отправлены"]}
        else:
            return {"data": ["Неверный логин или пароль"]}


@app.route("/logout", methods=["POST"])
@login_required
def logout():
    logout_user()
    return {"data": ["OK"]}


#Сбор данных с формы, отправка их на Email и в базу данных
@app.route("/send-email", methods=["POST"])
def send_email():
    if request.method == "POST":
        #Собираем данные с формы, передаём в сессии и отправляем на email
        fullname = request.form.get("fullname")
        phonenumber = request.form.get("phonenumber")
        email=request.form.get("email")

        militaryID='' # Есть ли военный билет
        appointment='' #Куда нужна справка
        appointment_value=request.form.getlist("appointment")
        for value in appointment_value:
            appointment+="\t" 
            appointment+=value
            appointment+="\n"
            if (value=="Военкомат"):
                appointment+="\t\t Есть военный билет?: "
                appointment+=request.form.get("militaryID")
                appointment+="\n"
            if (value=="Другое"):
                appointment+="\t\tДругое(куда): "
                appointment+=request.form.get("other")

        additionally='' # Дополнительно
        additionally_value=request.form.getlist("additionally")
        for value in additionally_value:
            additionally+="\t"
            additionally+=value
            additionally+='\n'
        
        quantity=request.form.get("quantity") #Сколько копий надо
        try:
            msg=Message("Сообщение", sender="ravil.ganibaev@yandex.ru", recipients=["ravil.ganibaev@yandex.ru"])
            msg.body = f'ФИО: {fullname}\nТелефон: {phonenumber}\nСправка: справка с места учёбы - {quantity} копии\nE-mail: {email}\nКуда: {appointment}\nДополнительно:\n {additionally}\n '
            mail.send(msg)
        except:
            pass

        #Добавляем в БД
        day=datetime.now()
        post=Post(email=email, data=day)
        try:
            db.session.add(post)
            db.session.commit()
            return {"data": ["Данные успешно отправлены"]}
        except:
            return 'При отправке данных произошла ошибка!'
    else:  return 'Ошибка'


#Отправка о готовности справок
@app.route("/notification")
def notification():
    posts=Post.query.all()
    for post in posts:
        try:
            if (post.status=="Да"):
                msg=Message("Сообщение", sender="ravil.ganibaev@yandex.ru", recipients=[post.email])
                msg.body = f'Ваша справка готова!{post.email}'
                mail.send(msg)
        except:
            continue
    return jsonify({'data': "OK"})
    
@app.route('/status')
@login_required
def status():
     posts = Post.query.all()
     updated_posts = []
     for post in posts:
                    n=3
                    send_date = post.data
                    if (send_date.weekday()==2 or send_date.weekday()==3 or send_date.weekday()==4):
                        n=5
                    elif send_date.weekday()==5:
                        n=4 
                    if ((datetime.now()-timedelta(days=n))>send_date):
                        post.status="Да"
                        db.session.commit()
                    updated_posts.append(post.serialize())
     return jsonify(updated_posts)


if (__name__=='__main__'):
    app.run(debug=True)


        