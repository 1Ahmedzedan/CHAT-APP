import { IoPeopleCircleSharp } from "react-icons/io5";
import { PiUserCircleDuotone } from "react-icons/pi";
import { useChatContext } from "../context/ChatStore";

interface Props {
  username: string;
  type?: "public" | "private";
}

const User = ({ username, type = "private" }: Props) => {
  const context = useChatContext() ; 
  const isCurrentUser = (username === context?.currentUser) ; 

  return (
    <div 
    onClick={()=>context?.selectCurrentUser(username , type)}
    className={`flex w-full cursor-pointer items-center gap-6 p-2 transition-all duration-300 ${isCurrentUser ? "bg-stone-300" : "hover:bg-stone-100"}`}>
      <span className="text-5xl tablet:text-4xl mobile:text-4xl">
        {type === "public" ? <IoPeopleCircleSharp /> : <PiUserCircleDuotone />}
      </span>
      <p className="text-xl font-semibold tablet:text-lg mobile:text-lg">{username}</p>
    </div>
  );
};
export default User;
