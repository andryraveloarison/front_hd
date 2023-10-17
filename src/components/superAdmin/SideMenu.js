import { useState } from "react";
import { Link } from "react-router-dom";
import Control from "../../assets/control.png";
import Logo from "../../assets/logo.png";
import Chart_fill from "../../assets/Chart_fill.png";
import Chat from "../../assets/Chat.png";
import User from "../../assets/User.png";
import Ticket from "../../assets/Calendar.png";
import { selectUser } from '../../features/userSlice';
import { useSelector } from 'react-redux';


const SideMenu = () => {
  const user = useSelector(selectUser)
  const [open, setOpen] = useState(true);
  const Menus = [
    { title: "Dashboard", src: Chart_fill },
    { title: "Utilisateur", src: User, gap: true },
    { title: "Ticket ", src: Ticket },
    { title: "Discussion", src: Chat },
  ];

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <div className="flex "style={{ position: 'fixed', top: 0, left: 0, width: '100%'}}>
      <div
        className={`${
          open ? "w-65" : "w-20 "
        } bg-primary h-screen p-5  pt-8 relative duration-300`}
      >
        <img
          src={Control}
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
           border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={handleToggle}
        />
        <div className="flex gap-x-4 items-center">
          <img
            src={Logo}
            className={`cursor-pointer duration-500 ${
              open && "rotate-[360deg]"
            }`}
          />
          <h1
            className={`text-white origin-left font-medium text-xl duration-200 ${
              !open && "scale-0"
            }`}
          >
            {user.nom}
          </h1>
        </div>
        <ul className="pt-6">
          {Menus.map((menu, index) => (
            <li
              key={index}
              className={`rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-start gap-x-4 
              ${menu.gap ? "mt-9" : "mt-2"} ${index === 0 && "bg-light-white"} ${open && "flex"}`}
            >
              <img src={menu.src} />  
              {menu.src === User? (
                <details className="items-start">
                  <summary>
                    User
                  </summary>
                  <ul>
                    <li>
                      <Link to="/superAdmin/user/index">Liste</Link>
                    </li>
                    <li>
                      <Link to="/superAdmin/user/add">Ajouter</Link>
                    </li>
                  </ul>
                </details>
              ) : menu.src === Ticket? (
                <details>
                  <summary>
                    Ticket
                  </summary>
                  <ul>
                    <li>
                      <Link to="/superAdmin/ticket/index">Liste</Link>
                    </li>
                    <li>
                      <Link to="/superAdmin/ticket/current">En cours</Link>
                    </li>
                  </ul>
                </details>
              ) : menu.src === Chat?(
                <span className={`${!open && "hidden"} origin-left duration-200`}>
                  <Link to="/superAdmin/chat/index">{menu.title}</Link>
                </span>
              ): (
                <span className={`${!open && "hidden"} origin-left duration-200`}>
                  <Link to="/superAdmin/">{menu.title}</Link>
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SideMenu;
