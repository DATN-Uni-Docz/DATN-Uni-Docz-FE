import {
  Grid2,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  Collapse,
} from "@mui/material";
import {
  ArticleOutlined,
  FolderOutlined,
  SchoolOutlined,
  FlagOutlined,
  PersonOutline,
  AttachMoneyOutlined,
} from "@mui/icons-material";
import ListItem from "../../../components/ListItem/ListItem";
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import classes from "./SidebarAdmin.module.css";
import adminRoutes from "../../../router/adminRoutes";
import { useIntl } from "react-intl";
import logo from "../../../assets/uniDoczLogo.png";

const sidebarConfig = (intl) => [
  {
    id: "document",
    title: intl.formatMessage({ id: "SidebarAdmin.document" }),
    href: adminRoutes.document,
    icon: <ArticleOutlined/>
  },
  {
    id: "course",
    title: intl.formatMessage({ id: "SidebarAdmin.course" }),
    href: adminRoutes.course,
    icon: <FolderOutlined/>
  },
  {
    id: "university",
    title: intl.formatMessage({ id: "SidebarAdmin.university" }),
    href: adminRoutes.university,
    icon: <SchoolOutlined/>
  },
  {
    id: "report",
    title: intl.formatMessage({ id: "SidebarAdmin.report" }),
    href: adminRoutes.report,
    icon: <FlagOutlined/>
  },
  {
    id: "subscription",
    title: intl.formatMessage({ id: "SidebarAdmin.subscription" }),
    href: adminRoutes.subscription,
    icon: <AttachMoneyOutlined/>
  },
  {
    id: "user",
    title: intl.formatMessage({ id: "SidebarAdmin.user" }),
    href: adminRoutes.user,
    icon: <PersonOutline/>
  },
]

const SidebarAdmin = ({}) => {
  const location = useLocation();
  const [isOpen, setOpen] = useState(false);
  const intl = useIntl();

  const handleToggle = () => {
    setOpen(!isOpen);
  };
  return (
    <Grid2
      sx={{
        background: "var(--colorBoldSecondary)",
        opacity: 0.85,
        padding: "2rem",
        width: "300px",
        minWidth: "300px",
        position: "sticky",
        top: 0,
        height: "100vh",
        overflowY: "auto",
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontWeight: 600,
          marginTop: "-0.5rem",
          textAlign: "center",
          marginBottom: 1,
        }}
      >
          <img alt="logo" src={logo} className={classes.logo} />
      </Typography>
      <Grid2>
        <List>
          {sidebarConfig(intl).map((item) => {
            const { id, href, icon, title } = item;
            return (
              <NavLink
                key={id}
                to={href}
                className={({ isActive }) =>
                  isActive ? classes.active : classes.nav_link
                }
              >
                <ListItem
                  title={title}
                  icon={icon}
                  isActive={location.pathname === href}
                />
              </NavLink>
            );
          })}
        </List>
      </Grid2>
    </Grid2>
  );
};

export default SidebarAdmin;
