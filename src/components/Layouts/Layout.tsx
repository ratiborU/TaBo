// import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import icon from "../../assets/icons/Profile.svg"
import { useAppSelector } from "../../services/redux/hooks";
import { selectUser } from "../../services/redux/fiatures/userSlice";


function Layout() {
  const user = useAppSelector(selectUser);
  return (
    <div className='wrapper'>
      <header className='header'>
        <nav className='header__nav nav'>
          <NavLink className="header__navlink" to={`/`}>Главная</NavLink>
          <NavLink className="header__navlink" to={`/about`}>О доске</NavLink>
          <NavLink className="header__navlink" to={`/login/login`}>{user.name ? user.name: "Войти"}</NavLink>
          <NavLink className="header__navlink" to={`/login/login`}><img src={icon} alt="" /></NavLink>
        </nav>
      </header>

      <main className='main'>
        <Outlet/>
      </main>
    </div>
  );
}

export default Layout;