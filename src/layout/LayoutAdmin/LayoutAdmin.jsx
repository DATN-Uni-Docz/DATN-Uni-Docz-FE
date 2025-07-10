import { node } from "prop-types";
import NavbarAdmin from "./NavbarAdmin/NavbarAdmin";
import SidebarAdmin from "./SidebarAdmin/SidebarAdmin";
import { Outlet } from "react-router-dom";

const LayoutAdmin = () => {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <SidebarAdmin />

      <div style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
        <NavbarAdmin />

        <div style={{ padding: "30px 40px 50px" }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

LayoutAdmin.propTypes = {
  children: node,
};

export default LayoutAdmin;
