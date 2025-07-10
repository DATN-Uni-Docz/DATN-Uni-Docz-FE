import { Outlet } from "react-router-dom";
import Footer from "./Footer/Footer";
import NavbarUser from "./NavbarUser/NavbarUser";
import ScrollToTop from "../../router/ScrollToTop";

const LayoutUser = () => {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <ScrollToTop/>
      <NavbarUser />
      <div style={{ flex: 1 }}>
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};

export default LayoutUser;
