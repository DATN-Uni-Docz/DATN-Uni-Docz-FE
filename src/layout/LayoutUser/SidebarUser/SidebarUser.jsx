import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SettingsIcon from "@mui/icons-material/Settings";
import { Link, NavLink } from "react-router-dom";
import { useIntl } from "react-intl";
import classNames from "classnames";
import css from "./SidebarUser.module.css";
import { string } from "prop-types";
import { PrimaryButton } from "../../../components/CustomButton/CustomButton";
import {
  AccountBox,
  Add,
  Article,
  Folder,
  Paid,
  Settings,
} from "@mui/icons-material";
import memberRoutes from "../../../router/memberRoutes";
import { useSelector } from "react-redux";
import { userInfoSelector } from "../../../redux/selector";
import { useMemo } from "react";
import anonymousAvatar from "../../../assets/anonymousAvatar.png";

const menuItems = (intl) => {
  return [
    // {
    //   content: intl.formatMessage({ id: "SidebarUser.home" }),
    //   icon: <HomeIcon />,
    //   path: memberRoutes.home,
    // },
    {
      content: intl.formatMessage({ id: "SidebarUser.myDocuments" }),
      icon: <Article />,
      path: memberRoutes.myDocuments,
    },
    {
      content: intl.formatMessage({ id: "SidebarUser.favouriteDocuments" }),
      icon: <FavoriteIcon />,
      path: memberRoutes.favouriteDocuments,
    },
    {
      content: intl.formatMessage({ id: "SidebarUser.favouriteCourses" }),
      icon: <Folder />,
      path: memberRoutes.favouriteCourses,
    },
    {
      content: intl.formatMessage({ id: "SidebarUser.subscriptions" }),
      icon: <Paid/>,
      path: memberRoutes.subscription,
    },
    {
      content: intl.formatMessage({ id: "SidebarUser.profile" }),
      icon: <AccountBox />,
      path: memberRoutes.profile,
    },
    {
      content: intl.formatMessage({ id: "SidebarUser.changePassword" }),
      icon: <Settings />,
      path: memberRoutes.changePassword,
    },
  ];
};

const SidebarUser = (props) => {
  const intl = useIntl();
  const { className } = props;
  const classes = classNames(className, css.sidebar);
  const currentUser = useSelector(userInfoSelector);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const userValues = useMemo(() => {
    const { firstName, lastName, university } = currentUser || {};
    return {
      name: isAuthenticated ? firstName.concat(" ", lastName) : intl.formatMessage({
        id: "SidebarUser.guestName",
      }),
      university: university ? university.name : intl.formatMessage({
        id: "SidebarUser.guestUniversity",
      }),
    };
  }, [currentUser, intl, isAuthenticated]);

  return (
    <Box
      boxShadow={2}
      className={classes}
      sx={{
        width: 300,
        padding: "30px",
        border: "1px solid var(--colorGrey100)",
        position: "sticky",
        top: "var(--navbarHeight)",
        height: "calc(100vh - var(--navbarHeight))",
        overflowY: "auto",
      }}
    >
      <Box sx={{ mb: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {isAuthenticated ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minWidth: 50,
                height: 50,
                backgroundColor: "var(--colorBoldSecondary)",
                borderRadius: "50%",
              }}
            >
              {currentUser.firstName
                .charAt(0)
                .toUpperCase()
                .concat(".", currentUser.lastName.charAt(0).toUpperCase())}
            </Box>
          ) : (
            <Avatar
              alt="Anonymous Avatar"
              src={anonymousAvatar}
              sx={{ width: 50, height: 50 }}
            />
          )}
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontWeight: 500,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {userValues.name}
            </Typography>
            <Typography
              variant="body2"
              component="div"
              sx={{
                textOverflow: "ellipsis",
                overflow: "hidden",
              }}
            >
              {userValues.university}
            </Typography>
          </Box>
        </Box>
        <PrimaryButton
          startIcon={<Add />}
          fullWidth
          sx={{ borderRadius: "14px", mt: 2.5 }}
        >
          <Link
            to={memberRoutes.uploadDocument}
            style={{ color: "var(--colorWhite)" }}
          >
            {intl.formatMessage({
              id: "SidebarUser.uploadDocumentText",
            })}
          </Link>
        </PrimaryButton>
      </Box>
      <List>
        {menuItems(intl).map((item) => (
          <ListItem
            sx={{
              px: 0,
              py: 0,
              "&:hover": {
                backgroundColor: "var(--secondaryColor)",
              },
              "&:focus": {
                backgroundColor: "var(--secondaryColor)",
              },
              borderRadius: "14px",
            }}
            button
            key={item.text}
          >
            <ListItemButton
              sx={{
                "&:hover": {
                  backgroundColor: "transparent",
                },
                "&:focus": {
                  backgroundColor: "transparent",
                },
                px: 1.5,
                py: 1.5,
              }}
              component={NavLink}
              to={item.path}
              className={({ isActive }) =>
                classNames(css.navLink, {
                  [css.active]: isActive,
                })
              }
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.content} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

SidebarUser.propTypes = {
  className: string,
};

export default SidebarUser;
