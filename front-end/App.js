import * as React from "react";
import { Provider } from "react-redux";
import AppNavigator from "./src/AppNavigator";
import MainContainer from "./src/MainContaniner";
import store from "./src/redux/store/store";

const App = () => {
  return (
    <Provider store={store}>
      <MainContainer />
    </Provider>
  );
};

export default App;
