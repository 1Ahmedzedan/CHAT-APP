import { useState } from "react";
import { socket } from "../services/seckot";
import { IoCloseSharp } from "react-icons/io5";
import { FaRegFaceSmileBeam } from "react-icons/fa6";
import { RiSendPlane2Fill } from "react-icons/ri";

import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

interface Props {
  addMessage?: Function;
}
const Form = ({ addMessage }: Props) => {
  const [input, setInput] = useState<string>("");
  const [openImojiList, setOpenImojiList] = useState<boolean>(false);

  const handleMessageSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (input.trim() !== "") {
      addMessage?.(input, "send");
      socket.emit("chat message", input); // Send message to server
      setInput("");
    }
  };

  const handleSelectOmoji = (e: any) => {
    setInput((input) => input + e.native);
  };

  return (
    <div className="flex w-full items-center justify-center bg-blue-500 py-2 mobile:py-2">
      <form
        className="relative flex w-full items-center justify-center gap-10 mobile:gap-5 tablet:gap-5"
        onSubmit={handleMessageSubmit}
      >
        <button
          type="button"
          className=" text-2xl text-gray-300 hover:text-gray-200 transition-all duration-500 mobile:text-2xl"
          onClick={() => setOpenImojiList((e) => !e)}
        >
          {openImojiList ? <IoCloseSharp /> : <FaRegFaceSmileBeam />}
        </button>
        <textarea
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-[60%] resize-none rounded bg-gray-50 px-3 py-2 text-sm focus:outline-none mobile:px-8 mobile:py-1 mobile:text-sm tablet:px-8 tablet:py-1 tablet:text-lg"
        ></textarea>

        <button
          type="submit"
          className="rounded-full bg-blue-900 p-2 text-center text-xl text-gray-50 transition-all duration-300 hover:bg-blue-800 mobile:p-2 mobile:text-lg tablet:p-2 tablet:text-lg"
        >
          <RiSendPlane2Fill />
        </button>
        {openImojiList && (
          <div className=" absolute bottom-20 w-[500px] overflow-auto mobile:w-[300px]">
            <Picker
              data={data}
              onEmojiSelect={(e: any) => handleSelectOmoji(e)}
              theme="light"
            />
          </div>
        )}
      </form>
    </div>
  );
};
export default Form;
