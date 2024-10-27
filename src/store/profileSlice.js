import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = "https://sdn-hotel-fpt.onrender.com";

const initialState = {
  userProfile: null,
  isLoading: false,
  errorMessage: "",
};

// GET user profile
export const viewProfile = createAsyncThunk(
  "profile/viewProfile",
  async (_, thunkAPI) => {
    const token = thunkAPI.getState().auth.token;
    try {
      const response = await fetch(`${API_URL}/auth/profile`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch profile");
      }

      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// PUT edit user profile
export const editProfile = createAsyncThunk(
  "profile/editProfile",
  async ({ updatedData }, thunkAPI) => {
    console.log(updatedData);
    const token = thunkAPI.getState().auth.token;
    try {
      const response = await fetch(`${API_URL}/auth/profile/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// POST change password
export const changePassword = createAsyncThunk(
  "profile/changePassword",
  async (passwordData, thunkAPI) => {
    const token = thunkAPI.getState().auth.token;

    if (!token) {
      return thunkAPI.rejectWithValue("No authentication token provided.");
    }

    try {
      const response = await fetch(`${API_URL}/auth/profile/change-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(passwordData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to change password");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error changing password:", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Profile slice
const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setUserProfile(state, action) {
      state.userProfile = action.payload;
    },
    clearUserProfile(state) {
      state.userProfile = null;
    },
  },
  extraReducers: (builder) => {
    // View Profile
    builder.addCase(viewProfile.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(viewProfile.fulfilled, (state, action) => {
      state.isLoading = false;
      state.userProfile = action.payload;
    });
    builder.addCase(viewProfile.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.payload;
    });

    // Edit Profile
    builder.addCase(editProfile.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(editProfile.fulfilled, (state, action) => {
      state.isLoading = false;
      state.userProfile = { ...state.userProfile, ...action.payload };
    });
    builder.addCase(editProfile.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.payload;
    });

    // Change Password
    builder.addCase(changePassword.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(changePassword.fulfilled, (state, action) => {
      state.isLoading = false;
      state.errorMessage = "";
    });
    builder.addCase(changePassword.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.payload;
    });
  },
});

export const { setUserProfile, clearUserProfile } = profileSlice.actions;
export const selectUserProfile = (state) => state.profile.userProfile;
export const selectLoading = (state) => state.profile.isLoading;
export const selectErrorMessage = (state) => state.profile.errorMessage;

export default profileSlice.reducer;
