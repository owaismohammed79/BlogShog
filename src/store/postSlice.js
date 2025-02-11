import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    posts: [],
    status: "idle",
    error: null
}

const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        fetchPostsStart: (state) => {
            state.status = "loading";
        },
        fetchPostsSuccess: (state, action) => {
            state.status = "success";
            state.posts = action.payload;
        },
        fetchPostsFailure: (state, action) => {
            state.status = "failure";
            state.error = action.payload;
        }
    }
})

export const {fetchPostsStart, fetchPostsSuccess, fetchPostsFailure} = postSlice.actions;

export default postSlice.reducer