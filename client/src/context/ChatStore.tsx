import { ReactNode, createContext, useContext, useState } from "react";
import { socket } from "../services/seckot";

interface ChatValues {
  username: string;
  createUser: Function;
}

const ChatContext = createContext<ChatValues | null>(null);
const ChatStore = ({ children }: { children: ReactNode }) => {
  const [username, setUSername] = useState("");
  const createUser = (user: string) => {
    socket.emit("username", user);
    setUSername(user);
  };
  return (
    <ChatContext.Provider
      value={{
        username,
        createUser,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

const useChatContext = () => {
  const context = useContext(ChatContext);

  if (context === undefined) throw new Error("out of provider");

  return context;
};

export {useChatContext} ; 
export default ChatStore;
