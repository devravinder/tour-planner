import { postLogin } from "services/auth";
import { useAppContext } from "state/app-context";

export default function LoginPage() {
  const { setIsAuthenticated, setUser } = useAppContext();

  const login = () => {
    // do login action & get user details & token

    const user: AuthUser = {
      name: "Ravinder Reddy",
      email: "ravinder@paravartech.com",
      userType: "SUPER_ADMIN",
    };
    postLogin(user);
    setUser(user);
    setIsAuthenticated(true);
  };

  return (
    <div className=" flex justify-center items-center w-full h-screen">
      <div className="flex flex-col justify-center rounded-md shadow p-4 w-96 h-96 gap-4">
        <div
          onClick={login}
          className="bg-blue-400 text-white rounded-md cursor-pointer p-2 text-center"
        >
          Login
        </div>
        <div
          onClick={login}
          className="bg-blue-400 text-white rounded-md cursor-pointer p-2 text-center"
        >
          Login
        </div>
        <div
          onClick={login}
          className="bg-blue-400 text-white rounded-md cursor-pointer p-2 text-center"
        >
          Login
        </div>
      </div>
    </div>
  );
}
