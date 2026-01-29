import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { useDispatch,useSelector } from "react-redux";
import { toggleSideBar } from "../../react_redux/slices/userSlice";
import { adminNavbar } from "../../assets/assets";
import { NavLink } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";

const SideBar = () => {
  const isOpen = useSelector((state)=>state.user.isSidebar);
  
  const [openMenuId, setOpenMenuId] = useState(null);
  const dispatch = useDispatch();

  const handleToggle = (id) => {
    setOpenMenuId(prev => (prev === id ? null : id));
  };

  return (
    <div className={`bg-[#0F172A] w-[240px] text-[#E5E7EB] z-5  h-screen p-2 flex flex-col`}>
      
      {/* Header */}
      <div className="flex items-center gap-5 mb-8">
        <GiHamburgerMenu
          onClick={() => dispatch(toggleSideBar())}
          className="h-6 w-8 cursor-pointer"
        />
        <h1 className="font-bold text-2xl">AdminS</h1>
      </div>

      {/* Menu */}
      <div className="flex flex-col gap-2">

        {adminNavbar.map((item) => {
          const Icon = item.icon;
          const isOpen = openMenuId === item.id;

          // CASE 1: MENU WITH SUBMENU
          if (item.hasSubMenu) {
            return (
              <div key={item.id} >
                <div
                  onClick={() => handleToggle(item.id)}
                  className="flex items-center gap-4 p-2 rounded-md cursor-pointer hover:bg-[#1E293B]"
                >
                  <Icon className="h-5 w-5 text-[#CBD5E1]" />
                  <span className="flex-1">{item.name}</span>
                  {isOpen ? <IoIosArrowDown /> : <FaAngleRight />}
                </div>

                {isOpen && (
                  <div className="ml-8 mt-1 hover:bg-[#1E293B] flex flex-col gap-1">
                    {item.subItems.map((sub) => {
                      const SubIcon = sub.icon;
                      return (
                        <NavLink
                          key={sub.id}
                          to={sub.path}
                          onClick={()=>dispatch(toggleSideBar())}
                          className={({ isActive }) =>
                            `flex items-center gap-3 p-2 rounded-md  ${
                              isActive ? "bg-gray-600 text-blue-400" : ""
                            }`
                          }
                        >
                          <SubIcon className="h-4 w-4" />
                          {sub.name}
                        </NavLink>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          }

          // CASE 2: MENU WITHOUT SUBMENU (NAVIGATION)
          return (
            <NavLink
              key={item.id}
              to={item.path}
              onClick={()=>dispatch(toggleSideBar())}
              className={({ isActive }) =>
                `flex items-center gap-4 p-2 rounded-md hover:bg-[#1E293B]${
                  isActive ? "bg-gray-500 text-blue-400" : ""
                }`
              }
            >
              <Icon className="h-5 w-5 text-[#CBD5E1]" />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default SideBar;
