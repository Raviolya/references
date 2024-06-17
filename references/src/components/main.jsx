import React from "react";
import {Link} from 'react-router-dom';
import img1 from '../images/icons/1.png';
import img2 from '../images/icons/2.png';
import img3 from '../images/icons/3.png';
import img4 from '../images/icons/4.png';
import img5 from '../images/icons/5.png';
import img6 from '../images/icons/image 5.png';

class Main extends React.Component {
    render() {
        return (
        <div className="content">
        <div className="container-body">
            <div className="input__request">
            <input type="text" className="request__input" placeholder="Введите хоть что-то..."/>
            <img className='send__request' src={img6} alt="" />
            </div>
        <div className="body__title">
            здесь вы можете заказать справку
        </div>
        <div className="references__wrapper">
            <div className="references__top">
            <a href="/references" className="references-item">
                <img src={img4} alt="" />
                <div className="ref__item-title">
                Справка с места учёбы
                </div>
            </a>
            <div className="references-item">
                <img src={img2} alt="" />
                <div className="ref__item-title">
                Академическая справка
                </div>
            </div>
            <div className="references-item">
                <img src={img5} alt="" />
                <div className="ref__item-title">
                Справка для военкомата
                </div>
            </div>
            </div>
            <div className="references__bottom">
            <a href="/financial_assistance" className="references-item">
                    <img src={img3} alt="" />
                    <div className="ref__item-title">
                    оформление материальной помощи
                    </div>
            </a>
            <div className="references-item">
                <img src={img1} alt="" />
                <div className="ref__item-title">
                оформление социальной стипендии
                </div>
            </div>
            </div>
        </div>
        </div>
        </div> 
        );
    }
}

export default Main;