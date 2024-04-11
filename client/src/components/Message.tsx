interface Props {
  status: string;
  message: string;
}

const style: any = {
  send: "self-end text-xl font-medium bg-blue-500 text-white w-fit max-w-[70%] rounded-xl px-10 py-2",
  receive:
    "text-xl font-medium bg-white w-fit max-w-[70%] rounded-xl px-10 py-2",
};

const Message = ({ status, message }: Props) => {
  return (
    <div
      className={`${style[status]} break-words shadow mobile:px-5 mobile:text-xs tablet:text-sm`}
    >
        {message}
    </div>
  );
};
export default Message;
