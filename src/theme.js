//Color Design Tokens Export
export const colorTokens = {
    grey: {
      0: "#FFFFFF",
      10: "#F6F6F6",
      50: "#F0F0F0",
      100: "#E0E0E0",
      200: "#C2C2C2",
      300: "#A3A3A3",
      400: "#858585",
      500: "#666666",
      600: "#4D4D4D",
      700: "#333333",
      800: "#1A1A1A",
      900: "#0A0A0A",
      1000: "#000000",
    },
    primary: {
      50: "#E6FBFF",
      100: "#CCF7FE",
      200: "#99EEFD",
      300: "#66E6FC",
      400: "#33DDFB",
      500: "#00D5FA",
      600: "#00A0BC",
      700: "#006B7D",
      800: "#00353F",
      900: "#001519",
    },
  };
  
  //MUI Theme Settings-Setting up Material UI Theme-To Set the default colors for material UI Themes
  //This makes it easier for us to configure what we need
  export const themeSettings = (mode) => {//mode being a parameter
    return {
      palette: {
        mode: mode,
        ...(mode === "dark"//If mode is dark
          ? {
              //Palette values for dark mode
              primary: {
                dark: colorTokens.primary[200],
                main: colorTokens.primary[500],
                light: colorTokens.primary[800],
              },
              neutral: {//Using Shades of grey
                dark: colorTokens.grey[100],
                main: colorTokens.grey[200],
                mediumMain: colorTokens.grey[300],
                medium: colorTokens.grey[400],
                light: colorTokens.grey[700],
              },
              background: {
                default: colorTokens.grey[900],//Default Background Color
                alt: colorTokens.grey[800],//Alternative Background Color
              },
            }
          : {
              //Palette values for light mode
              primary: {
                dark: colorTokens.primary[700],
                main: colorTokens.primary[500],
                light: colorTokens.primary[50],
              },
              neutral: {
                dark: colorTokens.grey[700],
                main: colorTokens.grey[500],
                mediumMain: colorTokens.grey[400],
                medium: colorTokens.grey[300],
                light: colorTokens.grey[50],
              },
              background: {
                default: colorTokens.grey[10],
                alt: colorTokens.grey[0],
              },
            }),
      },
      typography: {//Typography Settings
        fontFamily: ["Rubik", "sans-serif"].join(","),//Joining Rubik and Sans-serif by Comma
        fontSize: 12,
        h1: {//h1 settings
          fontFamily: ["Rubik", "sans-serif"].join(","),
          fontSize: 40,
        },
        h2: {//h2 settings
          fontFamily: ["Rubik", "sans-serif"].join(","),
          fontSize: 32,
        },
        h3: {//h3 settings
          fontFamily: ["Rubik", "sans-serif"].join(","),
          fontSize: 24,
        },
        h4: {//h4 settings
          fontFamily: ["Rubik", "sans-serif"].join(","),
          fontSize: 20,
        },
        h5: {//h5 settings
          fontFamily: ["Rubik", "sans-serif"].join(","),
          fontSize: 16,
        },
        h6: {//h6 settings
          fontFamily: ["Rubik", "sans-serif"].join(","),
          fontSize: 14,
        },
      },
    };
  };//These are our Material UI Theme Settings