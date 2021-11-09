import React from 'react';
import axios from "axios";
import makeToast from "../Toaster/toaster";
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import {FlashOn} from "@material-ui/icons"

function LoginPage(props) {
    const emailRef = React.createRef();
    const passwordRef = React.createRef();

    const loginUser = () => {
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        axios.post("http://192.168.216.63:8000/user/login", {
            email,
            password,
        })
            .then((response) => {

                makeToast("success", response.data.message);
                localStorage.setItem("U_Token", response.data.token);
                props.history.push("/dashboard");
            }).catch((err) => {
                if (
                    err &&
                    err.response &&
                    err.response.data &&
                    err.response.data.message


                ) { makeToast("error", err.response.data.message); }
            });
    };
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
                    <Link to={"/contact"} >
                        <span className="navlinks" >Contact</span>
                    </Link>
                </div>

                <div className="col-sm-3">
                </div>

                <div className="navbutton col-sm-1">
                    <Link to={"/register"} >
                        <span className="join" >Sign Up</span>
                    </Link>
                </div>

            </div>

            <div className="row midcont">
                <div className="col-lg-7">

                    <img className="homepic" src="https://images.unsplash.com/photo-1635830625698-3b9bd74671ca?ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDJ8YWV1NnJMLWo2ZXd8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="" />

                </div>

                <div className="col-lg-5">

                    <div className="card">
                        <div className="cardBody">
                            <div className="cardHeader">Welcome Back</div>
                            <div className="form-group">
                                <label className="form-label" htmlFor="email">Email</label>
                                <input
                                    className="form-control"
                                    type="email"
                                    name="email"
                                    placeholder="abc@example.com"
                                    ref={emailRef}
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label" htmlFor="password">Password</label>
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
                                <label className="label" htmlFor="kml">Keep Me Logged In</label>
                            </div>
                            <button className="subbtn" onClick={loginUser}>Login</button>
                        </div>
                    </div>

                </div>
            </div>
            <div className="hometitlebg row">
                <div className="col-lg-12">
                    <div className="hometitle">Candle Light <FlashOn className="thunder" fontSize="large"/></div>
                </div>
            </div>

            <div className="lastcont row">
            <div className="row">
                <div className="col-sm-2"></div>
                <div className="ad col-sm-7">
                    <img className="ad1" src="https://images.unsplash.com/photo-1490810194309-344b3661ba39?ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDEwNXxhZXU2ckwtajZld3x8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="" />
               <p className="adt"> We provide free one-on-one video call services</p>
                <div className="col-sm-1">
                </div>
                
                 </div>
            </div>
            <div className="row">
            <div className="col-sm-3"></div>
                <div className="ad col-sm-6">
                <p className="adt"> You Can Crearte Chat Room And With Your Friends </p>
                    <img className="ad2" src="https://images.unsplash.com/photo-1633114128729-0a8dc13406b9?ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDQ2fGFldTZyTC1qNmV3fHxlbnwwfHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="" />
                </div>
                
            </div>
            </div>

            <div className="row">
                <div className="footer col-sm-12">
                        <div className="footer">Copyright {'\u00A9'}2021 Candle Light </div>
                </div>
            </div>
        </div>
    )
}

export default withRouter(LoginPage);
