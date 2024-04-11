import { PiUserCircleDuotone } from "react-icons/pi";

const Header = () => {
  return (
    <div className="bg-blue-500 flex items-center gap-4 p-2">
      <span className="text-5xl">
        <PiUserCircleDuotone />
      </span>
      <p className="text-2xl font-semibold">user name</p>
    </div>
  );
};
export default Header;
