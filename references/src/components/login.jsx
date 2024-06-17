import React,{useEffect, useState} from "react";
import axios from "axios";
import { redirect } from "react-router-dom";
function Login () {
        const [errorMessage, setErrorMessage] = useState(null);
            const handleSubmitS = async(e) => {
           
            e.preventDefault();
            const form = document.getElementById("auth-form");
            const formData = new FormData(form);
            axios.post("/login", formData, {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              })
              .then((res) => {
                if(res.data.data=="Данные успешно отправлены") { window.location.href ="http://localhost:3000/moder"; };
                setErrorMessage(res.data.data);
                console.log(res.data.data);
              })
              .catch((err) => {
                console.log(err);
              });
            }
        
        return (
            <div className="auth-page">
                <div className="auth-container">
                    <div className="auth-header">
                    <h1>Вход</h1>
                    </div>
                    <form id="auth-form" className="auth-form" onSubmit={handleSubmitS} method="POST">
                        <label htmlFor={'username'}>Логин</label>
                        <input type="name" id="username" name="username" />
                        <label htmlFor={'password'}>Пароль</label>
                        <input type="password" id="password" name="password" />
                        <button type="submit">Войти</button>
                        {errorMessage && <span className='error'>{errorMessage}</span>}
                        <div className="auth-link">
                            <a href="#">Забыли пароль?</a>
                        </div>
                    </form>
                </div>
            </div>
        );
}

export default Login;