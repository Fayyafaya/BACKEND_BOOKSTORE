import React, { useState, useContext } from "react";
import { DataContext } from "../store/GlobalState";
import { AppBar, Tab, Tabs, Toolbar, Typography } from "@mui/material";
import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";
import { NavLink, useNavigate } from "react-router-dom";
import Cookie from 'js-cookie'

const Header = () => {
  const {state, dispatch} = useContext(DataContext)
  const { auth } = state
  const [value, setValue] = useState();
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookie.remove('refreshtoken', {path: 'api/auth/refresh_token'})
    localStorage.removeItem('firstLogin')
    dispatch({ type: 'AUTH', payload: {} })
    dispatch({ type: 'NOTIFY', payload: {success: 'Logged out!'} })
    return navigate("/login")
}
  return (
    <div>
      <AppBar sx={{ backgroundColor: "#232F3D" }} position="sticky">
        <Toolbar>
          <NavLink to="/" style={{ color: "white" }}>
            <Typography>
              <LibraryBooksOutlinedIcon />
            </Typography>
          </NavLink>
          <Tabs
            sx={{ ml: "auto" }}
            textColor="inherit"
            indicatorColor="primary"
            value={value}
            onChange={(e, val) => setValue(val)}
          >
            <Tab LinkComponent={NavLink} to="/add" label="Add product" />
            <Tab LinkComponent={NavLink} to="/books" label="Books" />
            <Tab LinkComponent={NavLink} to="/about" label="About Us" />
            {
              auth.user ?
              // <button onClick={handleLogout}>Logout</button>
              <Tab LinkComponent={NavLink} onClick={handleLogout} label="Logout" />
              :
              <Tab LinkComponent={NavLink} to="/login" label="Login" />
            }
          </Tabs>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
