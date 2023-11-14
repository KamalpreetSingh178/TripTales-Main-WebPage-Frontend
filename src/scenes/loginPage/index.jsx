import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";//Form Component-Which will be used in Register Functionality

const LoginPage = () => {
  const theme = useTheme();//Grab our colours 
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  return (
    <Box>
      {/*Text Box*/}
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%"//Padding- 1rem Top and Bottom while 6% Left and Right
        textAlign="center"//Centering the text
      >
        <Typography fontWeight="bold" fontSize="32px" color="primary">
          TripTales
        </Typography>
      </Box>

      {/*Form Box*/}
      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        //If NonMobileScreen-Set width to 50% Otherwise set it to 93%
        p="2rem"//Padding
        m="2rem auto"//Margin
        //We are using Root em-So It is based on the Root size of the font
        //And by doing this it allows us consistency across different browsers and font sizes
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>{/*mb means Margin-Bottom*/}
          Welcome to TripTales,Come join us to listen to and share your amazing travel tales!
        </Typography>
        <Form />
      </Box>
    </Box>
  );
};

export default LoginPage;