import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
  } from "react-router-dom";
  import Register from "../auth/Register/";
  import Login from "../auth/Login/";
import HomePage from "../global/Home";
  
  export const routerauth = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" >
        <Route path="/" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route element={<HomePage />} path="/home" />

      </Route>
    )
  );
  