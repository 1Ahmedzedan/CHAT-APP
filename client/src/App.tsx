import { useEffect, useState } from "react";

import { socket } from "./services/seckot";


import { HashRouter, Route, Routes } from "react-router-dom";
import RegisterPage from "./components/RegisterPage";
import ChatPage from "./components/ChatPage";
import MessageContainer from "./components/MessageContainer";
import ChatStore from "./context/ChatStore";

interface message {
  status: string;
  message: string;
}

function App() {
  const [notification] = useState(new Audio("whatsapp_notification.mp3"));
  const [messages, setMessages] = useState<message[]>([{status:"send" , message:"zedan"}]);

  useEffect(() => {
    // Listen for chat messages from the server
    socket.on("chat message", (msg: string) => {
      addMessage(msg, "receive");
    });
    if (messages[messages.length - 1]?.status == "receive") notification.play();

    // Clean up event listeners when component unmounts
    return () => {
      socket.off("chat message");
    };
  }, [messages]);

  const addMessage = (msg: string, status: string) => {
    const handleMsg: message = { status: status, message: msg };
    setMessages((prevMessages) => [...prevMessages, handleMsg]);
  };

  return (
    <ChatStore>
      <HashRouter>
        <Routes>
          <Route path="/" element={<RegisterPage/>} />
          <Route path="/chat" element={<ChatPage/>}>
            <Route path="/chat/:name" element={<MessageContainer/>}/>
          </Route>
        </Routes>
      </HashRouter>
    </ChatStore>
  );
}

export default App;
