import { Avatar, Grid2, Typography, Menu, MenuItem } from "@mui/material";
import adminAvatar from "../../../assets/admin.jpg";
import { KeyboardArrowDown } from "@mui/icons-material";
import classes from "./NavbarAdmin.module.css";
import { useEffect, useState } from "react";
import authSlice from "../../../redux/slice/authSlice";
import { handleLogout } from "../../../api/user";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { NotificationIcon } from "../../../icon/Icon";
import { AUTO_CLOSE_TOAST_DURATION } from "../../../constants";

const NavBarAdmin = ({ }) => {
  const [anchorElNoti, setAnchorElNoti] = useState(null);
  const [anchorEL, setAnchorEL] = useState(null);
  const [isOpenNotification, setIsOpenNotification] = useState(false);
  // const { totalNotificationItems } = useSelector((state) => state.notification);
  // const [totalItems, setTotalItems] = useState(totalNotificationItems);
  const userId = useSelector((state) => state.auth.userInfo.id);
  const open = Boolean(anchorEL);
  const handleNotificationClick = (event) => {
    setAnchorElNoti(event.currentTarget);
    setIsOpenNotification((prev) => !prev);
  };
  const handleOpen = (event) => {
    setAnchorEL(event.currentTarget);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClickToLogout = () => {
    const logout = async () => {
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        await handleLogout(refreshToken);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        dispatch(
          authSlice.actions.setAuthInfo({
            isAuthenticated: false,
            userInfo: {},
          })
        );
        navigate("/login");
      } catch (err) {
        console.error(err);
        toast.error(err.response.data.message, {
          autoClose: AUTO_CLOSE_TOAST_DURATION,
        });
      }
    };
    logout();
  };

  const handleClose = () => setAnchorEL(null);
  return (
    <Grid2 className={classes.container}>
      <Typography sx={{ fontWeight: "600" }}>DASHBOARD</Typography>
      <div style={{ display: "flex", columnGap: '2rem', alignItems: 'center' }}>
        {/* <Link
          to="/"
          style={{ textDecoration: "underline", color: "var(--admin-color)" }}
        >
          User's page
        </Link> */}
        <div className={classes.iconNotification} onClick={handleNotificationClick}>
          {/* <NotificationIcon className={classes.notification} /> */}
          {/* {totalItems > 0 && (
            <span className={classes.countItemCart}>{totalItems}</span>
          )} */}
        </div>

        {/* <NotificationDropdown
          isOpen={isOpenNotification}
          anchorEl={anchorElNoti}
          setIsOpen={setIsOpenNotification}
        /> */}
        <Grid2 className={classes.button} onClick={handleOpen}>
          {/* <Avatar src={adminAvatar} sx={{ mr: 2 }} /> */}
          Admin
          <KeyboardArrowDown />
        </Grid2>
        <Menu
          id="admin-menu"
          anchorEl={anchorEL}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          sx={{
            marginTop: "1rem",
          }}
        >
          <MenuItem onClick={handleClickToLogout} sx={{ width: "200px" }}>
            Logout
          </MenuItem>
        </Menu>
      </div>
    </Grid2>
  );
};

export default NavBarAdmin;
