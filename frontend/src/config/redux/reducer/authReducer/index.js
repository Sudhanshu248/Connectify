const {createSlice} = require("@reduxjs/toolkit");
const {loginUser, registerUser, getAboutUser, getAllUsers, getConnectionsRequest, getMyConnectionRequests} = require("../../action/authAction");
 
const initialState = {
    user: undefined,  
    isError: false,
    isSuccess: false,
    isLoading: false,
    loggedIn: false,
    message: "",
    isTokenThere: false,
    profileFetched: false,
    connections: [],
    connectionRequest: [],
    all_users: [],
    all_profiles_fetched: false,
}
 
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: () => initialState,
        handleLoginUser: (state) => {
            state.message = "hello"
        },
        emptyMessage: (state) => {
            state.message = ""
        },
        setTokenIsThere: (state) => { 
            state.isTokenThere = true;
        },
        setTokenIsNotThere: (state) => {
            state.isTokenThere = false;
        },        
    },
 
    extraReducers: (builder) => {
        builder
        .addCase(loginUser.pending, (state) => {
            state.isLoading = true;
            state.message = "Knocking the door...";
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.loggedIn = true;
            state.message = "Login is Successful";
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.loggedIn = false;
            if (action.payload && typeof action.payload === 'object' && 'message' in action.payload) {
                state.message = action.payload.message;
            } else {
                state.message = String(action.payload);
            }
        })

        .addCase(registerUser.pending, (state) => {
            state.isLoading = true;
            state.message = "Processing your registration...";
        }) 
        .addCase(registerUser.fulfilled, (state) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            // state.loggedIn = true;
            state.message = "Registration is Successful, Please login in";           
        })
        .addCase(registerUser.rejected, (state, action) => {    
            state.isLoading = false;
            state.isError = true;
            if (action.payload && typeof action.payload === 'object' && 'message' in action.payload) {
                state.message = action.payload.message;
            } else {
                state.message = String(action.payload);
            }
        })

        .addCase(getAboutUser.pending, (state) => {
            state.isLoading = true;
            state.profileFetched = false;
        })
        .addCase(getAboutUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.profileFetched = true;
            state.user = action.payload; 
            state.loggedIn = true;
        })
        .addCase(getAboutUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.profileFetched = false;
            if (action.payload && typeof action.payload === 'object' && 'message' in action.payload) {
                state.message = action.payload.message;
            } else {
                state.message = String(action.payload);
            }
        })
        
        .addCase(getAllUsers.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.all_profiles_fetched = true; 
            state.all_users = action.payload.profiles;
        })

        .addCase(getConnectionsRequest.fulfilled, (state, action) => {
            state.connections = action.payload
        })
        .addCase(getConnectionsRequest.rejected, (state, action) => {
            state.message = action.payload
        })

        .addCase(getMyConnectionRequests.fulfilled, (state, action) => {
            state.connectionRequest = action.payload
        })
        .addCase(getMyConnectionRequests.rejected, (state, action) => {
            state.message = action.payload
        })
    }
});

export const {reset, emptyMessage, setTokenIsThere, setTokenIsNotThere} = authSlice.actions;
export default authSlice.reducer;