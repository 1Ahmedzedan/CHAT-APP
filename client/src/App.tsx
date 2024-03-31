import React, { useEffect, useState } from "react";
import { RiSendPlane2Fill } from "react-icons/ri";
import io from "socket.io-client";

const socket = io("http://localhost:3000"); // Connect to your Socket.IO server

const style :any = {
  send : "self-end text-xl font-medium bg-blue-500 text-white w-fit max-w-[50%] rounded-xl px-10 py-2",
  receive : "text-xl font-medium bg-white w-fit max-w-[50%] rounded-xl px-10 py-2"
}

interface message {
  status: string;
  message : string ; 
}

function App(): JSX.Element {
  const [messages, setMessages] = useState<message[]>([]);
  const [input, setInput] = useState<string>("");

  useEffect(() => {
    // Listen for chat messages from the server
    socket.on("chat message", (msg: string) => {
      const handleMsg:message = {status:"receive" , message: msg} ; 
      setMessages((prevMessages) => [...prevMessages, handleMsg]);
    });

    // Clean up event listeners when component unmounts
    return () => {
      socket.off("chat message");
    };
  }, []);

  const handleMessageSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (input.trim() !== "") {
      const handleMsg:message = {status:"send" , message: input} ;
      setMessages((prevMessages) => [...prevMessages, handleMsg]);
      socket.emit("chat message", input); // Send message to server
      setInput("");
    }
  };

  return (
    <div className=" bg-stone-100 h-screen relative flex flex-col justify-between">
      {/* header */}
      <div className="bg-slate-200 h-20 w-full flex items-center justify-center px-10">
        <p className="text-4xl tracking-widest font-semibold">CHAT APP</p>
      </div>
      {/* messages */}
      <div className="h-full overflow-auto py-8 px-4 flex flex-col gap-6">
        {
          messages.map((msg:message , index:number)=>(
            <div className={`${style[msg.status]}`} key={index}>{msg.message}</div>
          ))
        }
      </div>
      {/* form */}
      <div className=" w-screen bg-blue-300 py-4 flex justify-center items-center">
        <form className="flex justify-between items-center gap-10" onSubmit={handleMessageSubmit}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-[1000px] px-10 py-3 rounded-full focus:outline-none text-xl bg-gray-50"
          />

          <button
            type="submit"
            className="text-2xl text-gray-50 bg-blue-500 p-3 text-center rounded-full"
          >
            <RiSendPlane2Fill />
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
