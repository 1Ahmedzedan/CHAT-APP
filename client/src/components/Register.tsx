import Logo from "./Logo";
import Welcome from "../assets/Welcome.gif";
const Register = () => {
  return (
    <div className="flex min-h-screen flex-col justify-between p-8 mobile:p-4">
      <div>
        <Logo />
      </div>
      <div className="flex justify-between mobile:flex-col-reverse mobile:items-center">
        <div className="flex w-[50%] mobile:w-full flex-col items-center justify-center gap-10">
          <p className=" text-center text-6xl mobile:text-3xl font-semibold capitalize tablet:text-4xl">
            Welcome in <span className="font-bold text-blue-900">Talk</span> App
          </p>
          <form className="flex flex-col items-center gap-5">
            <div>
              <p className="text-2xl font-medium capitalize tablet:text-lg mobile:text-xl text-center">
                enter your name and start talk with others
              </p>
            </div>
            <input
              type="text"
              placeholder="User Name"
              className=" w-[60%] mobile:w-[80%] rounded p-2 font-semibold ring-2 ring-blue-900 ring-offset-0 text-center text-lg transition-all duration-500  focus:outline-none focus:ring-offset-4 tablet:text-sm"
            />
            <button type="submit" className="text-white text-xl tablet:text-lg bg-blue-900 font-semibold py-1 px-10 tablet:px-8 rounded transition-all duration-500 hover:bg-blue-800">Start</button>
          </form>
        </div>

        <img src={Welcome} className="h-[500px] mobile:h-[300px] w-[35%] mobile:w-[75%] tablet:w-[45%] tablet:h-[400px]" alt="img" />
      </div>
    </div>
  );
};
export default Register;
