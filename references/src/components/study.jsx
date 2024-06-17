import React, {useState, useEffect} from "react"
import axios from "axios";
import mic from '../images/icons/image 6.png';

function Study() {
        const [data,setData] = useState({});
        const handleSubmit = async(e) => { 
            e.preventDefault();
            const form = document.querySelector('form');
            const formData = new FormData(form);
            axios
              .post("/send-email", formData, {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              })
              .then((res) => {
                setData(res.data);
                console.log(res.data.data);
                console.log(res);

              })
              .catch((err) => {
                console.log(err);
              });
              setTimeout(() =>setData(""), 2000);
            }
        return (
        <div className="content">
            <div className="container-body">
                <div className="form__wrapper">
                <form onSubmit={handleSubmit} className="form" method="POST">
                    <div className="form__block-wrapper">
                        <div className="body__title study">
                            Форма оформления справки с места учёбы
                        </div>
                        <div className="form__input-wrapper">
                            <input id="input1" className="form__input"  type="text" name="fullname" placeholder=" " defaultValue={""} required />
                            <label htmlFor="input1" className="form__input-label" >*Фио</label>
                            <img id="fullnameFill" src={mic} alt="" className="form__mic-img" />
                            <div id="loader1" className="loader">
                                <div className="loader__inner">
                                </div>
                                <div className="loader__inner">
                                </div>
                            </div>
                        </div>
                        <div className="checkbox-wrapper-4">
                            <input name = "additionally" className="inp-cbx" id="checkId1" type="checkbox" defaultValue={"Фамилия не склоняется"}/>
                            <label className="cbx" htmlFor={"checkId1"}><span>
                            <svg width="12px" height="10px">
                                <use xlinkHref="#check-4"></use>
                            </svg></span><span>Ваша фамилия НЕ склоняется?</span></label>
                            <svg className="inline-svg">
                                <symbol id="check-4" viewBox="0 0 12 10">
                                <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                                </symbol>
                            </svg>
                        </div>
                        <div className="checkbox-wrapper-4">
                            <input name = "additionally" className="inp-cbx" id="checkId2" type="checkbox" defaultValue={"Студент находился в академическом отпуске или менял образовательную программу"}/>
                            <label className="cbx" htmlFor={"checkId2"}><span>
                            <svg width="12px" height="10px">
                                <use xlinkHref="#check-4"></use>
                            </svg></span><span>Вы находились в академическом отпуске или меняли образовательную программу?</span></label>
                            <svg className="inline-svg">
                                <symbol id="check-4" viewBox="0 0 12 10">
                                <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                                </symbol>
                            </svg>
                        </div>
                        <div className="checkbox-wrapper-4">
                            <input name = "additionally" className="inp-cbx" id="checkId3" type="checkbox" defaultValue={"Студент - иностранец"}/>
                            <label className="cbx" htmlFor={"checkId3"}><span>
                            <svg width="12px" height="10px">
                                <use xlinkHref="#check-4"></use>
                            </svg></span><span>Вы являетесь гражданином иностранного государства?</span></label>
                            <svg className="inline-svg">
                                <symbol id="check-4" viewBox="0 0 12 10">
                                <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                                </symbol>
                            </svg>
                        </div>
                    </div>
                    <div className="form__block-wrapper">
                        <div className="form__input-wrapper">
                            <input id="input2" className="form__input" type="tel" name="phonenumber" required="required"  placeholder=" " />
                            <label htmlFor="input2" className="form__input-label">*Номер телефона</label> 
                            <img id="phoneFill" src={mic} alt="" className="form__mic-img" />
                            <div id="loader2" className="loader">
                                <div className="loader__inner">
                                </div>
                                <div className="loader__inner">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="form__block-wrapper">
                        <div className="form__input-wrapper">
                            <input id="input3" className="form__input" type="text" name="email" defaultValue={""} required placeholder=" " />
                            <label htmlFor="input3" className="form__input-label">*E-mail </label>
                        </div>
                    </div>
                    <div className="form__block-wrapper">
                        <div className="form__ref-wrapper">
                            <label className="form__label">Куда нужна справка?</label>
                            <img id="FillPlace" src={mic} alt="" className="form__mic-img" />
                            <div id="loader3" className="loader">
                                <div className="loader__inner">
                                </div>
                                <div className="loader__inner">
                                </div>
                            </div>
                        </div>
                        <ul className="form__ul">
                            <li>
                                <div className="checkbox-wrapper-4">
                                    <input name = "appointment" className="inp-cbx" id="checkId4" type="checkbox" defaultValue={"Социальная защита"}/>
                                    <label className="cbx" htmlFor={"checkId4"}><span>
                                    <svg width="12px" height="10px">
                                        <use xlinkHref="#check-4"></use>
                                    </svg></span><span>Социальная защита</span></label>
                                    <svg className="inline-svg">
                                        <symbol id="check-4" viewBox="0 0 12 10">
                                        <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                                        </symbol>
                                    </svg>
                                </div>
                            </li>  
                            <li>
                                <div className="checkbox-wrapper-4">
                                    <input name = "appointment" className="inp-cbx" id="checkId5" type="checkbox" defaultValue={"На работу/ на работу родителям"}/>
                                    <label className="cbx" htmlFor={"checkId5"}><span>
                                    <svg width="12px" height="10px">
                                        <use xlinkHref="#check-4"></use>
                                    </svg></span><span>На работу/на работу родителям</span></label>
                                    <svg className="inline-svg">
                                        <symbol id="check-4" viewBox="0 0 12 10">
                                        <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                                        </symbol>
                                    </svg>
                                </div>
                            </li>
                            <li>
                                <div className="checkbox-wrapper-4">
                                    <input name = "appointment" className="inp-cbx" id="checkId6" type="checkbox" defaultValue={"Налоговая служба"}/>
                                    <label className="cbx" htmlFor={"checkId6"}><span>
                                    <svg width="12px" height="10px">
                                        <use xlinkHref="#check-4"></use>
                                    </svg></span><span>Налоговая служба</span></label>
                                    <svg className="inline-svg">
                                        <symbol id="check-4" viewBox="0 0 12 10">
                                        <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                                        </symbol>
                                    </svg>
                                </div>
                            </li>
                            <li>
                                <div className="checkbox-wrapper-4">
                                    <input name = "appointment" className="inp-cbx" id="checkId7" type="checkbox" defaultValue={"Пенсионный фонд"}/>
                                    <label className="cbx" htmlFor={"checkId7"}><span>
                                    <svg width="12px" height="10px">
                                        <use xlinkHref="#check-4"></use>
                                    </svg></span><span>Пенсионный фонд</span></label>
                                    <svg className="inline-svg">
                                        <symbol id="check-4" viewBox="0 0 12 10">
                                        <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                                        </symbol>
                                    </svg>
                                </div>
                            </li>
                            <li>
                                <div className="checkbox-wrapper-4">
                                    <input name = "appointment" className="inp-cbx" id="checkId8" type="checkbox" defaultValue={"Миграционная служба"}/>
                                    <label className="cbx" htmlFor={"checkId8"}><span>
                                    <svg width="12px" height="10px">
                                        <use xlinkHref="#check-4"></use>
                                    </svg></span><span>Миграционная служба</span></label>
                                    <svg className="inline-svg">
                                        <symbol id="check-4" viewBox="0 0 12 10">
                                        <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                                        </symbol>
                                    </svg>
                                </div>
                            </li>
                            <li>
                                <div className="checkbox-wrapper-4">
                                    <input name = "appointment" className="inp-cbx" id="checkId9" type="checkbox" defaultValue={"В школу"}/>
                                    <label className="cbx" htmlFor={"checkId9"}><span>
                                    <svg width="12px" height="10px">
                                        <use xlinkHref="#check-4"></use>
                                    </svg></span><span>В школу</span></label>
                                    <svg className="inline-svg">
                                        <symbol id="check-4" viewBox="0 0 12 10">
                                        <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                                        </symbol>
                                    </svg>
                                </div>
                            </li>
                            <li>
                                <div className="checkbox-wrapper-4">
                                    <input name = "appointment" className="inp-cbx" id="checkId10" type="checkbox" defaultValue={"Военкомат"}/>
                                    <label className="cbx" htmlFor={"checkId10"}><span>
                                    <svg width="12px" height="10px">
                                        <use xlinkHref="#check-4"></use>
                                    </svg></span><span>Военкомат</span></label>
                                    <svg className="inline-svg">
                                        <symbol id="check-4" viewBox="0 0 12 10">
                                        <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                                        </symbol>
                                    </svg>
                                </div>
                            </li>
                        </ul>
                        <div id="militaryCheck" className="form__militarybook-check">
                            <label className="form__label">У вас есть военный билет? (Красная книга)</label>
                            <input  type="radio" id="militaryID1" name="militaryID" defaultValue={"Да"} />
                            <label className="form__radio-label" htmlFor={"militaryID1"}>Да</label>
                            <input type="radio" id="militaryID2" name="militaryID" defaultValue={"Нет"} />
                            <label className="form__radio-label" htmlFor={"militaryID2"}>Нет</label>
                            <div className="form__military-notification">
                            Справки для военкомата заказываются в 213М (Для тех у кого нет военного билета)
                                <div className="military__notif-sub">
                                Иметь при себе приписное и паспорт
                                </div> 
                            </div>
                        </div>
                            <div className="checkbox-wrapper-4">
                                <input name = "appointment" className="inp-cbx" id="checkId11" type="checkbox" defaultValue={"Другое место"}/>
                                <label className="cbx" htmlFor={"checkId11"}><span>
                                <svg width="12px" height="10px">
                                    <use xlinkHref="#check-4"></use>
                                </svg></span><span>Другое место</span></label>
                                <svg className="inline-svg">
                                    <symbol id="check-4" viewBox="0 0 12 10">
                                    <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                                    </symbol>
                                </svg>
                            </div>
                        <div id="other" className="form__other-wrapper">
                            <label className="form__label">Другое (куда): </label> <textarea className="form__textarea-input" type="textarea" name="other" defaultValue={""} />
                        </div>
                    </div>
                    <div className="form__block-wrapper">
                        <label className="form__label">Сколько копий?</label>
                            <div className="form__radio-wrapper">
                                <div className="form__radio-input">
                                <input type="radio" id="quantity1" name="quantity" defaultValue={"1"}/>
                                <label htmlFor="quantity1">1</label>
                                </div>
                                <div className="form__radio-input">
                                <input type="radio" id="quantity2" name="quantity" defaultValue={"2"}/>
                                <label htmlFor="quantity2">2</label>
                                </div>
                                <div className="form__radio-input">
                                <input type="radio" id="quantity3" name="quantity" defaultValue={"3"}/>
                                <label htmlFor="quantity3">3</label>
                                </div>
                            </div>
                    </div>
                    <button className="form__button" type="submit" defaultValue={"Заказать справку"} >{(data.data=="Данные успешно отправлены") ? "Справка заказана" : "Отправить"}</button>
                </form>
                </div>
            </div>
        </div>
        );
}

export default Study;