import { useChatContext } from "../context/ChatStore";

interface Props {
  status: string;
  message: string;
  user: string;
}

const style: any = {
  send: "self-end bg-blue-900 text-white",
  receive: "bg-white ",
};

const Message = ({ status, message, user }: Props) => {
  const context = useChatContext();

  return (
    <div
      className={`${style[status]} w-fit max-w-[70%] break-words rounded-xl px-3 py-1 text-lg font-medium shadow mobile:px-5 mobile:text-xs tablet:text-sm`}
    >
      {status !== "send" && context?.chatType === "public" && (
        <div className=" text-stone-400 text-sm">{user}</div>
      )}
      <div>{message}</div>
    </div>
  );
};
export default Message;
