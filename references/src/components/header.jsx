import React,{useEffect,useState} from "react";
import { Link,useNavigate } from "react-router-dom";
import logo from '../images/icons/asu_logo.svg';
import axios from "axios";

function Header () {

    const navigate = useNavigate();
    const [data,setData] = useState([{}]);
    useEffect(() => {
        const checkAuth = async () => {
          try {
            const response = await fetch('/api/auth');
            const data = await response.json();
    
            if (data.authenticated) {
            setData(data);
            console.log(data);
            }
          } catch (error) {
            console.error('Ошибка проверки аутентификации:', error);
          }
        };
    
        checkAuth();
      }, [navigate]);
    
    const logout = async(e) => { 
    e.preventDefault();
    const formData = "";
    axios.post("/logout", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
        })
        .then((res) => {
        if(res.data.data=="OK") { window.location.reload()};
        console.log(res.data.data);
        })
        .catch((err) => {
        console.log(err);
        });
    }
    function handleChange(e) {
    const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    return console.log(regex.test(e));
    };
        return (
            <div className="App">
            <div className="wrapper">
                <header className="header">
                <div className="container">
                    <div className="header__body">
                    <div className="header__left-block">
                        <div className="header__burger">
                        <div className="burger-hover"></div>
                        <span></span>
                        </div>
                        <a href="/" className="header__logo">
                        <img src={logo} alt="" />
                        </a>
                        <div className="header__title">Портал студента агу</div>
                    </div>
                    <nav className="header__menu">
                        <ul className="header__list">
                        <li>
                            <a href={(data.authenticated) ? ("/") : ("/login")} onClick={(data.authenticated) ? logout : ""} className="header__link">{(data.authenticated) ? ("Выход") : ("Вход")}</a>
                        </li>
                        </ul>
                    </nav>
                    </div>
                </div>
                </header>
                <div className="main__nav-bar">
                <div className="navigation">
                    <div className="nav__bar active">
                        <div className="nav__bar_inner">
                            <div className="nav__bar_scroll">
                            <nav className="nav__bar_menu">
                                <ul>
                                    <li className="nav__bar_menu-item active">
                                        <Link to="/" title="Главная">
                                            <i>
                                                <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg"xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                                    viewBox="0 0 24 24"  xmlSpace="preserve">
                                                    <path className="st0" d="M12,2.4L1.2,13.1h3.2v9.5h15.1v-9.5h3.2L12,2.4 M12,9.2c1.3,0,2.4,1.2,2.4,2.6s-1.1,2.6-2.4,2.6
                                                    s-2.4-1.2-2.4-2.6S10.7,9.2,12,9.2 M12,16.6c1.7,0,4.9,0.8,4.9,2.6V20H7.1v-0.8C7.1,17.5,10.3,16.6,12,16.6z" fill="#9E9E9E" stroke="#9E9E9E" strokeWidth="0.65"/>
                                                </svg>
                                            </i>Заказать справку
                                        </Link>	
                                    </li>
                                    <li id="map" className="nav__bar_menu-item">
                                        <a href="/map" title="Интерактивная карта">
                                            <i>
                                                <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                                <path className="st0" d="M19,11c-0.3-0.4-0.6-0.7-1-1c-0.8-0.8-1.8-1.3-2.6-2.1c-1.9-1.9-2.2-4.9-1.1-7.3c-1.2,0.3-2.2,1-3.1,1.7
                                                c-3.2,2.6-4.5,7.3-3,11.3c0.1,0.1,0.1,0.3,0.1,0.4c0,0.3-0.2,0.5-0.4,0.6c-0.3,0.1-0.6,0.1-0.8-0.2c-0.1-0.1-0.1-0.1-0.2-0.2
                                                c-1.4-1.8-1.6-4.4-0.7-6.5c-2.1,1.7-3.2,4.6-3,7.4c0.1,0.6,0.1,1.3,0.3,1.9c0.2,0.8,0.5,1.5,0.9,2.2c1.3,2.2,3.6,3.8,6.1,4.1
                                                c2.7,0.3,5.5-0.2,7.6-2c2.3-2.1,3.1-5.5,1.9-8.4L20,12.6C19.7,12,19.4,11.5,19,11L19,11 M15.1,19c-0.4,0.3-0.9,0.6-1.4,0.8
                                                c-1.4,0.5-2.8-0.2-3.6-1c1.5-т0.4,2.4-1.5,2.7-2.6c0.2-1-0.2-1.9-0.3-2.8c-0.2-0.9-0.1-1.7,0.2-2.6c0.2,0.5,0.5,1,0.8,1.3
                                                c1,1.3,2.5,1.8,2.8,3.6c0.1,0.2,0.1,0.4,0.1,0.5C16.3,17.1,15.9,18.3,15.1,19L15.1,19z" fill="#9E9E9E" stroke="#9E9E9E" strokeWidth="0.65"/>
                                                </svg>
                                            </i>Интерактивная карта
                                        </a>
                                    </li>
                                    
                                </ul>
                            </nav>
                            <footer className="footer">
                                <div className="footer__nav">
                                    <div className="menu__title">
                                        О нас
                                    </div>
                                    <ul>
                                        <li className="footer__nav-item"><a className="inhr" href="https://www.asu.ru/univer_about/info/">Справка</a></li>
                                        <li className="footer__nav-item"><a className="inhr" href="https://www.asu.ru/graduate/">Политика АлтГУ</a></li>
                                        <li className="footer__nav-item"><a className="inhr" href="https://www.asu.ru/univer_about/info/documents/1011/">Правовая информация</a></li>
                                    </ul>
                                </div>
                                <div className="footer__copyright">
                                    <div>©&nbsp;АлтГУ&nbsp;2024</div>
                                </div>
                            </footer>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            
            </div>
        );
}

export default Header;