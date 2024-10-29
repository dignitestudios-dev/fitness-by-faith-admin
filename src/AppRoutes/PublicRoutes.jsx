import Login from "../pages/Login";
import ResetPassword from "../pages/ResetPassword";
import VerifyEmail from "../pages/VerifyEmail";
import VerifyOtp from "../pages/VerifyOtp";

export const publicRoutes = [
    {
        title: "Dashboard Page",
        url: "/login",
        page: <Login />,
      },
      {
        title: "Verify Email Page",
        url: "/verify-email",
        page: <VerifyEmail />,
      },
      {
        title: "Verify OTP Page",
        url: "/verify-otp",
        page: <VerifyOtp />,
      },
      {
        title: "Reset Password Page",
        url: "/reset-password",
        page: <ResetPassword />,
      },
]