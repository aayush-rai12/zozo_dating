import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Home from "../pages/Home/home";
import Login from "../components/Auth/Login/login";
import Register from "../components/Auth/Register/registration";
import UserProfile from "../components/UserProfileDetails/profileDetails";
import ForgotPass from "../components/Auth/ForgotPass/ForgotPass";
import EmotionTracker from "../components/EmotionTracker/EmotionTracker";
import Header from "../components/UI/Header/Header";
import Footer from "../components/UI/Footer/Footer";
import Dashboard from "../pages/Dashboard/Dashboard";
import Explore from "../pages/Explore/Explore";
import Chatpage from "../pages/ChatPage/ChatPage";
// import UserDetails from "../components/RegisteredUserProfile/registeredUserDetails"

const Layout = () => {
  const location = useLocation();
  const hideHeaderFooter = ["/register", "/userProfile", "/dashboard", "/explore"].includes(location.pathname);

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
        <Route path="/chatpage" element={<Chatpage />} />
        {/* <Route path="/userDetails" element={<UserDetails/>}></Route> */}
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
