import React from "react";
import Navigation from "./AppNavigator";
import { AuthProvider } from "./context/authContext";
const MainContainer = () => {
  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  );
};

export default MainContainer;
