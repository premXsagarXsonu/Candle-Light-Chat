import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import TextField from "@material-ui/core/TextField"
import AssignmentIcon from "@material-ui/icons/Assignment"
import PhoneIcon from "@material-ui/icons/Phone"
import {MicOff,Mic,Videocam,VideocamOff,CallEnd,CallReceived} from "@material-ui/icons"
import React, { useEffect, useRef, useState } from "react"
import { CopyToClipboard } from "react-copy-to-clipboard"
import Peer from "simple-peer"
import io from "socket.io-client"
import { Link } from 'react-router-dom';
import {FlashOn} from "@material-ui/icons"
const socket = io("http://localhost:8000", {
  query: {
      token: localStorage.getItem("U_Token"),
    }
  });
function VideoChatPage() {
	const [ me, setMe ] = useState("")
	const [ stream, setStream ] = useState()
	const [ receivingCall, setReceivingCall ] = useState(false)
	const [ caller, setCaller ] = useState("")
	const [ callerSignal, setCallerSignal ] = useState()
	const [ callAccepted, setCallAccepted ] = useState(false)
	const [ idToCall, setIdToCall ] = useState("")
	const [ callEnded, setCallEnded] = useState(false)
	const [ name, setName ] = useState("")
	const [ userId, setUserId ] = useState("")
	const myVideo = useRef()
	const userVideo = useRef()
	const connectionRef= useRef()
    const [vstat,setVstate] = useState(true);
    const [astat,setAstate] = useState(true);


	useEffect(() => {
		navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
			setStream(stream)
				myVideo.current.srcObject = stream
		})

        socket.emit("myinfo");
            socket.on('me', (data) => {
                setMe(data.id);
                setUserId(data.userId);
                setName(data.name);
              console.log(data)});
		socket.on("callUser", (data) => {
			setReceivingCall(true)
			setCaller(data.from)
			setName(data.name)
			setCallerSignal(data.signal)
		})
	}, [])

	const callUser = (id) => {
		const peer = new Peer({
			initiator: true,
			trickle: false,
			stream: stream
		})
		peer.on("signal", (data) => {
			socket.emit("callUser", {
				userToCall: id,
				signalData: data,
				from: me,
				name: name
			})
		})
		peer.on("stream", (stream) => {
			
				userVideo.current.srcObject = stream
			
		})
		socket.on("callAccepted", (signal) => {
			setCallAccepted(true)
			peer.signal(signal)
		})

		connectionRef.current = peer
	}

	const answerCall =() =>  {
		setCallAccepted(true)
		const peer = new Peer({
			initiator: false,
			trickle: false,
			stream: stream
		})
		peer.on("signal", (data) => {
			socket.emit("answerCall", { signal: data, to: caller })
		})
		peer.on("stream", (stream) => {
			userVideo.current.srcObject = stream
		})

		peer.signal(callerSignal)
		connectionRef.current = peer
	}

	const leaveCall = () => {
		window.location.reload()
		setCallEnded(true)
		connectionRef.current.destroy()
	}
    const startWebCam = () => {
		setVstate(true);
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
			setStream(stream)
				myVideo.current.srcObject = stream
      })}
    
     const stopWebCam = () => {
		 setVstate(false);
        navigator.mediaDevices.getUserMedia({ video: false, audio: true }).then((stream) => {
			setStream(stream)
				myVideo.current.srcObject = stream
      })}
      const mute = () => {
		  setAstate(false);
        navigator.mediaDevices.getUserMedia({ video: true, audio: false }).then((stream) => {
			setStream(stream)
				myVideo.current.srcObject = stream
      })}
      const unmute = () => {
		  setAstate(true);
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
			setStream(stream)
				myVideo.current.srcObject = stream
      })}

	return (
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
                    <Link to={"/contact"} >
                        <span className="navlinks" >Contact</span>
                    </Link>
                </div>

                <div className="col-sm-3">
                </div>

                <div className="navbutton col-sm-1">
                    <Link to={"/register"} >
                        <span className="join" >Dashboard</span>
                    </Link>
                </div>
            </div>



			<div className="videosection row">
				
				<div className="col-sm-10">

				
					<div className="vid col-sm-6">
					{stream &&  <video playsInline muted ref={myVideo} autoPlay className="stream" />}
					</div>
					<div className="vid col-sm-6">
					{callAccepted && !callEnded ?
					<video playsInline ref={userVideo} autoPlay className="stream"/>:
					null}
					</div>

				</div>



				<div className="col-sm-2">
				
				<div className="row">
				<input
					className="randomid chatc"
					id="filled-basic"
					label="Name"
					variant="filled"
					value={name}
					onChange={(e) => setName(e.target.value)}
					style={{ marginBottom: "20px" }}
				/>
				</div>

				<div className="row">
				<CopyToClipboard text={me}>
					<button variant="contained" color="primary" startIcon={<AssignmentIcon fontSize="large" />}>
						Copy ID
					</button>
				</CopyToClipboard>
				</div>

				<div className="row">
				<input
				className="randomid chatc"
					id="filled-basic"
					label="ID to call"
					variant="filled"
					value={idToCall}
					onChange={(e) => setIdToCall(e.target.value)}
				/>
				</div>

				<div className="row">
				{callAccepted && !callEnded ? (
						<IconButton className="chatc" onClick={leaveCall}>
							<CallEnd fontSize="large" /> 
						</IconButton>
					) : (
						<IconButton className="chatc" color="primary" aria-label="call" onClick={() => callUser(idToCall)}>
							<PhoneIcon fontSize="large" />
						</IconButton>
					)}
				</div>

				<div className="chatc row">
				{receivingCall && !callAccepted ? (
						<div className="caller">
						<span >{name} is calling...</span>
						<button  onClick={answerCall}>
							Answer
						</button>
						</div>
				) : null}
				</div>

				</div>
				</div>


				<div className="vcontrol row">
				
				<div className="col-sm-3"></div>
				<div className="col-sm-1">
				{astat ? (
						<IconButton className="chatc" color="primary" aria-label="call" onClick={mute}>
							<MicOff fontSize="large" />
						</IconButton>
					) : (
						<IconButton className="chatc" color="primary" aria-label="call" onClick={unmute}>
							<Mic fontSize="large" />
						</IconButton>
				)}
				</div>
						<div className="col-sm-1">
						{callAccepted && !callEnded ? (
						<IconButton className="chatc" onClick={leaveCall}>
							<CallEnd fontSize="large" /> 
						</IconButton>
					) : (
						<IconButton className="chatc" color="primary" aria-label="call" onClick={() => callUser(idToCall)}>
							<PhoneIcon fontSize="large" />
						</IconButton>
					)}
						</div>
				
				<div className="col-sm-1">
				{vstat ? (
						<IconButton className="chatc" color="primary" aria-label="call" onClick={stopWebCam}>
							<VideocamOff fontSize="large" />
						</IconButton>
					) : (
						<IconButton className="chatc" color="primary" aria-label="call" onClick={startWebCam}>
							<Videocam fontSize="large" />
						</IconButton>
				)}
				</div>
				</div>
				{/* <div className="col-sm-3"></div>
				<button variant="contained" color="primary" onClick={stopWebCam}>
                Stop Video
				</button>
                <button variant="contained" color="primary" onClick={startWebCam}>
                start Video
				</button>
                <button variant="contained" color="primary" onClick={mute}>
                mute
				</button>
                <button variant="contained" color="primary" onClick={unmute}>
                unmute
				</button>
				</div> */}

				<div className="hometitlebg row">
                <div className="col-lg-12">
                    <div className="hometitle">Candle Light <FlashOn className="thunder" fontSize="large"/></div>
                </div>
            </div>
            

            <div className="footer bottom" >Copyright {'\u00A9'}2021 Candle Light </div>
        
				
				
               

		</>
	)
}

export default VideoChatPage;
