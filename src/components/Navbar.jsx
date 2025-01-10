import React, { useState, useEffect } from "react";

import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Nav.css";
import logo from "../assets/logo.svg";
import authAPI from "../api/Auth";
import { observer } from "mobx-react";
import { Person2Rounded, Add } from "@mui/icons-material";
import { MenuItem, Menu, AppBar } from "@mui/material";
import Dropdown from "react-bootstrap/Dropdown";

const Navbar = () => {
  const navigate = useNavigate();
  const loaction = useLocation();
  // Define state for active nav item
  const [active, setActive] = useState("About");
  const [isLoading, setIsLoading] = useState(false);
  const [addingEl, setAddingEl] = React.useState(null);
  const adding = Boolean(addingEl);
  const addingMenu = (event) => {
    setAddingEl(event.currentTarget);
  };

  const handleAddingClose = () => {
    setAddingEl(null);
  };

  const [isAdmin, setIsAdmin] = useState(
    authAPI?.user?.type === "admin" ? true : false
  );

  // Handler to change active state
  const handleClick = (item) => {
    console.log("🚀 ~ handleClick ~ item:", item);
    if (item === "Home" && authAPI.user != null) {
      navigate("/select-categories");
    } else if (item === "Home" && authAPI.user == null) {
      navigate("/sign-up");
    }
    // item.preventDefault();

    setActive(item);
  };
  var numberOfGames = 0;

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const userMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSignOut = () => {
    authAPI.signOut(navigate);
  };

  return (
    <header>
      <nav>
        <AppBar
          className="navbar"
          position="relative"
          // variant="dense"
          sx={{
            top: "0",
            bottom: "0",
            height: "80px",
          }}
        >
          <ul>
            <img src={logo} className="App-logo" alt="logo" />

            <Link className="nav-title" to={"/"}>
              <li>
                <a
                  className={active === "Home" ? "active" : ""}
                  onClick={() => handleClick("Home")}
                >
                  العب
                </a>
              </li>
            </Link>
            <Link className="nav-title" to={"/about"}>
              <li>
                <a
                  className={active === "About" ? "active" : ""}
                  onClick={() => handleClick("About")}
                >
                  قصتنا
                </a>
              </li>
            </Link>
            <Link className="nav-title" to={"/contact"}>
              <li>
                <a
                  className={active === "Contact" ? "active" : ""}
                  onClick={() => handleClick("Contact")}
                >
                  تواصل معنا
                </a>
              </li>
            </Link>
          </ul>
          <h1>{import.meta.env.REACT_APP_STRIPE_KEY}</h1>
          {isAdmin ? (
            <div className="leading-icon">
              <div className="adding-menu">
                <Dropdown>
                  <Dropdown.Toggle variant="error" id="dropdown-basic">
                    <Add open={adding} onClose={handleAddingClose} />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => navigate("/add-questions")}>
                      إضافة سؤال
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => navigate("/add-category")}>
                      إضافة فئة
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => navigate("/all-questions")}>
                      عرض الأسئلة
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => localStorage.removeItem("gameId")}
                    >
                      مسح اللعبة{" "}
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
          ) : (
            <></>
          )}

          <div className="leading">
            <button className="btn nav-btn-primary">
              عدد الألعاب المتبقية: {numberOfGames}
            </button>
            {authAPI.user == null ? (
              <button className="btn nav-btn-secondary">دخول</button>
            ) : (
              <>
                <button
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={userMenu}
                  className="nav-btn-secondary username"
                >
                  {authAPI.user.firstName}
                </button>

                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem onClick={handleSignOut}>تسجيل خروج</MenuItem>
                </Menu>
                <Person2Rounded sx={{ fontSize: 32 }} className="user-icon" />
              </>
            )}
          </div>
        </AppBar>
      </nav>
    </header>
  );
};

export default observer(Navbar);
