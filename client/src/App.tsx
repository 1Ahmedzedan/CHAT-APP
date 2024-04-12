import { HashRouter, Route, Routes } from "react-router-dom";
import RegisterPage from "./components/RegisterPage";
import ChatPage from "./components/ChatPage";
import MessageContainer from "./components/MessageContainer";
import ChatStore from "./context/ChatStore";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <HashRouter>
        <ChatStore>
          <Routes>
            <Route path="/" element={<RegisterPage />} />
            <Route path="/chat" element={<ChatPage />}>
              <Route path="/chat/:name" element={<MessageContainer />} />
            </Route>
          </Routes>
        </ChatStore>
      </HashRouter>
      <ToastContainer />
    </>
  );
}

export default App;