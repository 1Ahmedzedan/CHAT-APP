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
    [messages],
  );

  return (
    <div
      className="flex h-full w-screen flex-col gap-6 overflow-y-auto px-4 py-8"
      ref={messageContainer}
    >
      {messages.map((msg: message, index: number) => (
        <div
          className={`${
            style[msg.status]
          } break-words shadow mobile:px-5 mobile:text-xs tablet:text-sm`}
          key={index}
        >
          {msg.message}
        </div>
      ))}
    </div>
  );
};
export default MessageContainer;
