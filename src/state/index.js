/*Setting our Redux toolkit state*/
import { createSlice } from "@reduxjs/toolkit";

const initialState = {/*State that will be stored in our Global State-Will be accessible throughout our entire application*/
  mode: "dark",//Represent Dark Mode and Light Mode
  user: null,//Authorization Information we will store
  token: null,//Authorization Information we will store
  posts: [],
};/*We can grab it anywhere so we don't need to pass this State and properties down to different components */

//Action and reducers all written in here along with state logic
export const authSlice = createSlice({
  name: "auth",//name of auth to represent auth workflow
  initialState,//Passing initialState into initial State
  reducers: {//Finally reducers which are our actions-Basically functions that modify global state
    setMode: (state) => {//Changing from Light Mode to dark Mode and vice versa
      state.mode = state.mode === "dark" ? "light" : "dark";
    },//Redux has this idea of we can't change state directly-We are always supposed to replace the Object as opposed to directly modifying the state
    //Even though it looks like we have modified the state directly but under the hood this is not happening-By Built In Library called Imer from Toolkit
    setLogin: (state, action) => {//action is basically the parameter/argument for the function
      state.user = action.payload.user;//Setting user parameter of state from user parameter of payload
      state.token = action.payload.token;//action includes all the arguments
    },
    setLogout: (state) => {
      state.user = null;/*Resetting Parameters to Null when User logs out */
      state.token = null;
    },
    setFriends: (state, action) => {/*Setting Friends in our Local State-As we need to keep this Information */
      if (state.user) {//If User already exists
        state.user.friends = action.payload.friends;
      } else {
        console.error("User friends non-existent");
      }
    },
    setPosts: (state, action) => {//Simple functions to modify our states as we need
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {//Grab the list of post and map through each one 
        if (post._id === action.payload.post._id) return action.payload.post;//If Post ID=Current Post ID we are sending into this function then return the post that we want
        return post;
      });
      state.posts = updatedPosts;
    },
  },
});

//Part of Redux Toolkit
export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost }=authSlice.actions;
export default authSlice.reducer;