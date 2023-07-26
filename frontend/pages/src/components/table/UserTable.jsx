import React, { useState, useEffect } from "react";
import axios from "axios";

export default function UserTable() {
  const [userData, setUserData] = useState("");

  const getUserData = async (req, res) => {
    const { data } = await axios.get(
      "http://localhost:4000/api/v1/admin/users",
      {
        withCredentials: true,
      }
    );
    console.log(data);
    setUserData(data.users);
  };
  const deleteUser = async (userData) => {
    const { data } = await axios.delete(
      `http://localhost:4000/api/v1//admin/user/${userData._id}`,
      {
        withCredentials: true,
      }
    );
    console.log(data);
    getUserData();
  };
  useEffect(() => {
    getUserData();
  }, []);
  console.log(userData);
  return (
    <div class="overflow-x-auto relative shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="py-3 px-6">
              Email
            </th>
            <th scope="col" class="py-3 px-6">
              Name
            </th>
            <th scope="col" class="py-3 px-6">
              Country
            </th>
            <th scope="col" class="py-3 px-6">
              Contact
            </th>
            <th scope="col" class="py-3 px-6">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {userData.length > 0 &&
            userData.map((curElem, index) => {
              return (
                <tr
                  class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  key={index + 1}
                >
                  <th
                    scope="row"
                    class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {curElem.email}
                  </th>
                  <td class="py-4 px-6">{curElem.name}</td>
                  <td class="py-4 px-6">{curElem.country}</td>
                  <td class="py-4 px-6">{curElem.contact}</td>
                  <td class="py-4 px-6">
                    {" "}
                    <button
                      onClick={(e) => deleteUser(curElem)}
                      type="button"
                      class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
