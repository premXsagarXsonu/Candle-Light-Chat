import React from 'react';
import axios from "axios";
import makeToast from "../Toaster/toaster"
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import {FlashOn} from "@material-ui/icons"
import { Button, Form, Card } from 'react-bootstrap';

const RegisterPage = (props) => {
    const nameRef = React.createRef();
    const emailRef = React.createRef();
    const passwordRef = React.createRef();
    const repasswordRef = React.createRef();

    const registerUser = () => {
        const name = nameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const repassword = repasswordRef.current.value;
        if(password === repassword){
            axios.post("http://192.168.216.63:8000/user/register", {
            name,
            email,
            password,
        })
            .then((response) => {

                makeToast("success", response.data.message);
                props.history.push("/login");
            }).catch((err) => {
                if (err &&
                    err.response &&
                    err.response.data &&
                    err.response.data.message
                )

                    makeToast("error", err.response.data.message);
            });
        }
        else{
            makeToast("error","Password Is Not Matching")
        }

        
    }

    return (
        <div>
            <div class="row top">
                <div className="title col-sm-3 text-center"> Candle Light</div>

                <div className="col-sm-1">

                </div>

                <div className="navlinks col-sm-1">
                    <Link to={"/login"} >
                        <span className="navlinks">Home</span>
                    </Link>
                </div>



                <div className="navlinks col-sm-1">
                    <Link to={"/about"} >
                        <span className="navlinks" >About Us</span>
                    </Link>
                </div>

                <div className="navlinks col-sm-1">
                    <Link to={"/about"} >
                        <span className="navlinks" >Contact</span>
                    </Link>
                </div>

                <div className="col-sm-3">
                </div>

                <div className="navbutton col-sm-1">
                    <Link to={"/login"} >
                        <span className="join" >Log In</span>
                    </Link>
                </div>

            </div>
            <div className="row">
        <div className="col-sm-5">
        <div className="card">
                <div className="cardHeader">Sign Up</div>
                <div className="cardBody">
                    <div className="form-group">
                        <label className="form-label" htmlFor="name">Name</label>
                        <input
                        className="form-control"
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            ref={nameRef}
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="email">Your Email</label>
                        <input
                            className="form-control"
                            type="email"
                            name="email"
                            placeholder="abc@example.com"
                            ref={emailRef}
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="">Enter Your Password</label>
                        <input
                            className="form-control"
                            type="password"
                            name="password"
                            placeholder="Your Password"
                            ref={repasswordRef}
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="">Re-Enter Your Password</label>
                        <input
                            className="form-control"
                            type="password"
                            name="password"
                            placeholder="Your Password"
                            ref={passwordRef}
                        />
                    </div>
                    <div className="form-group">
                                <input type="checkbox" value="true" name="true" />
                                <label className="label" htmlFor="kml">I have Read And Agreed To <br /> Terms and Conditions </label>
                            </div>
                    <button className="subbtn" onClick={registerUser}>Register</button>


                </div>
            </div>
        </div>
        <div className="col-sm-7">
                <img className="regpic" src="https://images.unsplash.com/photo-1530374260450-4bd19102f63d?ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDI5fGFldTZyTC1qNmV3fHxlbnwwfHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="" />
        </div>
            </div>
            <div className="hometitlebg row">
                <div className="col-lg-12">
                    <div className="hometitle">Candle Light <FlashOn className="thunder" fontSize="large"/></div>
                </div>
            </div>
            <div className="row">
                <div className="footer col-sm-12">
                        <div className="footer">Copyright {'\u00A9'}2021 Candle Light </div>
                </div>
            </div>
        </div>

    )
};

export default RegisterPage
