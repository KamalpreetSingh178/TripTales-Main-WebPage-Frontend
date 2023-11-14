//Register and Login Functionality
import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";//Just for that Particular Icon
import { Formik } from "formik";//Will be used which is our Form Library
import * as yup from "yup";//Importing everything from yup which is our Validation Library
import { useNavigate } from "react-router-dom";//Be able to Navigate when registered to Login Page
import { useDispatch } from "react-redux";//Store User Information
import { setLogin } from "state";//Once the User sets the login Page
import Dropzone from "react-dropzone";//To Let user drop a file/image for their Profile Photo
import FlexBetween from "components/FlexBetween";//Will be using a lot

//Yup Validation Schema-Determines the Shape of how the Form Library is going to save the Information
const registerSchema = yup.object().shape({//Passing all the values of our Schema
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  location: yup.string().required("required"),
  occupation: yup.string().required("required"),
  picture: yup.string().required("required"),
  //Validating the credentials values used while Registering
});

const loginSchema = yup.object().shape({//Login Schema-Will be a Strip Down version of Register Schema
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

//Initial Value Setup (As Schema for Values has been defined)
const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
  picture: "",
};

const initialValuesLogin = {
  email: "",
  password: "",
};

//Creating our Form Component
const Form = () => {
  //Creating Number of States
  const [pageType, setPageType] = useState("login");//Display form depending on PageType-Initial value set to login
  const { palette } = useTheme();//Grabbing Palette from UseTheme
  const dispatch = useDispatch();//Setting up Dispatch
  const navigate = useNavigate();//useNavigate so that we can Navigate to different Pages
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const isLogin = pageType === "login";//Variables just for our Convenience
  const isRegister = pageType === "register";//Variables just for our Convenience
  //As they are booleans-So they are starting with prefix 'is'

  const register = async (values, onSubmitProps) => {
    // this allows us to send form info with image
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    formData.append("picturePath", values.picture.name);

    const savedUserResponse = await fetch(
      "http://localhost:3001/auth/register",
      {
        method: "POST",
        body: formData,
      }
    );
    const savedUser = await savedUserResponse.json();
    onSubmitProps.resetForm();

    if (savedUser) {
      setPageType("login");
    }
  };

  const login = async (values, onSubmitProps) => {
    const loggedInResponse = await fetch("http://localhost:3001/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const loggedIn = await loggedInResponse.json();
    onSubmitProps.resetForm();
    if (loggedIn) {
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      );
      navigate("/home");
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {//Asynchronous Function to Handle Form Submission
    //The arguments-values and onSubmitProps is coming from Formic
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  };

  return (
    /*Returning the Formik Component*/
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      /*So When we are on LoginPage-We will initialize the values with our Login Component
      Otherwise we use our Register Object */
      validationSchema={isLogin ? loginSchema : registerSchema}//Doing Same thing for Validation Schema
    >
      {/*Having values to use in our Components and Form*/}
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>{/*Formik is grabbing the HandleFormSubmit and passing it into
        our Formik values and then to onSubmit function*/}
          <Box
            display="grid"//Using Grid for this Section
            gap="30px"//Gap of 30pixels between items
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"//fr-Fractional Unit And we are creating our Grid Template Columns
            //So We are splitting our grid into 4 sections-And it's going to be a minimum of 0 if it's too small it will shrink all the way to 0
            //Otherwise We are gonna split it in equal fractions of Four
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },//Targeting any Div's of our Box as a Child Component/Child Class
            }}//If NonMobile-grid Columns of Text will be what we have defined earlier
            //But If It is a Mobile-gridColumns span will be 4-That is each Text field will have it's own entire Width
          >
            {isRegister && (//If On Register Page
              <>
                <TextField 
                  /*Textfield is an Input Component from Material UI*/
                  label="First Name"
                  onBlur={handleBlur}//handleBlur-Will handle the situation when we click out of a Input
                  onChange={handleChange}//Handle the situation when we are typing
                  value={values.firstName}
                  name="firstName"//Syncing it to the correct value in initialValuesRegister
                  //name has to align with the value we are setting in initialValuesRegister
                  error={
                    Boolean(touched.firstName) && Boolean(errors.firstName)
                  }//If First Name has been touched or There is an error=Will show Error in the Textfield
                  helperText={touched.firstName && errors.firstName}
                  sx={{ gridColumn: "span 2" }}//In Larger Screens we will have span of 2
                  //But In Smaller Screen-span 4 will overwrite span 2
                />
                <TextField
                  //Rest all field are same-Just change the variables
                  label="Last Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name="lastName"
                  error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  //Everything Same-Just make them Span of 4
                  label="Location"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.location}
                  name="location"
                  error={Boolean(touched.location) && Boolean(errors.location)}
                  helperText={touched.location && errors.location}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  label="Occupation"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.occupation}
                  name="occupation"
                  error={
                    Boolean(touched.occupation) && Boolean(errors.occupation)
                  }
                  helperText={touched.occupation && errors.occupation}
                  sx={{ gridColumn: "span 4" }}
                />
                <Box
                  gridColumn="span 4"
                  border={`1px solid ${palette.neutral.medium}`}
                  borderRadius="5px"
                  p="1rem"
                >
                  <Dropzone
                    acceptedFiles=".jpg,.jpeg,.png"
                    multiple={false}
                    onDrop={(acceptedFiles) =>
                      setFieldValue("picture", acceptedFiles[0])
                    }
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        border={`2px dashed ${palette.primary.main}`}
                        p="1rem"
                        sx={{ "&:hover": { cursor: "pointer" } }}
                      >
                        <input {...getInputProps()} />
                        {!values.picture ? (
                          <p>Add Picture Here</p>
                        ) : (
                          <FlexBetween>
                            <Typography>{values.picture.name}</Typography>
                            <EditOutlinedIcon />
                          </FlexBetween>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                </Box>
              </>
            )}

            <TextField
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              label="Password"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{ gridColumn: "span 4" }}
            />
          </Box>

          {/* BUTTONS */}
          <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover": { color: palette.primary.main },
              }}
            >
              {isLogin ? "LOGIN" : "REGISTER"}
            </Button>
            <Typography
              onClick={() => {
                setPageType(isLogin ? "register" : "login");
                resetForm();
              }}
              sx={{
                textDecoration: "underline",
                color: palette.primary.main,
                "&:hover": {
                  cursor: "pointer",
                  color: palette.primary.light,
                },
              }}
            >
              {isLogin
                ? "Don't have an account? Sign Up here."
                : "Already have an account? Login here."}
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Form;