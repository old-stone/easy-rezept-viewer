import "./index.css";

import * as serviceWorker from "./serviceWorker";

import App from "./components/App";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom";
import ReactGA from "react-ga";
import createFinalStore from "./store";
import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#5e7bff",
      main: "#0650cb",
      dark: "#002999",
      contrastText: "#fff"
    },
    secondary: {
      light: "#ff6659",
      main: "#d32f2f",
      dark: "#9a0007",
      contrastText: "#fff"
    }
  },
  typography: {
    useNextVariants: true
  }
});

const store = createFinalStore();

// 開発中の確認用コード
store.subscribe(
  () =>
    process.env.REACT_APP_IS_DEBUG === "true" && console.log(store.getState())
);

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
  </MuiThemeProvider>,
  document.getElementById("root")
);

// Google Analytics settings
ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTCIS_ID);
ReactGA.pageview(window.location.pathname + window.location.search);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
