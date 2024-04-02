import { useState } from "react";
import { socket } from "../services/seckot";
import { IoCloseSharp } from "react-icons/io5";
import { FaRegFaceSmileBeam } from "react-icons/fa6";
import { RiSendPlane2Fill } from "react-icons/ri";

import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

interface Props {
  addMessage: Function;
}
const Form = ({ addMessage }: Props) => {
  const [input, setInput] = useState<string>("");
  const [openImojiList, setOpenImojiList] = useState<boolean>(false);

  const handleMessageSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (input.trim() !== "") {
      addMessage(input, "send");
      socket.emit("chat message", input); // Send message to server
      setInput("");
    }
  };

  const handleSelectOmoji = (e: any) => {
    setInput((input) => input + e.native);
  };

  return (
    <div className="flex w-screen items-center justify-center bg-blue-300 py-4 mobile:py-2">
      <form
        className="relative flex w-full items-center justify-center gap-10 mobile:gap-5 tablet:gap-5"
        onSubmit={handleMessageSubmit}
      >
        <button
          type="button"
          className=" text-3xl text-stone-600 hover:text-black mobile:text-2xl"
          onClick={() => setOpenImojiList((e) => !e)}
        >
          {openImojiList ? <IoCloseSharp /> : <FaRegFaceSmileBeam />}
        </button>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-[60%] rounded-full bg-gray-50 px-10 py-3 text-xl focus:outline-none mobile:px-8 mobile:py-1 mobile:text-sm tablet:px-8 tablet:py-1 tablet:text-lg"
        />

        <button
          type="submit"
          className="rounded-full bg-blue-600 p-3 text-center text-2xl text-gray-50 transition-all duration-300 hover:bg-blue-500 mobile:p-2 mobile:text-lg tablet:p-2 tablet:text-lg"
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
