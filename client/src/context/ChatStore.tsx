import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { socket } from "../services/seckot";
import { useNavigate } from "react-router";

interface message {
  status: string;
  message: string;
  user: string;
}

interface ChatValues {
  username: string;
  createUser: Function;
  users: string[];
  currentUser: string;
  selectCurrentUser: Function;
  messages: message[];
  addMessage: Function;
  chatType: "private" | "public";
  handleCloseChat: Function;
}

const ChatContext = createContext<ChatValues | null>(null);
const ChatStore = ({ children }: { children: ReactNode }) => {
  const [notification] = useState(new Audio("whatsapp_notification.mp3"));
  const navigate = useNavigate();

  const storeUsername = localStorage.getItem("username");
  const [username, setUSername] = useState<string>(
    storeUsername ? storeUsername : "",
  );
  const storeUser = localStorage.getItem("users");
  const [users, setUsers] = useState<string[]>(
    storeUser ? JSON.parse(storeUser) : [],
  );
  const [currentUser, setCurrentUser] = useState<string>("");
  const [messages, setMessages] = useState<message[]>([]);
  const [chatType, setChatType] = useState<"private" | "public">("private");

  const addMessage = (message: string, status: string, user: string) => {
    const handleMsg: message = { status, message, user };
    setMessages((prevMessages) => [...prevMessages, handleMsg]);
  };

  const createUser = (user: string) => {
    socket.emit("username", user);
    setUSername(user);
    localStorage.setItem("username", user);
    navigate("/chat");
  };

  const selectCurrentUser = (user: string, type: "private" | "public") => {
    setCurrentUser(user);
    setChatType(type);
    if (currentUser.length !== 0) setMessages([]);
  };

  const handleCloseChat = (event?: KeyboardEvent) => {
    if (event===undefined || event?.key === "Escape") {
      setCurrentUser("");
      setMessages([]);
    }
  };

  useEffect(() => {
    socket.on("get_users", (users) => {
      setUsers(users);
      localStorage.setItem("users", JSON.stringify(users));
    });

    socket.on("chat message", (data) => {
      const { from, message } = data;
      if (from !== username) addMessage(message, "receive", from);
    });

    socket.on("private message", (data) => {
      const { from, message } = data;
      if (from !== username) addMessage(message, "receive", from);
    });

    document.addEventListener("keydown", handleCloseChat);

    if (messages[messages.length - 1]?.status == "receive") notification.play();

    //clean up
    return () => {
      socket.off("get_users");
      socket.off("chat message");
      socket.off("private message");
      document.removeEventListener("keydown", handleCloseChat);
    };
  }, [messages]);

  return (
    <ChatContext.Provider
      value={{
        username,
        createUser,
        users,
        currentUser,
        selectCurrentUser,
        messages,
        addMessage,
        chatType,
        handleCloseChat
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

export { useChatContext };
export default ChatStore;
