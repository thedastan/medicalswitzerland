// External dependencies
import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import {} from "react-router";

// Local dependencies
import { theme } from "./Components/Layout/Theme";
import { setUpStore } from "./Redux/Store/Store";
import { BrowserRouter } from "react-router-dom";

/* Local dependencies */
import App from "./App";
import "./index.scss";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <Provider store={setUpStore()}>
          <App />
        </Provider>
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
);
