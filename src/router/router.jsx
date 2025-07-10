import { createBrowserRouter, Navigate } from "react-router-dom";
import Home from "../pages/Home/Home";
import LayoutAdmin from "../layout/LayoutAdmin/LayoutAdmin";
import LayoutUser from "../layout/LayoutUser/LayoutUser";
import Login from "../pages/Login/Login";
import Error from "../pages/Error/Error";
import SignUp from "../pages/SignUp/SignUp";
import NotPermitted from "../pages/Error/NotPermitted";
import { ADMIN, MEMBER } from "../constants";
import LayoutUserNoFooter from "../layout/LayoutUser/LayoutUserNoFooter";
import LayoutUserWithSideBar from "../layout/LayoutUser/LayoutUserWithSideBar";
import UploadDocument from "../pages/UploadDocument/UploadDocument";
import PublicDocumentDetails from "../pages/PublicDocumentDetails/PublicDocumentDetails";
import MyDocumentDetails from "../pages/MyDocumentDetails/MyDocumentDetails";
import MainSearch from "../pages/MainSearch/MainSearch";
import CourseDetails from "../pages/CourseDetails/CourseDetails";
import UniversityDetails from "../pages/UniversityDetails/UniversityDetails";
import FavouriteDocuments from "../pages/FavouriteDocuments/FavouriteDocuments";
import FavouriteCourses from "../pages/FavouriteCourses/FavouriteCourses";
import MyDocuments from "../pages/MyDocuments/MyDocuments";
import AdminUniversityList from "../pages/AdminUniversityList/AdminUniversityList";
import AdminUniversityDetails from "../pages/AdminUniversityDetails/AdminUniversityDetails";
import AdminCourseList from "../pages/AdminCourseList/AdminCourseList";
import AdminCourseDetails from "../pages/AdminCourseDetails/AdminCourseDetails";
import AdminDocumentList from "../pages/AdminDocumentList/AdminDocumentList";
import AdminDocumentDetails from "../pages/AdminDocumentDetails/AdminDocumentDetails";
import Onboarding from "../pages/Onboarding/Onboarding";
import AdminReportList from "../pages/AdminReportList/AdminReportList";
import AdminReportDetails from "../pages/AdminReportDetails/AdminReportDetails";
import AdminReportedDocumentDetails from "../pages/AdminReportedDocumentDetails/AdminReportedDocumentDetails";
import AdminUserList from "../pages/AdminUserList/AdminUserList";
import AdminUserDetails from "../pages/AdminUserDetails/AdminUserDetails";
import Confirm from "../pages/ConfirmEmail/Confirm";
import ResendEmail from "../pages/ResendEmail/ResendEmail";
import InitialRoutes from "./InitialRoutes";
import Pricing from "../pages/Pricing/Pricing";
import PaymentSuccess from "../pages/PaymentSuccess/PaymentSuccess";
import PaymentCancel from "../pages/PaymentCancel/PaymentCancel";
import AdminSubscriptionList from "../pages/AdminSubscriptionList/AdminSubscriptionList";
import AdminSubscriptionDetails from "../pages/AdminSubscriptionDetails/AdminSubscriptionDetails";
import SubscriptionList from "../pages/SubscriptionList/SubscriptionList";
import Profile from "../pages/Profile/Profile";
import ChangePassword from "../pages/ChangePassword/ChangePassword";
import ProtectedRoute from "./ProtectedRoutes";
import SubscriptionDetails from "../pages/SubscriptionDetails/SubscriptionDetails";
import Payment from "../pages/Payment/Payment";

const router = createBrowserRouter(
  [
    {
      element: <InitialRoutes />,
      children: [
        {
          path: "/",
          element: <LayoutUser />,
          errorElement: <Error />,
          children: [{ index: true, element: <Home /> }],
        },
        {
          path: "/",
          element: <LayoutUserNoFooter />,
          errorElement: <Error />,
          children: [
            { path: "login", element: <Login /> },
            { path: "signup", element: <SignUp /> },
            {
              path: "pricing",
              element: <Pricing />,
            },
            {
              element: <ProtectedRoute allowRoles={[MEMBER]} />,
              children: [
                {
                  path: "/onboarding",
                  element: <Onboarding />,
                },
                {
                  path: "/onboarding/:tab",
                  element: <Onboarding />,
                },
                {
                  path: "payment-success",
                  element: <PaymentSuccess />,
                },
                {
                  path: "payment-cancel",
                  element: <PaymentCancel />,
                },
                {
                  path: "payment/:type",
                  element: <Payment />,
                },
              ],
            },
          ],
        },
        {
          path: "/",
          element: <LayoutUserWithSideBar />,
          errorElement: <Error />,
          children: [
            {
              path: "document/:documentId",
              element: <PublicDocumentDetails />,
            },
            {
              path: "/s",
              element: <MainSearch />,
            },
            {
              path: "/course/:courseId",
              element: <CourseDetails />,
            },
            {
              path: "/university/:universityId",
              element: <UniversityDetails />,
            },
          ],
        },
        {
          path: "/admin",
          element: <ProtectedRoute allowRoles={[ADMIN]} />,
          children: [
            {
              element: <LayoutAdmin />,
              children: [
                {
                  index: true,
                  element: <Navigate to="/admin/document" replace />,
                },
                {
                  path: "document",
                  element: <AdminDocumentList />,
                },
                {
                  path: "document/:documentId",
                  element: <AdminDocumentDetails />,
                },
                {
                  path: "document/:documentId/report",
                  element: <AdminReportedDocumentDetails />,
                },
                {
                  path: "course",
                  element: <AdminCourseList />,
                },
                {
                  path: "course/:courseId",
                  element: <AdminCourseDetails />,
                },
                {
                  path: "university",
                  element: <AdminUniversityList />,
                },
                {
                  path: "university/:universityId",
                  element: <AdminUniversityDetails />,
                },
                {
                  path: "user",
                  element: <AdminUserList />,
                },
                {
                  path: "user/:userId",
                  element: <AdminUserDetails />,
                },
                {
                  path: "report",
                  element: <AdminReportList />,
                },
                {
                  path: "report/:reportId",
                  element: <AdminReportDetails />,
                },
                {
                  path: "subscription",
                  element: <AdminSubscriptionList />,
                },
                {
                  path: "subscription/:subscriptionId",
                  element: <AdminSubscriptionDetails />,
                },
              ],
            },
          ],
        },
        {
          path: "/personal",
          element: <ProtectedRoute allowRoles={[MEMBER]} />,
          children: [
            {
              element: <LayoutUserWithSideBar />,
              children: [
                // {
                //   index: true,
                //   element: <Navigate to="/personal/profile" replace />,
                // },
                {
                  path: "upload-document",
                  element: <UploadDocument />,
                },
                {
                  path: "home",
                  element: <div>Home </div>,
                },
                {
                  path: "my-documents",
                  element: <MyDocuments />,
                },
                {
                  path: "my-documents/:documentId",
                  element: <MyDocumentDetails />,
                },
                {
                  path: "favourite-documents",
                  element: <FavouriteDocuments />,
                },
                {
                  path: "favourite-courses",
                  element: <FavouriteCourses />,
                },
                {
                  path: "profile",
                  element: <Profile />,
                },
                {
                  path: "subscriptions",
                  element: <SubscriptionList />,
                },
                {
                  path: "subscriptions/:subscriptionId",
                  element: <SubscriptionDetails/>,
                },
                {
                  path: "change-password",
                  element: <ChangePassword />,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      path: "confirm-signup",
      element: <Confirm />,
      errorElement: <Error />,
    },
    {
      path: "resend-email",
      element: <ResendEmail />,
      errorElement: <Error />,
    },
    { path: "/unauthorized", element: <NotPermitted /> },
    { path: "*", element: <Navigate to="/error" replace /> },
  ],
  {
    basename: import.meta.env.VITE_BASE_URL,
  }
);

export default router;
