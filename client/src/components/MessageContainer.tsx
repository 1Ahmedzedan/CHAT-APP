import { useEffect } from "react";
import Message from "./Message";
import { useChatContext } from "../context/ChatStore";
import useScrollToButton from "../hooks/useScrollToButton";

interface message {
  status: string;
  message: string;
  user: string;
}

const MessageContainer = () => {
  const context = useChatContext();
  const { ref, scrollToBottom } = useScrollToButton();
  useEffect(
    function () {
      scrollToBottom();
    },
    [context?.messages],
  );

  return (
    <div
      className="flex h-full w-full flex-col gap-6 overflow-y-auto px-4 py-8"
      ref={ref}
    >
      {context?.messages?.map((msg: message, index: number) => (
        <Message status={msg.status} message={msg.message} user={msg.user} key={index} />
      ))}
    </div>
  );
};
export default MessageContainer;
