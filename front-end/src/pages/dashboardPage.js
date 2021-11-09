import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import makeToast from "../Toaster/toaster";
import io from "socket.io-client";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import {FlashOn} from "@material-ui/icons"

const DashboardPage = (props) => {
    const chatroomNameRef = React.createRef();
    const newRoomIdRef = React.createRef();
    const joinRoomIdRef = React.createRef();
    const [chatrooms, setChatrooms] = React.useState([]);
    const SetupSocket = () => {
        const socket = io("http://192.168.216.63:8000", {
            query: {
                token: localStorage.getItem("U_Token"),
            }
        });
        if (socket) {
            socket.on("disconnect", () => {
                setTimeout(SetupSocket, 3000);
            });
        }

        if (socket) {
            socket.on("connect", () => {
                console.log("Socket Connected!")
            });
        }

    }
    SetupSocket();

    const GenerateRoomId = () => {
        axios.get("http://192.168.216.63:8000/chatroom/generatechatrooms", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("U_Token"),
            },
        })
            .then((response) => {
                makeToast("success", response.data.message);
                newRoomIdRef.current.value = response.data.newRoomId;
            }).catch((err) => {
                if (err &&
                    err.response &&
                    err.response.data &&
                    err.response.data.message
                )

                    makeToast("error", err.response.data.message);
            });
    }
    const createRoom = () => {
        const Rname = chatroomNameRef.current.value;
        const data = { name: Rname }
        axios.post("http://192.168.216.63:8000/chatroom/createchatrooms",
            data,
            {

                headers: {
                    Authorization: "Bearer " + localStorage.getItem("U_Token"),
                },

            }).then((response) => {
                chatroomNameRef.current.value = " "
                makeToast("success", response.data.message);

                getChatrooms();

            }).catch((err) => {
                if (err &&
                    err.response &&
                    err.response.data &&
                    err.response.data.message
                )

                    makeToast("error", err.response.data.message);
            });
    };



    const getChatrooms = () => {
        axios.get("http://localhost:8000/chatroom/getchatrooms", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("U_Token"),
            },
        }).then((response) => {
            setChatrooms(response.data);

        }).catch((err) => {
            setTimeout(getChatrooms, 3000);
        });
    };
    const logout = () => {
        localStorage.removeItem("U_Token");
    }
    React.useEffect(() => {
        getChatrooms();
        //eslint-disable-next-line
    }, []);

    const joinChatRoom = () => {
        const joinRoomId = joinRoomIdRef.current.value;
        props.history.push("/chatroom/" + "random" + "/" + joinRoomId);
        window.location.reload()
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
                    <Link to={"/contact"} >
                        <span className="navlinks" >Contact</span>
                    </Link>
                </div>

                <div className="col-sm-3">
                </div>

                <div className="navbutton col-sm-1">
                    <Link to={"/login"} >
                        <span className="join" >Log Out</span>
                    </Link>
                </div>

            </div>


            <div className="videosection row">
                <div className="row">
                    <div className="col-sm-1"></div>
                    <div className="col-sm-3">
                        <div className="tagline">Video Chat</div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-1"></div>
                    <div className="col-sm-7">
                        <Link to={"/videochat"} >
                            <button className="vdashbtn">Video Call</button>
                        </Link>

                    </div>
                </div>

            </div>



            <div className="random row">

                <div className="row">
                    <div className="col-sm-1"></div>
                    <div className="col-sm-6">
                        <div className="tagline">Text Chat Rooms</div>
                    </div>

                    <div className="row">
                        <div className="col-sm-1"></div>
                        <div className="col-sm-6">
                            <input
                                className="randomid"
                                type="text"
                                name="GenerateRoomId"
                                placeholder="Generate Random Room ID"
                                ref={newRoomIdRef}
                            />
                        </div>
                        <div className="col-sm-3">
                            <button className="dashbtn" onClick={GenerateRoomId}>Generate</button>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-1"></div>
                        <div className="col-sm-6">
                            <input className="randomid"
                                type="text"
                                name="roomId"
                                placeholder="Paste Generated Room ID To Join"
                                ref={joinRoomIdRef}
                            />
                        </div>
                        <div className="col-sm-3">
                            <button className="dashbtn" onClick={joinChatRoom}>join</button>
                        </div>
                    </div>
                </div>
            </div>


            <div className="public row">
                
                <div className="row">
                <div className="col-sm-1"></div>
                <div className="col-sm-8">
                <div className="tagline">Public Chat Rooms</div>
                </div>
                </div>

                <div className="row">
                <div className="col-sm-1"></div>
                <div className="col-sm-8">
                <div className="form-group">
                                <label className="label-form" htmlFor="chatroomName">Chatroom Name</label>
                                <input
                                    className="randomid"
                                    type="text"
                                    name="chatroomName"
                                    id="chatroomName"
                                    placeholder="Enter Chatroom Name"
                                    ref={chatroomNameRef}
                                />
                            </div>
                            <br />
                            <button  onClick={createRoom}> Create Chatroom </button>

                </div>
                </div>

                <div className="row">
                    <div className="col-sm-1"></div>
                    <div className="col-sm-8">
                    <div className="chatrooms">
                            {chatrooms.map((chatroom) => (
                                <div key={chatroom._id} className="chatroom">
                                    <div>{chatroom.name}</div>
                                    <Link to={"/chatroom/" + chatroom.name + "/" + chatroom._id}>
                                        <div className="join cjoin">Join</div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                        
                </div>

                
            </div>


            <div className="hometitlebg row">
                <div className="col-lg-12">
                    <div className="hometitle">Candle Light <FlashOn className="thunder" fontSize="large"/></div>
                </div>
            </div>
            

            <div className="footer bottom" >Copyright {'\u00A9'}2021 Candle Light </div>
        </div>
    )
};

export default DashboardPage;
