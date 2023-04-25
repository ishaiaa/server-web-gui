import React, { useState, useCallback, useEffect, useRef } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import styles from './App.module.css';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate
} from "react-router-dom";


import Login from './components/pages/Login';
import Desktop from './components/pages/Desktop';


function App(props) {
  //Public API that will echo messages sent to it back to the client
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [waitTime, setWaitTime] = useState(true);
  const [refresh, setRefresh] = useState(true);

  const firstUpdate = useRef(true);
  const navigator = useNavigate();
  
  const [socketUrl, setSocketUrl] = useState("");
  const [messageHistory, setMessageHistory] = useState([]);

  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

  useEffect(() => {
    if (lastMessage !== null) {
      setMessageHistory((prev) => prev.concat(lastMessage));
      console.log(lastMessage)
    }
  }, [lastMessage, setMessageHistory]);

  function handleSocketConnect(formData) {    
    setSocketUrl(formData.socket);
  }

  useEffect(() => {
    if(socketUrl==="") return

    setIsLoading(true)
    setWaitTime(true)
    setTimeout(()=>{
      setRefresh(prev => !prev)

    }, 6000)
  },[socketUrl])

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    setTimeout(() => {
      setWaitTime(false)
    },2500);
  },[socketUrl])

  useEffect(() => {
    if(readyState===ReadyState.OPEN && !waitTime) {
      setIsConnected(true)
      setTimeout(() => {
        navigator("/desktop")
      }, 3000)

    }
  },[readyState, waitTime])

  useEffect(() => {

    console.log(`readyState: ${readyState}`)
    console.log(`ReadyState.OPEN: ${ReadyState.OPEN}`)
    if(readyState !== ReadyState.OPEN) {
      console.log("PASS1")
      setIsLoading(false);
      setIsConnected(false);
      setSocketUrl("");
      console.log("PASS2")
    }
  }, [refresh])

  const handleClickSendMessage = useCallback(() => sendMessage('Hello'), []);

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];

  // return (
  //   <div>
  //     <button onClick={handleClickChangeSocketUrl}>
  //       Click Me to change Socket Url
  //     </button>
  //     <button
  //       onClick={handleClickSendMessage}
  //       disabled={readyState !== ReadyState.OPEN}
  //     >
  //       Click Me to send 'Hello'
  //     </button>
  //     <span>The WebSocket is currently {connectionStatus}</span>
  //     {lastMessage ? <span>Last message: {lastMessage.data}</span> : null}
  //     <ul>
  //       {messageHistory.map((message, idx) => (
  //         <span key={idx}>{message ? message.data : null}</span>
  //       ))}
  //     </ul>
  //   </div>
  // );

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login isLoading={isLoading} isConnected={isConnected} handleConnect={handleSocketConnect} />} />
      <Route path="/desktop" element={<Desktop data={lastMessage ? JSON.parse(lastMessage.data) : null}/>} />
    </Routes>
  )
};

export default App;