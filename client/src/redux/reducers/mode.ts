import { createSlice } from "@reduxjs/toolkit";

interface IMode {
    lightMode: boolean;
};

// default state of the store
const initialState: IMode = {
    lightMode: true,
};

export const modeSlice = createSlice({
    name: 'mode',
    initialState,
    reducers: {
        // change the mode state
        changeMode: (state) => {
            const newMode = !state.lightMode;
            state.lightMode = newMode;
        }
    },
});

export const { changeMode } = modeSlice.actions;
export default modeSlice.reducer;