// import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import icon from "../../assets/icons/Profile.svg"
import { useAppSelector } from "../../services/redux/hooks";
import { selectUser } from "../../services/redux/fiatures/userSlice";
import UserImage from '../UserImage';

function DeskLayout() {
  const user = useAppSelector(selectUser);
  return (
    <div className='wrapper'>
      <header className='header-desk'>
        <nav className='header__nav nav'>
          <NavLink className="header__navlink" to={`/`}>Главная</NavLink>
          <NavLink className="header__navlink" to={`/about`}>О доске</NavLink>
          <NavLink className="header__navlink" to={`/login/login`}>{user.name ? user.name: "Войти"}</NavLink>
          {/* <NavLink className="header__navlink" to={`/login/login`}><img src={icon} alt="" /></NavLink> */}
          <UserImage username={user.name} size='40px' fontSize='24px' className='header__navlink'/>
        </nav>
      </header>
      <main className='main-desk'>
        <Outlet/>
      </main>
    </div>
  );
}

export default DeskLayout;