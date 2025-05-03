import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Home from "../pages/Home/home";
import Login from "../pages/Login/login";
import Register from "../pages/Register/Registration";
import UserProfile from "../components/UserProfile/profiledetails";
import ForgotPass from "../components/ForgotPass/ForgotPass";
import EmotionTracker from "../components/EmotionTracker/EmotionTracker";
import Header from "../components/UI/Header/Header";
import Footer from "../components/UI/Footer/Footer";
import Dashboard from "../pages/Dashboard/Dashboard"

const Layout = () => {
  const location = useLocation();
  const hideHeaderFooter = ["/register", "/userProfile", "/dashboard"].includes(location.pathname);

  return (
    <>
      {!hideHeaderFooter && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotPassword" element={<ForgotPass />} />
        <Route path="/userProfile" element={<UserProfile />} />
        <Route path="/emotionTracker" element={<EmotionTracker />} />
        <Route path="/dashboard" element={<Dashboard />} />

      </Routes>
      {!hideHeaderFooter && <Footer />}
    </>
  );
};

const Routing = () => {
  return (
    <Router>
      <Layout />
    </Router>
  );
};

export default Routing;
