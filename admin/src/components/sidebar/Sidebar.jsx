import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link, NavLink } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import logo from '../../assets/logo.svg';

const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);
  const { logout } = useContext(AuthContext);
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <img src={logo} alt="Logo" className="logo" />
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <NavLink to="/" style={{ textDecoration: "none" }} end>
            {
              ({ isActive }) => (
                <li className={isActive ? 'active' : undefined}>
                  <DashboardIcon className="icon" />
                  <span>Dashboard</span>
                </li>
              )
            }
          </NavLink>
          <p className="title">LISTS</p>
          <NavLink to="/users" style={{ textDecoration: "none" }}>
            {
              ({ isActive }) => (
                <li className={isActive ? 'active' : undefined}>
                  <PersonOutlineIcon className="icon" />
                  <span>Users</span>
                </li>
              )
            }
          </NavLink>
          <NavLink to="/hotels" style={{ textDecoration: "none" }}>
            {
              ({ isActive }) => (
                <li className={isActive ? 'active' : undefined}>
                  <StoreIcon className="icon" />
                  <span>Hotels</span>
                </li>
              )
            }
          </NavLink>
          <NavLink to="/rooms" style={{ textDecoration: "none" }}>
            {
              ({ isActive }) => (
                <li className={isActive ? 'active' : undefined}>
                  <CreditCardIcon className="icon" />
                  <span>Rooms</span>
                </li>
              )
            }
          </NavLink>
          <p className="title">USER</p>
          <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Profile</span>
          </li>
          <li onClick={logout}>
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div>
    </div>
  );
};

export default Sidebar;
