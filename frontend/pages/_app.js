import { useEffect, useState } from "react";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import "../styles/globals.scss";
import "./src/components/chart/chart.scss";
import DisplayProfile from "./src/components/table/DisplayProfile";
import DisplayUsers from "./src/components/table/DisplayUsers";
import AddCoinForm from "./src/pages/forms/AddCoinForm";
import AdsForm from "./src/pages/forms/AdsForm";
import EditProfileForm from "./src/pages/forms/EditProfileForm";
import LoginForm from "./src/pages/forms/LoginForm";
import SignUpForm from "./src/pages/forms/SignUpForm";
import Home from "./src/pages/home/Home";
import UserHome from "./src/pages/home/UserHome";
import List from "./src/pages/list/List";
import UserAdList from "./src/pages/list/UserAdList";
import UserList from "./src/pages/list/UserList";
import DisplayUserProfile from "./src/components/table/DisplayUserProfile";
import Reminders from "./components/Reminders";
import ReminderPage from "./components/ReminderPage";
import PredictionPage from "./components/PredictionPage";

function MyApp({ Component, pageProps }) {
  const [isBrowser, setIsBrowser] = useState(null);
  useEffect(() => {
    setIsBrowser(true);
  }, []);

  return (
    <>
      {isBrowser && (
        <BrowserRouter>
          <Routes>
            <Route path="/" index element={<Component {...pageProps} />} />
            <Route path="/admin" element={<Home />}></Route>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignUpForm />} />
            <Route path="/userhome" element={<UserHome />} />

            <Route path="/coins" element={<List />} />
            <Route path="/usercoins" element={<UserList />} />
            <Route path="/ads" element={<UserAdList />} />
            <Route path="/users" element={<DisplayUsers />} />
            <Route path="/addcoin" element={<AddCoinForm />} />
            <Route path="/addadvertisment" element={<AdsForm />} />
            <Route path="/profile" element={<DisplayProfile />} />
            <Route path="/userprofile" element={<DisplayUserProfile />} />
            <Route path="/editprofile" element={<EditProfileForm />} />
            <Route path="/reminders" element={<ReminderPage />} />
            <Route path="/predictions" element={<PredictionPage />} />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
}

export default MyApp;
