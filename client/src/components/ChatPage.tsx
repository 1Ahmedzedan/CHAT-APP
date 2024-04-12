import { useChatContext } from "../context/ChatStore";
import Form from "./Form";
import Header from "./Header";
import MessageContainer from "./MessageContainer";
import SideBar from "./SideBar";

const ChatPage = () => {
  const context = useChatContext();
  return (
    <div className="flex h-screen w-full">
      <SideBar />
      {context?.currentUser.length !== 0 && (
        <div className="relative flex h-screen w-[75%] flex-col justify-between mobile:w-[100%]">
          <Header />
          <MessageContainer />
          <Form />
        </div>
      )}
    </div>
  );
};
export default ChatPage;
