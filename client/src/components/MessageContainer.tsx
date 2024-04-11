import { useEffect, useRef } from "react";
import { scrollToBottom } from "../utils/helper";
import Message from "./Message";

interface message {
  status: string;
  message: string;
}

interface Props {
  messages?: message[];
}



const MessageContainer = ({ messages }: Props) => {
  const messageContainer = useRef<HTMLDivElement>(null);
  useEffect(
    function () {
      scrollToBottom(messageContainer);
    },
    [messages],
  );

  return (
    <div
      className="flex h-full w-full flex-col gap-6 overflow-y-auto px-4 py-8"
      ref={messageContainer}
    >
      {messages?.map((msg: message, index: number) => (
        <Message status={msg.status} message={msg.message} key={index}/>
      ))}
    </div>
  );
};
export default MessageContainer;
