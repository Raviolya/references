import React,{useEffect,useState} from "react";
import { Link,useNavigate } from "react-router-dom";
import logo from '../images/icons/asu_logo.svg';
import axios from "axios";


function Moder () {
    const [data,setData] = useState([{}]);
    const [getData,setDataGet] = useState([{}]);
    const [notifData,setNotifData] = useState([{}]);
    
    

    const handleButton = async () => {
        try {
          const response = await fetch('/notification');
          const data = await response.json();
          if (data) {
          setNotifData(data);
          console.log(data);
          }
        } catch (error) {
          console.error('Ошибка отправки уведомления:', error);
        }
    };

    useEffect(() => {
      
        const checkAuth = async () => {
          try {
            const response = await fetch('/api/auth');
            const data = await response.json();
    
            if (data.authenticated) {
            setData(data);
              console.log(data);
            }
            else {
                window.location.href = "http://localhost:3000/";
            }
          } catch (error) {
            window.location.href = "http://localhost:3000/";
            console.error('Ошибка проверки аутентификации:', error);
          }
        };
        const getAuth = async () => {
            try {
                const response = await fetch('/status');
                const data = await response.json();
                if (data) {
                    setDataGet(data);
                    console.log(data);
                }
            } catch (error) {
              console.error('Ошибка получения данных:', error);
            }
          };
        checkAuth();
        getAuth();
      }, []);
        return (
            <div className="content">
                {data.authenticated && (
                <div className="container-body moder">
                    <h1>Таблица готовности справок</h1>
                        <table>
                            <thead>
                                <tr>
                                <th>Email</th>
                                <th>Дата отправки</th>
                                <th>Статус</th>
                                </tr>
                            </thead>
                            <tbody>
                            {getData.map(item => (
                                <tr>
                                <td>{item.email}</td>
                                <td>{item.data}</td>
                                <td class={(item.status=="Да")? "status-completed" : "status-pending"}>{(item.status=="Да") ? "Готово" : "В ожидании"}</td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                        <button className="notification__button" onClick={handleButton}>{(notifData.data == "OK") ? "Уведомления отправлены" : "Отправить уведомление о готовности"}</button>
                </div>
                )}
            </div>
        );
}

export default Moder;