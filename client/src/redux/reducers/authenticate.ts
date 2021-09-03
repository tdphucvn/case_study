import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import * as authenticateAPI from '../../api/authenticateApi';

interface IUser {
    _id: string;
    username: string;
    email: string;
    password: string;
};
interface IAuthenticate {
    loading: boolean;
    authenticated: boolean;
    accessToken: string;
    user: Array<IUser>;
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

const initialState: IAuthenticate = {
    loading: false,
    authenticated: false,
    accessToken: '',
    user: []
};

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

export const registerRequest = createAsyncThunk(
    'user/registerRequestStatus',
    async (credentials: IRegisterCredentials, { rejectWithValue }) => {
        try {
            const {username, password, email, firstName, lastName} = credentials;
            const response = await authenticateAPI.registerRequest(username, password, email, firstName, lastName);
            if(response.status === 401) return rejectWithValue({message: response.data.message, status: response.status});
            return response;
        } catch (error) {
            return error;
        };
    },
);

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
        updateAccessToken: (state, action) => {
            state.accessToken = action.payload;
        },
        unauthorized: (state) => {
            state.authenticated = false;
            state.accessToken = '';
            state.user = [];
        }, 
    },
    extraReducers: (builder) => {
        builder.addCase(loginRequest.fulfilled, (state, action) => {
            state.loading = false;
            state.authenticated = true;
            state.user = action.payload.data.user;
            state.accessToken = action.payload.data.accessToken;
        });
        builder.addCase(loginRequest.rejected, (state, action) => {
            state.loading = false;
            state.authenticated = false;
        });
        builder.addCase(registerRequest.fulfilled, (state, action) => {
            state.loading = false;
            state.authenticated = true;
            state.user = action.payload.data.user;
            state.accessToken = action.payload.data.accessToken;
        });
        builder.addCase(registerRequest.rejected, (state, action) => {
            state.loading = false;
            state.authenticated = false;
        });
        builder.addCase(logoutRequest.fulfilled, (state, action) => {
            state.authenticated = false;
            state.user = [];
            state.accessToken = '';
        });
    },
});

export const { unauthorized, updateAccessToken } = authenticateSlice.actions;
export default authenticateSlice.reducer;
