import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import * as authenticateAPI from '../../api/authenticateApi';


interface IAuthenticate {
    authenticated: boolean;
    accessToken: string;
    id: string;
};

interface ILoginCredentials {
    username: string;
    password: string;
};

interface IRegisterCredentials{
    username: string;
    password: string;
    email: string
    firstName: string;
    lastName: string;
};

interface ILogoutData {
    message: string;
};

// default state of the store
const initialState: IAuthenticate = {
    authenticated: false,
    accessToken: '',
    id: ''
};

// calling API request to login
export const loginRequest = createAsyncThunk(
    'user/loginRequestStatus', 
    async (credentials: ILoginCredentials, { rejectWithValue }) => {
        try {
            const {username, password} = credentials;
            const response = await authenticateAPI.loginRequest(username, password);
            if(response.status === 401) return rejectWithValue({message: response.data.message, status: response.status});
            console.log(response);
            return response;
        } catch (error) {
            return error;
        };
    },
);

// calling API request to register
export const registerRequest = createAsyncThunk(
    'user/registerRequestStatus',
    async (credentials: IRegisterCredentials, { rejectWithValue }) => {
        try {
            const {username, password, email, firstName, lastName} = credentials;
            const response = await authenticateAPI.registerRequest(username, password, email, firstName, lastName);
            if(response.status === 400) return rejectWithValue({message: response.data.message, status: response.status});
            return response;
        } catch (error) {
            return error;
        };
    },
);

// calling API request to logout
export const logoutRequest = createAsyncThunk(
    'user/logoutRequestStatus',
    async ( data: ILogoutData, {rejectWithValue}) => {
        try {
            const { message } = data;
            const response = await authenticateAPI.logoutRequest();
            console.log(message);
            return response;
        } catch (error) {
            return rejectWithValue(error);
        };
    },
);

export const authenticateSlice = createSlice({
    name: 'authenticate',
    initialState,
    reducers: {
        // update accessToken if provided (after accessToken being expired)
        updateAccessToken: (state, action) => {
            state.accessToken = action.payload;
        },
        unauthorized: (state) => {
            state.authenticated = false;
            state.accessToken = '';
            state.id = '';
        }, 
    },
    extraReducers: (builder) => {
        builder.addCase(loginRequest.fulfilled, (state, action) => {
            state.authenticated = true;
            state.id = action.payload.data.id;
            state.accessToken = action.payload.data.accessToken;
        });
        builder.addCase(loginRequest.rejected, (state, action) => {
            state.authenticated = false;
        });
        builder.addCase(registerRequest.fulfilled, (state, action) => {
            state.authenticated = true;
            state.id = action.payload.data.id;
            state.accessToken = action.payload.data.accessToken;
        });
        builder.addCase(registerRequest.rejected, (state, action) => {
            state.authenticated = false;
        });
        builder.addCase(logoutRequest.fulfilled, (state, action) => {
            state.authenticated = false;
            state.id = '';
            state.accessToken = '';
        });
    },
});

export const { unauthorized, updateAccessToken } = authenticateSlice.actions;
export default authenticateSlice.reducer;
