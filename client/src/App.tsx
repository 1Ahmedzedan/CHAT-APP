import { HashRouter, Route, Routes } from "react-router-dom";
import RegisterPage from "./components/RegisterPage";
import ChatPage from "./components/ChatPage";
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
            <Route path="/chat" element={<ChatPage />} />
          </Routes>
        </ChatStore>
      </HashRouter>
      <ToastContainer />
    </>
  );
}

export default App;
