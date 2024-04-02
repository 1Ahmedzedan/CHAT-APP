import React, { useEffect, useRef, useState } from "react";
import { RiSendPlane2Fill } from "react-icons/ri";
import { socket } from "./services/seckot";
import { scrollToBottom } from "./utils/helper";

import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { FaRegFaceSmileBeam } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";

const style: any = {
  send: "self-end text-xl font-medium bg-blue-500 text-white w-fit max-w-[70%] rounded-xl px-10 py-2",
  receive:
    "text-xl font-medium bg-white w-fit max-w-[70%] rounded-xl px-10 py-2",
};

interface message {
  status: string;
  message: string;
}

function App(): JSX.Element {
  const [notification] = useState(new Audio("./src/sounds/whatsapp_notification.mp3")) ; 
  // console.log(notification) ; 
  const messageContainer = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<message[]>([]);
  const [input, setInput] = useState<string>("");
  const [openImojiList, setOpenImojiList] = useState<boolean>(false);

  useEffect(() => {
    // Listen for chat messages from the server
    socket.on("chat message", (msg: string) => {
      addMessage(msg, "receive");
    });
    if(messages[messages.length-1]?.status == "receive") notification.play() ; 

    scrollToBottom(messageContainer);

    // Clean up event listeners when component unmounts
    return () => {
      socket.off("chat message");
    };
  }, [messages]);

  const handleMessageSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (input.trim() !== "") {
      addMessage(input, "send");
      socket.emit("chat message", input); // Send message to server
      setInput("");
    }
  };

  const addMessage = (msg: string, status: string) => {
    const handleMsg: message = { status: status, message: msg };
    setMessages((prevMessages) => [...prevMessages, handleMsg]);
  };

  const handleSelectOmoji = (e:any)=>{
    setInput((input)=>input+e.native) ; 
  }

  return (
    <div className=" bg-stone-100 h-screen relative flex flex-col justify-between">
      {/* header */}
      <div className="bg-slate-200 py-4 w-full flex items-center justify-center mobile:py-2">
        <p className="text-4xl tracking-widest font-semibold tablet:text-2xl mobile:text-xl">
          CHAT APP
        </p>
      </div>
      {/* messages */}
      <div
        className="h-full w-screen overflow-y-auto py-8 px-4 flex flex-col gap-6"
        ref={messageContainer}
      >
        {messages.map((msg: message, index: number) => (
          <div
            className={`${
              style[msg.status]
            } break-words shadow tablet:text-sm mobile:text-xs mobile:px-5`}
            key={index}
          >
            {msg.message}
          </div>
        ))}
      </div>
      {/* form */}
      <div className="w-screen bg-blue-300 py-4 flex justify-center items-center mobile:py-2">
        <form
          className="flex justify-center items-center gap-10 tablet:gap-5 mobile:gap-5 w-full relative"
          onSubmit={handleMessageSubmit}
        >
          <button
            type="button"
            className=" text-3xl text-stone-600 hover:text-black mobile:text-2xl"
            onClick={() => setOpenImojiList((e) => !e)}
          >
            {openImojiList ? <IoCloseSharp /> : <FaRegFaceSmileBeam /> }
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-[60%] tablet:py-1 mobile:py-1 px-10 py-3 tablet:px-8 mobile:px-8 rounded-full focus:outline-none text-xl tablet:text-lg mobile:text-sm bg-gray-50"
          />

          <button
            type="submit"
            className="text-2xl tablet:text-lg mobile:text-lg text-gray-50 bg-blue-600 hover:bg-blue-500 transition-all duration-300 p-3 tablet:p-2 mobile:p-2 text-center rounded-full"
          >
            <RiSendPlane2Fill />
          </button>
          {openImojiList && (
            <div className=" absolute bottom-20 w-[500px] overflow-auto mobile:w-[300px]">
              <Picker data={data} onEmojiSelect={(e:any)=>handleSelectOmoji(e)} theme="light" />
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default App;
