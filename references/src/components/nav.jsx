import React from "react";
import {Link,Routes,Route } from 'react-router-dom';
import logo from '../images/icons/asu_logo.svg';
import Login from "./login";
import Header from "./header";
class Nav extends React.Component {
    render() {
        
        return (
            <Routes>
                <Route path="/" element={<Header/>} />
                <Route path="/financial_assistance" element={<Header/>} />
                <Route path="/moder" element={<Header/>} />
                <Route path="/references" element={<Header/>} />
                <Route path="/map" element={<Header/>} />
                <Route path="/login" element={< Login/>}/>
            </Routes>
        );
    }
}

export default Nav;