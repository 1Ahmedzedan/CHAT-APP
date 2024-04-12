import { PiUserCircleDuotone } from "react-icons/pi";
import { useChatContext } from "../context/ChatStore";

const ProfileTab = () => {
  const context = useChatContext();

  return (
    <div className="flex w-full cursor-pointer items-center gap-6 p-2 bg-blue-500 text-white">
      <span className="text-5xl">
        <PiUserCircleDuotone />
      </span>
      <p className="text-xl font-semibold">{context?.username}</p>
    </div>
  );
};
export default ProfileTab;
