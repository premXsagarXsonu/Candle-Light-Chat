import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import io from "socket.io-client";
import { Link } from 'react-router-dom';
import makeToast from '../Toaster/toaster';
import { CopyToClipboard } from "react-copy-to-clipboard"
import {FlashOn} from "@material-ui/icons"
var chat = [];

const ChatroomPage = ({ match }) => {
    const chatroomId = match.params.id;
    var chatroomName = '';
    if (match.params.name === "random") {
        chatroomName = "Random Chat Room";
    }
    else {
        chatroomName = match.params.name;
    }
    const [state, setState] = useState({ nmessage: " ", uname: " " });
    const [messages, setMessages] = useState([]);


    const messageRef = React.useRef();
    const socketRef = React.useRef();

    socketRef.current = io.connect("http://localhost:8000", {
        query: {
            token: localStorage.getItem("U_Token"),
        }
    });

    useEffect(() => {

        socketRef.current.on("newMessage", (message) => {

            const newMessage = [...messages, message];
            setMessages(newMessage);
            console.log(newMessage);
            chat.push(message);

            setState({ nmessage: message.message, uname: message.name })
        });

        //eslint-disable-next-line
    }, [messages, socketRef]);




    useEffect(() => {
        if (socketRef) {
            socketRef.current.emit("joinRoom", {
                chatroomId,
            });
        }
        return () => {
            if (socketRef) {
                socketRef.current.emit("leaveRoom", {
                    chatroomId,
                });
            }
        }
        //eslint-disable-next-line
    }, [chatroomId, socketRef]);

    const sendMessage = () => {
        if(messageRef.current.value===" ")
        {
            makeToast("error","Message is Empty")
        }
        else{
            socketRef.current.emit("chatroomMessage", {
                chatroomId,
                message: messageRef.current.value,
    
            });
        }
        

        messageRef.current.value = " "

    };

    const renderChat = () => {

        return chat.map((message) => (
       
             ( <div key={message.id} className="message">
                <span
                    className=
                    "otherMessage"
                >
                    {message.name}:</span>
                {" "}{message.message}
            </div>)
            
            
            
        ))
    }
    const resetChat = () => {

        chat = [];
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

                <div className="col-sm-1">
                </div>

                <div className="navbutton col-sm-2">
                <CopyToClipboard text={window.location.href}>
                <span className="join" >Copy Room Link</span>
				</CopyToClipboard>
                </div>

                <div className="navbutton col-sm-1">
                    <Link to={"/register"} >
                        <span className="join" >Sign Up</span>
                    </Link>
                </div>

            </div>


            <div className="chatroomrow row">
                <div className="col-sm-4">
                    </div>
               
                <div className="col-sm-4">
                    <div className="tagline"> {chatroomName}</div>
                </div>
                <div className="col-sm-2"></div>
                <div className="col-sm-2">
                    <Link to={"/dashboard"} >
                        <span className="leave join" onClick={resetChat}>Leave Chatroom</span>
                    </Link>
                </div>

            </div>
            

            <div className="row">
                <div className="col-sm-1"></div>
                <div className="col-sm-10">

                    <div className="chatroomContent">
                        {renderChat()}
                    </div>
                </div>
                <div className="col-sm-1"></div>
            </div>

            <div className="send row">
                <div className="col-sm-1"></div>
                <div className="col-sm-8"> <input
                    className="messagein"
                        type="text"
                        name="message"
                        placeholder="Say Something !"
                        ref={messageRef}
                    /></div>
                <div className="col-sm-2"> <button onClick={sendMessage} className="sendbtn leave">Send</button></div>
                <div className="col-sm-1"></div>
            </div>

            <div className="hometitlebg row">
                <div className="col-lg-12">
                    <div className="hometitle">Candle Light <FlashOn className="thunder" fontSize="large"/></div>
                </div>
            </div>


            <div className="footer bottom" >Copyright {'\u00A9'}2021 Candle Light </div>
        </div>
    )
}

export default withRouter(ChatroomPage);
