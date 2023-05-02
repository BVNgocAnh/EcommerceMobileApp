import React, { createContext, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isLogined, setIsLogined] = useState(false);
  const register = (username, password, emailCus, phoneCus) => {
    setIsLoading(true);
    axios
      .post(
        `${BASE_URL}/auth/register`,
        {
          username,
          password,
          emailCus,
          phoneCus,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        let userInfo = res.data;
        setUserInfo(userInfo);
        AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
        setIsLoading(false);
        console.log("Registration successful:", JSON.stringify(userInfo));
      })
      .catch((error) => {
        console.log("Registration error:", JSON.stringify(error.response));
        setIsLoading(false);
      });
  };

  const login = (username, password) => {
    setIsLoading(true);
    setIsLogined(true);
    axios
      .post(
        `${BASE_URL}/auth/login`,
        {
          username,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        let userInfo = res.data;
        setUserInfo(userInfo);
        AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
        setIsLoading(false);
        setIsLogined(false);
        console.log("Logging successful:", JSON.stringify(userInfo));
      })
      .catch((error) => {
        console.log("Logging error:", JSON.stringify(error.response));
        setIsLoading(false);
        setIsLogined(false);
      });
  };

  const logout = () => {
    try {
      AsyncStorage.removeItem("userInfo");
      setUserInfo({});
    } catch (error) {
      console.log("Logout error:", JSON.stringify(error.response));
    }
  };

  return (
    <AuthContext.Provider value={{ register, login, userInfo, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
