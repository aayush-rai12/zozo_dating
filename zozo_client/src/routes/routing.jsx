import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Home from "../pages/Home/home";
import Login from "../components/Auth/Login/login";
import Register from "../components/Auth/Register/registration";
import UserProfile from "../components/UserProfile/profileDetails";
import ForgotPass from "../components/Auth/ForgotPass/ForgotPass";
import EmotionTracker from "../components/EmotionTracker/EmotionTracker";
import Header from "../components/UI/Header/Header";
import Footer from "../components/UI/Footer/Footer";
import Dashboard from "../pages/Dashboard/dashboard"
import Explore from "../pages/Explore/Explore";
// import Chat from "../pages/chat/chat"
const Layout = () => {
  const location = useLocation();
  const hideHeaderFooter = ["/register", "/userProfile", "/dashboard", '/explore'].includes(location.pathname);

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
        <Route path="/explore" element={<Explore />} />
        {/* <Route path="/chat" element={Chat}></Route> */}
        {/* Add more routes as needed */}
        <Route path="*" element={<h1>404 Not Found</h1>} />

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
