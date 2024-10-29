import { Navigate } from "react-router-dom";
import Layout from "../components/Global/Layout";
import ChangePassword from "../pages/ChangePassword";
import Chat from "../pages/Chat";
import CreateMealPlan from "../pages/CreateMealPlan";
import CreateVideoWorkout from "../pages/CreateVideoWorkout";
import CreateWorkout from "../pages/CreateWorkout";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import MealDetails from "../pages/MealDetails";
import MealDetailsPage from "../pages/MealDetailsPage";
import MealPlans from "../pages/MealPlans";
import Notifications from "../pages/Notifications";
import ResetPassword from "../pages/ResetPassword";
import Revenue from "../pages/Revenue";
import TicketDescription from "../pages/TicketDescription";
import Tickets from "../pages/Tickets";
import UserDetails from "../pages/UserDetails";
import Users from "../pages/Users";
import VerifyEmail from "../pages/VerifyEmail";
import VerifyOtp from "../pages/VerifyOtp";
import VideoDetailsPage from "../pages/VideoDetailsPage";
import Videos from "../pages/Videos";
import WorkoutDetails from "../pages/WorkoutDetails";
import WorkoutPlans from "../pages/WorkoutPlans";
import Auth from "./Auth";
import PageNotFound from "../pages/PageNotFound";

export const routes = [
  {
    title: "Initial Page",
    url: "/",
    page: <Auth />,
  },
  {
    title: "Dashboard Page",
    url: "/dashboard",
    page: <Layout pages={<Dashboard />} />,
  },
  {
    title: "Dashboard Page",
    url: "/workout-plans",
    page: <Layout pages={<WorkoutPlans />} />,
  },
  {
    title: "Create Workout Page",
    url: "/create-workout",
    page: <Layout pages={<CreateWorkout />} />,
  },
  {
    title: "Create Workout Page",
    url: "/workout/:id",
    page: <Layout pages={<WorkoutDetails />} />,
  },
  {
    title:"Workout Videos Page",
    url:"/videos",
    page: <Layout pages={<Videos/>}/>
  },
  {
    title:"Workout Videos Edit and update Page",
    url:"/video/:id",
    page: <Layout pages={<VideoDetailsPage/>}/>
  },
  {
    title:"Upoad Videos Page",
    url:"/videos/create-workout",
    page: <Layout pages={<CreateVideoWorkout/>}/>
  },
  {
    title: "Dashboard Page",
    url: "/meal-plans",
    page: <Layout pages={<MealPlans />} />,
  },
  {
    title: "Create Meal Plan Page",
    url: "/create-meal-plan",
    page: <Layout pages={<CreateMealPlan />} />,
  },
  {
    title: "Meal Plan Details Page",
    url: "/meal/:id",
    page: <Layout pages={<MealDetailsPage />} />,
  },
  {
    title: "Dashboard Page",
    url: "/users",
    page: <Layout pages={<Users />} />,
  },
  {
    title: "Dashboard Page",
    url: "/user/:id",
    page: <Layout pages={<UserDetails />} />,
  },
  {
    title: "Dashboard Page",
    url: "/revenue",
    page: <Layout pages={<Revenue />} />,
  },
  {
    title: "Dashboard Page",
    url: "/push-notifications",
    page: <Layout pages={<Notifications />} />,
  },
  {
    title: "Update Password Page",
    url: "/update-password",
    page: <Layout pages={<ChangePassword />} />,
  },
  {
    title: "Tickets Page",
    url: "/support-requests",
    page: <Layout pages={<Tickets />} />,
  },
  {
    title: "Ticket description Page",
    url: "/support-requests/12345",
    page: <Layout pages={<TicketDescription />} />,
  },
  {
    title: "Help & Support Page",
    url: "/help-and-support",
    page: <Layout pages={<Chat />} />,
  },
  {
    title: "Not found",
    url: "*",
    page: <Navigate to="/404" />
  },
  {
    title: "Not found",
    url: "/404",
    page: <PageNotFound />,
  },
];
