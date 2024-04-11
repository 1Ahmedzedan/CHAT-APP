import Logo from "./Logo";
import Welcome from "../assets/Welcome.gif";
import { useChatContext } from "../context/ChatStore";
import { useState } from "react";
const RegisterPage = () => {
  const context = useChatContext();
  const [name, setName] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    context?.createUser(name) ; 
  };
  
  return (
    <div className="flex min-h-screen flex-col justify-between p-8 mobile:p-4">
      <div>
        <Logo />
      </div>
      <div className="flex justify-between mobile:flex-col-reverse mobile:items-center">
        <div className="flex w-[50%] flex-col items-center justify-center gap-10 mobile:w-full">
          <p className=" text-center text-6xl font-semibold capitalize mobile:text-3xl tablet:text-4xl">
            Welcome in <span className="font-bold text-blue-900">Talk</span> App
          </p>
          <form className="flex flex-col items-center gap-5" onSubmit={(e)=>handleSubmit(e)}>
            <div>
              <p className="text-center text-2xl font-medium capitalize mobile:text-xl tablet:text-lg">
                enter your name and start talk with others
              </p>
            </div>
            <input
              value={name}
              type="text"
              placeholder="User Name"
              className=" w-[60%] rounded p-2 text-center text-lg font-semibold ring-2 ring-blue-900 ring-offset-0 transition-all duration-500 focus:outline-none  focus:ring-offset-4 mobile:w-[80%] tablet:text-sm"
              onChange={(e)=>setName(e.target.value)}
            />
            <button
              type="submit"
              className="rounded bg-blue-900 px-10 py-1 text-xl font-semibold text-white transition-all duration-500 hover:bg-blue-800 tablet:px-8 tablet:text-lg"
            >
              Start
            </button>
          </form>
        </div>

        <img
          src={Welcome}
          className="h-[500px] w-[35%] mobile:h-[300px] mobile:w-[75%] tablet:h-[400px] tablet:w-[45%]"
          alt="img"
        />
      </div>
    </div>
  );
};
export default RegisterPage;
