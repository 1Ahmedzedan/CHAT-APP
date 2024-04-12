import { PiUserCircleDuotone } from "react-icons/pi";
import { useChatContext } from "../context/ChatStore";

const Header = () => {
  const context = useChatContext() ;

  return (
    <div className="bg-blue-500 flex items-center gap-4 p-2 text-white">
      <span className="text-5xl">
        <PiUserCircleDuotone />
      </span>
      <p className="text-2xl font-semibold">
        {context?.currentUser}
      </p>
    </div>
  );
};
export default Header;
