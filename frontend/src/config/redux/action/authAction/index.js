import clientServer from "../../../axiosConfig";
import { createAsyncThunk } from "@reduxjs/toolkit";
   
export const loginUser = createAsyncThunk(
    "user/login",
    async (user, thunkAPI) => {
        console.log("Login action dispatched with:", user);
        try {
            const response = await clientServer.post(`/login`, {
                email: user.email,
                password: user.password,
            });
            if (response.data.token) {
                localStorage.setItem("token", response.data.token);
                return thunkAPI.fulfillWithValue(response.data);
            } else {
                return thunkAPI.rejectWithValue({
                    message: "Token not provided by server",
                });
            }
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data || { message: "Login failed" }
            );
        }
    }
);

export const registerUser = createAsyncThunk(
    "user/register",
    async(user, thunkAPI) => {
        try{
            const response = await clientServer.post("/user/register", {
                username: user.username,
                password: user.password,
                email: user.email,
                name: user.name,
            });
            return response.data;
        }catch(err){
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
);

export const getAboutUser = createAsyncThunk(
    "user/getAboutUser",
    async (user, thunkAPI) => {
        try{
            const token = localStorage.getItem('token');
            // if (!token) {
            //     return thunkAPI.rejectWithValue({ message: "No token found" });
            // }

            const response = await clientServer.get("/get_user_and_profile", {
                params: {
                    token: user.token,
                },
            })

            return thunkAPI.fulfillWithValue(response.data);
            console.log( "Name = " + response.data);

        }catch(err){
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
);

export const getAllUsers = createAsyncThunk(
    "/user/getAllUsers",
    async (_, thunkAPI) => {
        try{

            const response = await clientServer.get("/user/get_all_users");

            return thunkAPI.fulfillWithValue(response.data);

        }catch(err){
            
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
);

export const getUserProfileByUsername = createAsyncThunk(
    "user/getUserProfileByUsername",
    async (username, thunkAPI) => {
        try {
            const response = await clientServer.get("/user/get_profile_based_on_username", {
                params: { username }
            });
            return thunkAPI.fulfillWithValue(response.data.profile);
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data || { message: "Failed to fetch user profile" });
        }
    }
);

export const sendConnectionRequest = createAsyncThunk(
    "user/sendConnectionRequest",
    async(user, thunkAPI) => {
        try{

            const response = await clientServer.post("/user/send_connection_request", {
                token: user.token,
                connectionId: user.user_id
            })

            thunkAPI.dispatch(getConnectionsRequest({token: user.token}));

            return thunkAPI.fulfillWithValue(response.data);

        }catch(err){
            return thunkAPI.rejectWithValue(err.response.data.message);
        }
    }
)

export const getConnectionsRequest = createAsyncThunk(
    "user/getConnectionRequests",
    async(user, thunkAPI) => {
        try{

            const response = await clientServer.get("/user/getConnectionRequests", {
                params: {
                    token: user.token,
                }
            })
            return thunkAPI.fulfillWithValue(response.data.connections);

        }catch(error){  
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    }
)

export const getMyConnectionRequests = createAsyncThunk(
    "user/getMyConnectionRequests",
    async(user, thunkAPI) => {
        try{

            const response = await clientServer.get("/user/user_connection_request", {
                params: {
                    token: user.token,
                }
            })
            console.log("My Connections: ", response);
            return thunkAPI.fulfillWithValue(response.data);

        }catch(error){
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    }
)

export const AcceptConnection = createAsyncThunk(
    "user/acceptConnection",
    async(user, thunkAPI) => {
        try{

            const response = await clientServer.post("/user/accept_connection_request", {
                token: user.token,
                requestId: user.connectionId,
                action_type: user.action
            })
            thunkAPI.dispatch(getConnectionsRequest({token: user.token}));
            thunkAPI.dispatch(getMyConnectionRequests({token: user.token}));
            return thunkAPI.fulfillWithValue(response.data);

        }catch(error){
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    }
)
