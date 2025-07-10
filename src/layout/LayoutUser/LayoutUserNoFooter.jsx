import { Outlet } from "react-router-dom";
import NavbarUser from "./NavbarUser/NavbarUser";
import ScrollToTop from "../../router/ScrollToTop";

const LayoutUserNoFooter = () => {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <ScrollToTop/>
      <NavbarUser />
      <div style={{ flex: 1 }}>
        <Outlet />
      </div>
    </div>
  );
};

export default LayoutUserNoFooter;
