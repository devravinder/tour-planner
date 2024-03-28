import { NavLink, useNavigate } from "react-router-dom";
import { Avatar } from "components/Image";
import Icons from "components/icons";

const navigations = [
  {
    name: "Tours",
    href: "/tours/list",
  },
  {
    name: "New Tour",
    href: "/tours/new",
  },
];

const Navigation = () => {
  const navigate = useNavigate();

  return (
    <nav className="flex flex-row py-1">
      <ul className="flex flex-row">
        {navigations.map((link, index) => (
          <NavLink
            key={index}
            end
            className={({ isActive }) =>
              `p-2 font-semibold hover:text-primary-500 ${
                isActive ? "text-primary" : ""
              }`
            }
            to={link.href}
          >
            {link.name}
          </NavLink>
        ))}
      </ul>
      <div className="pl-8 flex flex-row">
        <Avatar
          onClick={() => navigate("/")}
          className="cursor-pointer hover:bg-primary-100"
        >
          <Icons.Github className="w-6 h-6" />
        </Avatar>
        <Avatar
          onClick={() => navigate("/")}
          className="cursor-pointer hover:bg-slate-100"
        >
          <Icons.UserCircle className="w-7 h-7" />
        </Avatar>
      </div>
    </nav>
  );
};

export default Navigation;
