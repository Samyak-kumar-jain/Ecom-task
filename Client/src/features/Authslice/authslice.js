import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated: false,
    isLoading: true,
    user: null,
    error: null,
};

export const registerUser = createAsyncThunk(
    'auth/register',
    async (userData) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                throw new Error('Failed to register user');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            throw error;
        }
    }
);

export const loginUser = createAsyncThunk(
    "/auth/login",
    async (formData, { rejectWithValue }) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                return rejectWithValue(data.message || "Failed to login");
            }

            return data;
        } catch (error) {
            return rejectWithValue(error.message || "An unexpected error occurred");
        }
    }
);

export const checkAuth = createAsyncThunk(
    "/auth/checkauth",
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/check-auth`, {
                method: "GET",
                credentials: "include",
                headers: {
                    "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                return rejectWithValue(errorData);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue({ message: error.message });
        }
    }
);

export const logoutnUser = createAsyncThunk(
    "/auth/logout",
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/logout`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({}), 
            });


            if (!response.ok) {
                const data = await response.json();
                return rejectWithValue(data.message || "Failed to logout");
            }

            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message || "An unexpected error occurred");
        }
    }
);

export const authSlice = createSlice({
    name: 'authen',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        logoutUser: (state) => {
            state.user = null;
            state.isAuthenticated = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isAuthenticated = true;
                state.user = action.payload;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isAuthenticated = action.payload.success ? true : false;
                state.user = action.payload.success ? action.payload.user : null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(checkAuth.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.success ? action.payload.user : null;
                state.isAuthenticated = action.payload.success;
            })
            .addCase(checkAuth.rejected, (state, action) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
            })
            .addCase(logoutnUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(logoutnUser.fulfilled, (state) => {
                state.isLoading = false;
                state.isAuthenticated = false;
                state.user = null;
            })
            .addCase(logoutnUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });
    },
});

export const { setUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
