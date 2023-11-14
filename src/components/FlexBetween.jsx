import { Box } from "@mui/material";//Import Component from Material UI
import { styled } from "@mui/system";//Import styled from MUI System

//Reusing CSS as a component
const FlexBetween = styled(Box)({//Creating Component called FlexBetween which is a styled Box
  //Passing in CSS Properties
  /*Box Component in Material UI allows us to pass in any type of CSS properties and then use them as a 
  component property*/
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export default FlexBetween;
//Reusing Set of CSS Properties through different areas