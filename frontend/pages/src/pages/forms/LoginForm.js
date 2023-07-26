import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SendProfileData from "../../components/table/SendProfileData";
import Profile from "../../components/table/Profile";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selected, setSelected] = useState("yes");

  const [userDetails, setUserDetails] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    getUser();
  }, []);
  const getUser = async () => {
    try {
      const { data } = await axios.get("http://localhost:4000/api/v1/user/me", {
        withCredentials: true,
      });
      console.log({ ...data });
      if (data.success == true) {
        if (data.user.role == "User") navigate("/userhome");
        else {
          navigate("/admin");
        }
      }
    } catch (error) {
      console.log(`error${error}`);
    }
  };
  const handleChange = (event) => {
    console.log(event.target.value);
    setSelected(event.target.value);
  };
  const userLoginHandler = async (event) => {
    event.preventDefault();
    console.log("abc");

    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/user/login",
        {
          email: `${email}`,
          password: `${password}`,
          // country: `${country}`,
          // contact: `${contact}`,
          // Image: res.data[0].id,
        },
        {
          withCredentials: true,
        }
      );

      console.log(data);
      if (data.success == false) {
        alert(data.error);
      } else {
        if (data.user.role == "User") {
          navigate("/userhome");
        } else {
          navigate("/admin");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <body class="bg-gray-10 ">
        <form
          class="flex justify-center h-screen w-screen items-center"
          onSubmit={userLoginHandler}
        >
          <div class="w-full md:w-1/2 flex flex-col items-center ">
            <h1 class="text-center text-2xl font-bold text-gray-600 mb-6">
              LOGIN
            </h1>
            <div class="w-3/4 mb-6">
              <input
                type="email"
                name="email"
                id="email"
                class="w-full py-4 px-8 bg-slate-200 placeholder:font-semibold rounded hover:ring-1 outline-blue-500"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>

            <div class="w-3/4 mb-6">
              <input
                type="password"
                name="password"
                id="password"
                class="w-full py-4 px-8 bg-slate-200 placeholder:font-semibold rounded hover:ring-1 outline-blue-500 "
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>

            <div class="w-3/4 mt-4">
              <button
                type="submit"
                class="py-4 bg-blue-400 w-full rounded text-blue-50 font-bold hover:bg-blue-700"
              >
                {" "}
                LOGIN
              </button>
            </div>
          </div>
        </form>
      </body>
    </div>
  );
};

export default LoginForm;
