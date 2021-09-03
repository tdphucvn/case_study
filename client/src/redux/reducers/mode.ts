import { createSlice } from "@reduxjs/toolkit";

interface IMode {
    lightMode: boolean;
};

const initialState: IMode = {
    lightMode: true,
};

export const modeSlice = createSlice({
    name: 'mode',
    initialState,
    reducers: {
        changeMode: (state) => {
            const newMode = !state.lightMode;
            state.lightMode = newMode;
        }
    },
});

export const { changeMode } = modeSlice.actions;
export default modeSlice.reducer;