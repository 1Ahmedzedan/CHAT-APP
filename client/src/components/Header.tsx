import { PiUserCircleDuotone } from "react-icons/pi";
import { useChatContext } from "../context/ChatStore";
import { IoPeopleCircleSharp } from "react-icons/io5";
import { IoMdArrowRoundBack } from "react-icons/io";

const Header = () => {
  const context = useChatContext();

  return (
    <div className="flex items-center gap-4 bg-blue-500 p-2 text-white">
      <div className="flex justify-center items-center">
        <button className="text-2xl hidden mobile:block tablet:block" onClick={()=>context?.handleCloseChat()}>
          <IoMdArrowRoundBack />
        </button>
        <span className="text-5xl tablet:text-4xl mobile:text-4xl">
          {context?.chatType === "public" ? (
            <IoPeopleCircleSharp />
          ) : (
            <PiUserCircleDuotone />
          )}
        </span>
      </div>
      <p className="text-xl font-semibold tablet:text-lg mobile:text-lg">
        {context?.currentUser}
      </p>
    </div>
  );
};
export default Header;
