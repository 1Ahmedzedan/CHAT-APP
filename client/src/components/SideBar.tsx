import { useChatContext } from "../context/ChatStore";
import ProfileTab from "./ProfileTab";
import User from "./User";

const SideBar = () => {
  const context = useChatContext();

  return (
    <div
      className={`h-screen w-[25%] bg-stone-50 mobile:w-[100%] 
      ${context?.currentUser.length !== 0 ? "mobile:hidden" : ""}
       border-r-2 border-stone-300`}
    >
      <ProfileTab />
      <div className="h-[calc(100%-64px)] w-full divide-y-2 divide-stone-200 overflow-y-auto bg-stone-50">
        <User username="Public Chat" type="public" />
        {context?.users?.map(
          (user: string, index: number) =>
            context.username != user && <User username={user} key={index} />,
        )}
      </div>
    </div>
  );
};
export default SideBar;
