import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "scenes/homePage";//Importing HomePage from scenes Folder we have created
//Whole Purpose of jsconfig.json-Allows us to import scenes instead of having to do a lot of relative imports
import LoginPage from "scenes/loginPage";
import ProfilePage from "scenes/profilePage";

//To Place Theme settings in our Components from theme.js
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";//Theme settings from our theme.js

function App() {
  const mode = useSelector((state) => state.mode);//Grabbing the current mode(Light/Dark) from our State
  /*So To grab Information from the store,we just need to use UseSelector from import { useSelector } from "react-redux";
  and grab the state from the correct reducer*/
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);//To be done once for each App
  //useMemo() to set up our theme
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <div className="app">
      <BrowserRouter>{/*So That we can use and Setup our Routes*/}
        <ThemeProvider theme={theme}>{/*Passing our Theme Property to configure it for Material UI*/}
          <CssBaseline />{/*CSS Baseline to reset our CSS to Basic CSS- CSS Reset for Material UI*/}
          <Routes>
            <Route path="/" element={<LoginPage />} />{/*Route for our Login Page */}
            <Route
              path="/home"
              element={isAuth ? <HomePage /> : <Navigate to="/" />}
            />{/*Route for HomePage*/}
            <Route
              path="/profile/:userId"
              element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
            />{/*Route for each User Profile-By /profile/:userID */}
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
/*To confirm everything is working- Do 'npm run start' for this File on the terminal
Ctrl+Alt+I-To open the Console */