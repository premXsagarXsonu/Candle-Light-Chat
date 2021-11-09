import React from 'react';
import axios from "axios";
import makeToast from "../Toaster/toaster";
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import {FlashOn} from "@material-ui/icons"
import Prem from '../images/prem.jpg'
const AboutPage = () => {
    
return(
        <>
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

                <div className="col-sm-2">
                </div>

                <div className="navbutton col-sm-1">
                
                <Link to={"/login"} >
                        <span className="join" >Log In</span>
                    </Link>
	
                </div>

                <div className="navbutton col-sm-1">
                    <Link to={"/register"} >
                        <span className="join" >Sign Up</span>
                    </Link>
                </div>

            </div>

            <div className="aboutus row">
                <div className="row">
                <span className="tagline abtag">About Us </span>
                </div>
                <div className="row">
                  <img className="teampic" src="https://media.istockphoto.com/photos/business-professionals-working-at-new-office-desk-picture-id1271153817?b=1&k=20&m=1271153817&s=170667a&w=0&h=uepHSQJa-qN5LTMyeuffMclSV2xqpt90aYzyqHYGUqg=" alt="" />
                </div>
            </div>

            <div className="team row">
            <div className="row">
                <span className="tagline abtag">Team Description</span>
            </div>
            <div className="col-sm-3"></div>
            <div className="teammember col-sm-2">
                <img src={Prem} className="memberpic" alt="" />
                <span className="membername">Prem Sagar</span>
                <p className="memberdes">Contributor</p>
            </div>
            <div className="teammember col-sm-2">
            <img src={Prem} className="memberpic" alt="" />
                <span className="membername">Prem Sagar</span>
                <p className="memberdes">Contributor</p>
            </div>
            <div className="teammember col-sm-2">
            <img src={Prem} className="memberpic" alt="" />
                <span className="membername">Prem Sagar</span>
                <p className="memberdes">Contributor</p>
            </div>
            <div className="col-sm-3"></div>
            </div>


            <div className="contactus row">
            <div className="row">
                <span className="tagline abtag">Contact Us</span>
            </div>
            <div className="row">
                <div className="col-sm-2">

                </div>
                <div className="col-sm-4">
                <span className="">Contact Us At</span>
                </div>
                </div>
            <div className=" row">
                <div className="col-sm-4"></div>
                <div className="col-sm-4"><span className="contactbtn">Support@candlelight.tech</span></div>
                <div className="col-sm-4"></div>
            
            </div>
            <div className="row">
            <div className="col-sm-7">

</div>
<div className="col-sm-3">
<span className="">For Any Technical Issues.</span>
</div>
            </div>
            <div className="row"></div>
            </div>

            <div className="row findus">

                <div className="row">
                <span className="tagline abtag">Find US Here</span>
                </div>
                <div className="row address">
                <div className="col-sm-12">
                    <div className="hometitle addressbox">############ Address ###########</div>
                </div>
                </div>
            </div>
            <div className="hometitlebg row">
                <div className="col-sm-12">
                    <div className="hometitle">Candle Light <FlashOn className="thunder" fontSize="large"/></div>
                </div>
            </div>
            

            <div className="footer bottom" >Copyright {'\u00A9'}2021 Candle Light </div>
    </>
)}

export default AboutPage;