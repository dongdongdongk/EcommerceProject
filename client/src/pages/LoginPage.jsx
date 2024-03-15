import React, { useEffect } from "react";
import Login from '../components/Login/Login'
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";

const LoginPage = () => {

    const navigate = useNavigate();
    const { isAuthenticated} = useSelector((state) => state.user);

    useEffect(() => {
        if(isAuthenticated === true) {
            navigate("/")
        }
    })

    return (
        <div>
            <Header/>
            <Login/>
            <Footer/>
        </div>

    )
}

export default LoginPage