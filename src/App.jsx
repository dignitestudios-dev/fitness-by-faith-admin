import "./App.css";
import { routes } from "./AppRoutes/AppRoutes";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import { publicRoutes } from './AppRoutes/PublicRoutes';
import { useContext } from "react";

function App() {
  const { token } = useContext(AuthContext);
  
  return (
    <Routes>
      <Route element={token ? <Outlet /> : <Navigate to="/login" />}>
        {routes.map((route, index) => {
          return <Route path={route.url} element={route.page} key={index} />;
        })}
      </Route>
      <Route element={token ? <Navigate to="/" /> : <Outlet />}>
        {publicRoutes.map((route, index) => (
          <Route path={route.url} element={route.page} key={index} />
        ))}
      </Route>
    </Routes>
  );
}

export default App;
