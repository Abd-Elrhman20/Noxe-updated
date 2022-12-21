import { createSlice } from "@reduxjs/toolkit";

const firstSlice = createSlice({
    name: "first",
    initialState: 0,
});

export default firstSlice.reducer;