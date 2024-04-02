import { useEffect, useRef } from "react";
import { scrollToBottom } from "../utils/helper";

interface message {
  status: string;
  message: string;
}

interface Props {
  messages: message[];
}

const style: any = {
  send: "self-end text-xl font-medium bg-blue-500 text-white w-fit max-w-[70%] rounded-xl px-10 py-2",
  receive:
    "text-xl font-medium bg-white w-fit max-w-[70%] rounded-xl px-10 py-2",
};

const MessageContainer = ({ messages }: Props) => {
  const messageContainer = useRef<HTMLDivElement>(null);
  useEffect(
    function () {
      scrollToBottom(messageContainer);
    },
    [messages]
  );

  return (
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
  );
};
export default MessageContainer;
