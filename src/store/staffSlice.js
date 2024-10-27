import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = "https://sdn-hotel-api.onrender.com";

const initialState = {
    staffDetail: null,
    staffs: [],
    isLoading: false,
    errorMessage: "",
};

// POST CREATE staff
export const addStaff = createAsyncThunk(
    "staff/add",
    async ({ staffData }, thunkAPI) => {
        try {
            const response = await fetch(`${API_URL}/manage/staffs`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(staffData),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to add new staff!");
            }

            const data = await response.json();
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// GET all staffs
export const getAllStaffs = createAsyncThunk(
    "staff/getAllStaffs",
    async (_, thunkAPI) => {
        try {
            const response = await fetch(`${API_URL}/manage/staffs`);

            if (!response.ok) {
                throw new Error("Failed to get all staffs");
            }

            const data = await response.json();

            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// GET staff by staffId
export const getStaffById = createAsyncThunk(
    "staff/getStaffById",
    async ({ _id }, thunkAPI) => {
        try {
            const response = await fetch(`${API_URL}/manage/staffs/${_id}`);

            if (!response.ok) {
                throw new Error("Failed to get staff detail!");
            }
            const data = await response.json();
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// PUT a staff by staffId
export const updateStaff = createAsyncThunk(
    "staff/edit",
    async ({ _id, updatedData }, thunkAPI) => {
        try {
            const response = await fetch(`${API_URL}/manage/staffs/${_id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to update staff!");
            }

            const data = await response.json();
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// DELETE a staff by staffId
export const deleteStaff = createAsyncThunk(
    "staff/delete",
    async ({ _id }, thunkAPI) => {
        try {
            const response = await fetch(`${API_URL}/manage/staffs/${_id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("Failed to delete staff!");
            }

            return _id;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// Staff slice
const staffSlice = createSlice({
    name: "staff",
    initialState,
    extraReducers: (builder) => {
        // GET all staffs
        builder.addCase(getAllStaffs.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getAllStaffs.fulfilled, (state, action) => {
            state.isLoading = false;
            state.staffs = action.payload;
        });
        builder.addCase(getAllStaffs.rejected, (state, action) => {
            state.isLoading = false;
            state.errorMessage = action.payload;
        });

        // GET staff by staff Id
        builder.addCase(getStaffById.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getStaffById.fulfilled, (state, action) => {
            state.isLoading = false;
            state.staffDetail = action.payload;
        });
        builder.addCase(getStaffById.rejected, (state, action) => {
            state.isLoading = false;
            state.errorMessage = action.payload;
        });

        // POST new staff
        builder.addCase(addStaff.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(addStaff.fulfilled, (state, action) => {
            state.isLoading = false;
            state.staffs.push(action.payload);
        });
        builder.addCase(addStaff.rejected, (state, action) => {
            state.isLoading = false;
            state.errorMessage = action.payload;
        });

        // PUT staff by Id
        builder.addCase(updateStaff.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(updateStaff.fulfilled, (state, action) => {
            state.isLoading = false;
            const index = state.staffs.findIndex(
                (staff) => staff._id === action.payload._id
            );
            if (index !== -1) {
                state.staffs[index] = action.payload;
            }
        });
        builder.addCase(updateStaff.rejected, (state, action) => {
            state.isLoading = false;
            state.errorMessage = action.payload;
        });

        // DELETE staff by Id
        builder.addCase(deleteStaff.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(deleteStaff.fulfilled, (state, action) => {
            state.isLoading = false;
            state.staffs = state.staffs.filter(
                (staff) => staff._id !== action.payload
            );
        });
        builder.addCase(deleteStaff.rejected, (state, action) => {
            state.isLoading = false;
            state.errorMessage = action.payload;
        });
    },
});

// Export the state selectors
export const selectAllStaffs = (state) => state.staff.staffs;
export const selectStaffDetail = (state) => state.staff.staffDetail;
export const selectLoading = (state) => state.staff.isLoading;
export const selectErrorMessage = (state) => state.staff.errorMessage;

export default staffSlice.reducer;
