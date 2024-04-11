import { PiUserCircleDuotone } from "react-icons/pi";

const User = () => {
  return (
    <div className="w-full p-2 flex items-center gap-6 cursor-pointer hover:bg-stone-100 transition-all duration-500">
      <span className="text-5xl">
        <PiUserCircleDuotone />
      </span>
      <p className="text-xl font-semibold">user name</p>
    </div>
  );
};
export default User;