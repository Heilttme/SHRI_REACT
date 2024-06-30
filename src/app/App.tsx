import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./routers/app-router";
import { Provider, useDispatch } from "react-redux";
import Header from "@shared/ui/header/header.component";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { authorizeAction } from "entities/user/userSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const authToken = localStorage.getItem("token");
    if (authToken) dispatch(authorizeAction());
  }, []);

  return (
    <MantineProvider>
      <BrowserRouter>
        <Header />
        <AppRouter />
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;
