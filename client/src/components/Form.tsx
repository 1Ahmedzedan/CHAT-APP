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
          {openImojiList ? <IoCloseSharp /> : <FaRegFaceSmileBeam />}
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
