import { Outlet } from "react-router-dom";
import NavbarUser from "./NavbarUser/NavbarUser";
import SidebarUser from "./SidebarUser/SidebarUser";
import ScrollToTop from "../../router/ScrollToTop";

const LayoutUserWithSideBar = () => {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <ScrollToTop/>
      <NavbarUser />
      <div style={{ flex: 1, display: "flex" }}>
        <SidebarUser/>
        <div style={{ flex: 1, padding: "30px", backgroundColor: "var(--colorGrey50)", overflowY: "auto"}}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default LayoutUserWithSideBar;
