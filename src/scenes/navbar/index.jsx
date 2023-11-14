import { useState } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
} from "@mui/material";//Importing Components from Material UI
import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
  Close,
} from "@mui/icons-material";//Importing Material UI Icons
//Reference link for Material UI Icons- mui.com/material-ui/material-icons/
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";

const Navbar = () => {
  //Value to determine if we want to open up Mobile Menu when it's Small Screen
  //And use setIsMobileMenuToggled to turn it on or off
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const dispatch = useDispatch();//To Dispatch actions from the reducer
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);//Grab the User Information
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");//Setting a variable called isNonMobileScreens
  /*useMediaQuery() is a built-in hook into Material UI-That allows if the current screen size of the user is 
  below this min-width or higher than min-width-Easy way to use Media Query in React*/

  const theme = useTheme();//Allows us to use any of the colours we have set in our theme.js
  //Like theme.palette.neutral.dark-Will give us colorTokens.grey[100]

  //Adding the colours to the variables for easier use
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  const fullName = `${user.firstName} ${user.lastName}`;//Convenience variable-For access to Full name of User

  return (
    <FlexBetween padding="1rem 6%" backgroundColor={alt}>{/*Using FlexBetween-Reusable Component*/}
    {/*/*Box Component in Material UI allows us to pass in any type of CSS properties and then use them as a 
    component property-So That's why we are able to pass padding="1rem 6%" But we can pass CSS properties only
    in case of Box Components of Material UI-In case of other components like Buttons,we can't do that
    We have to pass it in a property called SX and it has to be passed in as a property of an Object*/}
      <FlexBetween gap="1.75rem">
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)"/*Clamp is a function used in CSS to determine 
          a minimum value for the font,preferred value of the font and the maximum value of the font
          It will always try to be 2rem but if the screen size becomes too small,font will become
          1rem and if it gets too big,the font will become 2.25rem
          We can use it for width as well*/
          color="primary"/*Which is kind of light Blue color*/
          onClick={() => navigate("/home")}/*On CLicking the logo we want to move to Homepage using React router*/
          sx={{/*Setting an sx to set CSS properties */
            "&:hover": {
              color: primaryLight,
              cursor: "pointer",
            },
          }}
        >
          TripTales
        </Typography>
        {/*If it is a Mobile Screen we are not gonna show the Search Bar*/}
        {isNonMobileScreens && (
          <FlexBetween
            backgroundColor={neutralLight}
            borderRadius="9px"
            gap="3rem"//Gap of 3rem in between the values
            padding="0.1rem 1.5rem"//Padding of 0.1rem and 1.5rem-0.1rem Top and Bottom
            //1.5rem-Left and Right
          >
            <InputBase placeholder="Search..." />{/*Placeholder with text Search*/}
            <IconButton>
              <Search />{/*Giving Search value to IconButton which is basically the Icon*/}
            </IconButton>
          </FlexBetween>
        )}
      </FlexBetween>

      {/* Desktop Nav */}
      {/*Navigation bar dedicated to Non Mobile Screens*/}
      {isNonMobileScreens ? (
        <FlexBetween gap="2rem">
          <IconButton onClick={() => dispatch(setMode())}>{/*Creating Button for Dark and Light Mode
          dispatch(setMode())-Dispatches the action that will change the mode in our Redux*/}
            {theme.palette.mode === "dark" ? (
              <DarkMode sx={{ fontSize: "25px" }} />//Setting Icon to Dark Mode and fontsize=Icon Size
            ) : (
              <LightMode sx={{ color: dark, fontSize: "25px" }} />
            )}{/*Using Redux to flip the switch for the dark and light mode*/}
          </IconButton>
          <Message sx={{ fontSize: "25px" }} />{/*Message which is another Icon*/}
          <Notifications sx={{ fontSize: "25px" }} />{/*Notification Icon*/}
          <Help sx={{ fontSize: "25px" }} />
          <FormControl variant="standard" value={fullName}>{/*For the Drop down at the Top Right
          Where we see the user that is logged in and the logout button*/}
            <Select
              value={fullName}
              sx={{/*CSS Properties with sx*/
                backgroundColor: neutralLight,
                width: "150px",
                borderRadius: "0.25rem",
                p: "0.25rem 1rem",//padding with 0.25rem Top and Bottom while 1rem Left and Right
                "& .MuiSvgIcon-root": {//Select within the CSS Class-Targeting Specific Class Name in Material UI
                  pr: "0.25rem",
                  width: "3rem",
                },
                "& .MuiSelect-select:focus": {
                  backgroundColor: neutralLight,
                },
              }}
              input={<InputBase />}/*Pass in an input of an Input Component of Input Base*/
            >
              <MenuItem value={fullName}>{/*Button within the DropDown to Logout-Not like a Select Component
              where we are Selecting from a DropDown-We just have a single button as option in the DropDown*/}
                <Typography>{fullName}</Typography>
              </MenuItem>
              <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
              {/*So On Clicking this MenuItem of Logout,it will logout us from the page*/}
            </Select>
          </FormControl>
        </FlexBetween>
      ) : (
        <IconButton
          onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}//Just Flipping
          //It will pop up in the Icon of the Menu when we are on Small Screens
        >
          <Menu />
        </IconButton>
      )}

      {/* Mobile Nav */}
      {!isNonMobileScreens && isMobileMenuToggled && (/*If !isNonMobileScreens=It is a Mobile Screen
      And isMobileMenuToggled-When Menu item is Clicked-It opens a Box whose code is below*/
        <Box
          position="fixed"//Since it is in Mobile
          //To take up the entire page
          right="0"
          bottom="0"
          height="100%"
          zIndex="10"//Infront of everything
          maxWidth="500px"
          minWidth="300px"
          backgroundColor={background}//BackgroundColor= Background color we set at the top of the component
        >{/*Box will have Icons in it*/}
          {/* Close Icon */}
          <Box display="flex" justifyContent="flex-end" p="1rem">{/*Not using FlexBetween Component as we want 
          justifyContent to be flex-end ->It is specific*/}
            <IconButton
              onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
            >
              <Close />
            </IconButton>
          </Box>

          {/* Menu Items */}
          {/*We won't be making it reusable as there are some Minor Differences from the case above*/}
          <FlexBetween
            //Only change is in these CSS Properties-Rest all is same as above
            display="flex"
            flexDirection="column"//Have it flex up and down instead of left and right
            justifyContent="center"//Center it vertically
            alignItems="center"//Center it horizontally
            gap="3rem"
          >
            <IconButton
              onClick={() => dispatch(setMode())}
              sx={{ fontSize: "25px" }}
            >
              {theme.palette.mode === "dark" ? (
                <DarkMode sx={{ fontSize: "25px" }} />
              ) : (
                <LightMode sx={{ color: dark, fontSize: "25px" }} />
              )}
            </IconButton>
            <Message sx={{ fontSize: "25px" }} />
            <Notifications sx={{ fontSize: "25px" }} />
            <Help sx={{ fontSize: "25px" }} />
            <FormControl variant="standard" value={fullName}>
              <Select
                value={fullName}
                sx={{
                  backgroundColor: neutralLight,
                  width: "150px",
                  borderRadius: "0.25rem",
                  p: "0.25rem 1rem",
                  "& .MuiSvgIcon-root": {
                    pr: "0.25rem",
                    width: "3rem",
                  },
                  "& .MuiSelect-select:focus": {
                    backgroundColor: neutralLight,
                  },
                }}
                input={<InputBase />}
              >
                <MenuItem value={fullName}>
                  <Typography>{fullName}</Typography>
                </MenuItem>
                <MenuItem onClick={() => dispatch(setLogout())}>
                  Log Out
                </MenuItem>
              </Select>
            </FormControl>
          </FlexBetween>
        </Box>
      )}
    </FlexBetween>
  );
};

export default Navbar;