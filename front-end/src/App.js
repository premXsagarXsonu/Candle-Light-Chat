import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginPage from "./pages/loginPage";
import RegisterPage from "./pages/registerPage";
import DashboardPage from "./pages/dashboardPage";
import IndexPage from "./pages/indexPage";
import ChatroomPage from "./pages/chatroomPage";
import VideoChatPage from "./pages/videoChatPage";
import AboutPage from "./pages/aboutPage"

function App() {
 
return (
    <BrowserRouter>
      <Switch>
        <Route
          path="/" 
          component={IndexPage} exact />
        <Route
          path="/login" 
          //render = {()=><LoginPage SetupSocket={SetupSocket} /> } 
          component={LoginPage}
          exact />
        <Route
          path="/register" 
          component={RegisterPage} exact />
        <Route
          path="/dashboard" 
          //render={() => <DashboardPage socket={socket} />} 
          component={DashboardPage}
          exact />
        <Route 
        path="/chatroom/:name/:id" 
        //render={() => <ChatroomPage socket={socket} />} 
        component={ChatroomPage}
        exact />
        <Route 
        path="/about" 
        //render={() => <ChatroomPage socket={socket} />} 
        component={AboutPage}
        exact />
        <Route 
        path="/videochat" 
        //render={() => <ChatroomPage socket={socket} />} 
        component={VideoChatPage}
        exact />
      </Switch>
    </BrowserRouter>

  );
};
export default App
