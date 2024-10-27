import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = "https://sdn-hotel-api.onrender.com";

const initialState = {
    departmentDetail: null,
    departments: [],
    isLoading: false,
    errorMessage: "",
};

// POST CREATE department
export const addDepartment = createAsyncThunk(
    "department/add",
    async (departmentData, thunkAPI) => {
        try {
            const response = await fetch(`${API_URL}/departments`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(departmentData),
            });

            if (!response.ok) {
                throw new Error("Failed to add new department");
            }

            const data = await response.json();
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// GET all departments
export const getAllDepartments = createAsyncThunk(
    "department/getAllDepartments",
    async (thunkAPI) => {
        try {
            const response = await fetch(`${API_URL}/departments`);

            if (!response.ok) {
                throw new Error("Failed to get all departments");
            }

            const data = await response.json();
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// GET department by departmentId
export const getDepartmentById = createAsyncThunk(
    "department/getDepartmentById",
    async (_id, thunkAPI) => {
        try {
            const response = await fetch(`${API_URL}/departments/${_id}`);

            if (!response.ok) {
                throw new Error("Failed to get department detail!");
            }
            const data = await response.json();
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// PUT a department by departmentId
export const updateDepartment = createAsyncThunk(
    "department/edit",
    async ({ _id, updatedData }, thunkAPI) => {
        try {
            const response = await fetch(`${API_URL}/departments/${_id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedData),
            });

            if (!response.ok) {
                throw new Error("Failed to update department!");
            }

            const data = await response.json();
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// DELETE a department by departmentId
export const deleteDepartment = createAsyncThunk(
    "department/delete",
    async ({ _id }, thunkAPI) => {
        try {
            const response = await fetch(`${API_URL}/departments/${_id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("Failed to delete department!");
            }

            return _id;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// Department slice
const departmentSlice = createSlice({
    name: "department",
    initialState,
    extraReducers: (builder) => {
        // GET all departments
        builder.addCase(getAllDepartments.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getAllDepartments.fulfilled, (state, action) => {
            state.isLoading = false;
            state.departments = action.payload;
        });
        builder.addCase(getAllDepartments.rejected, (state, action) => {
            state.isLoading = false;
            state.errorMessage = action.payload;
        });

        // GET department by department Id
        builder.addCase(getDepartmentById.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getDepartmentById.fulfilled, (state, action) => {
            state.isLoading = false;
            state.departmentDetail = action.payload;
        });
        builder.addCase(getDepartmentById.rejected, (state, action) => {
            state.isLoading = false;
            state.errorMessage = action.payload;
        });

        // POST new department
        builder.addCase(addDepartment.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(addDepartment.fulfilled, (state, action) => {
            state.isLoading = false;
            state.departments.push(action.payload);
        });
        builder.addCase(addDepartment.rejected, (state, action) => {
            state.isLoading = false;
            state.errorMessage = action.payload;
        });

        // PUT department by Id
        builder.addCase(updateDepartment.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(updateDepartment.fulfilled, (state, action) => {
            state.isLoading = false;
            const index = state.departments.findIndex(
                (department) => department._id === action.payload._id
            );
            if (index !== -1) {
                state.departments[index] = action.payload;
            }
        });
        builder.addCase(updateDepartment.rejected, (state, action) => {
            state.isLoading = false;
            state.errorMessage = action.payload;
        });

        // DELETE department by Id
        builder.addCase(deleteDepartment.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(deleteDepartment.fulfilled, (state, action) => {
            state.isLoading = false;
            state.departments = state.departments.filter(
                (department) => department._id !== action.payload
            );
        });
        builder.addCase(deleteDepartment.rejected, (state, action) => {
            state.isLoading = false;
            state.errorMessage = action.payload;
        });
    },
});

// Export the state selectors
export const selectAllDepartments = (state) => state.department.departments;
export const selectDepartmentDetail = (state) => state.department.departmentDetail;
export const selectLoading = (state) => state.department.isLoading;
export const selectErrorMessage = (state) => state.department.errorMessage;

export default departmentSlice.reducer;
