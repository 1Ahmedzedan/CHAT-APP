import { useEffect, useState } from "react";

import { socket } from "./services/seckot";

import Header from "./components/Header";
import MessageContainer from "./components/MessageContainer";
import Form from "./components/Form";

interface message {
  status: string;
  message: string;
}

function App() {
  const [notification] = useState(new Audio("whatsapp_notification.mp3"));
  const [messages, setMessages] = useState<message[]>([]);

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
    <div className=" relative flex h-screen flex-col justify-between bg-stone-100">
      <Header />
      <MessageContainer messages={messages} />
      <Form addMessage={addMessage} />
    </div>
  );
}

export default App;
