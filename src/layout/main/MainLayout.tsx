import { Outlet, useNavigate } from "react-router";
import Navigation from "./Navigation";
import { Avatar } from "components/Image";

export default function MainLayout() {
  const navigate = useNavigate();

  return (
    <>
      <header
        className={
          "px-2 z-50 flex justify-between sticky top-0 bg-white border-b"
        }
      >
        <div className="flex flex-row items-center justify-center">
          <Avatar onClick={() => navigate("/")} className="cursor-pointer">
            <img src="/logo.svg" className="rounded-full text-primary" />
          </Avatar>
          <span className="font-semibold">Some Technologies</span>
        </div>
        <Navigation />
      </header>
      <main className="px-2">
        <Outlet></Outlet>
      </main>
    </>
  );
}
