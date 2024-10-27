import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = "https://sdn-hotel-api.onrender.com";

const initialState = {
    serviceDetail: null,
    services: [],
    isLoading: false,
    errorMessage: "",
};

// POST CREATE service
export const addService = createAsyncThunk(
    "service/add",
    async (serviceData, thunkAPI) => {
        try {
            const response = await fetch(`${API_URL}/services`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(serviceData),
            });
            if (!response.ok) {
                throw new Error("Failed to add new service");
            }

            const data = await response.json();
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// GET all services
export const getAllServices = createAsyncThunk(
    "service/getAllServices",
    async (thunkAPI) => {
        try {
            const response = await fetch(`${API_URL}/services`);

            if (!response.ok) {
                throw new Error("Failed to get all services");
            }

            const data = await response.json();

            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// GET service by serviceId
export const getServiceById = createAsyncThunk(
    "service/getServiceById",
    async (_id, thunkAPI) => {
        try {
            const response = await fetch(`${API_URL}/services/${_id}`);

            if (!response.ok) {
                throw new Error("Failed to get service detail!");
            }
            const data = await response.json();
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// PUT a service by serviceId
export const updateService = createAsyncThunk(
    "service/edit",
    async ({ _id, updatedData }, thunkAPI) => {
        try {
            const response = await fetch(`${API_URL}/services/${_id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedData),
            });

            if (!response.ok) {
                throw new Error("Failed to update service!");
            }

            const data = await response.json();
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// DELETE a service by serviceId
export const deleteService = createAsyncThunk(
    "service/delete",
    async (_id, thunkAPI) => {
        try {
            const response = await fetch(`${API_URL}/services/${_id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("Failed to delete service!");
            }

            return _id;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// ADD Service Items to User
export const addServiceItemsToUser = createAsyncThunk(
    "services/request",
    async ({ userId, serviceItemIds }, thunkAPI) => {
        try {
            const response = await fetch(`${API_URL}/service/serviceItems/request`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userId, serviceItemIds }),
            });
            if (!response.ok) {
                throw new Error("Failed to add service items to user");
            }
            const data = await response.json();
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// Service slice
const serviceSlice = createSlice({
    name: "service",
    initialState,
    extraReducers: (builder) => {
        // GET all services
        builder.addCase(getAllServices.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getAllServices.fulfilled, (state, action) => {
            state.isLoading = false;
            state.services = action.payload;
        });
        builder.addCase(getAllServices.rejected, (state, action) => {
            state.isLoading = false;
            state.errorMessage = action.payload;
        });

        // GET service by serviceId
        builder.addCase(getServiceById.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getServiceById.fulfilled, (state, action) => {
            state.isLoading = false;
            state.serviceDetail = action.payload;
        });
        builder.addCase(getServiceById.rejected, (state, action) => {
            state.isLoading = false;
            state.errorMessage = action.payload;
        });

        // POST new service
        builder.addCase(addService.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(addService.fulfilled, (state, action) => {
            state.isLoading = false;
            state.services.push(action.payload);
        });
        builder.addCase(addService.rejected, (state, action) => {
            state.isLoading = false;
            state.errorMessage = action.payload;
        });

        // PUT service by serviceId
        builder.addCase(updateService.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(updateService.fulfilled, (state, action) => {
            state.isLoading = false;
            const index = state.services.findIndex(
                (service) => service._id === action.payload._id
            );
            if (index !== -1) {
                state.services[index] = action.payload;
            }
        });
        builder.addCase(updateService.rejected, (state, action) => {
            state.isLoading = false;
            state.errorMessage = action.payload;
        });

        // DELETE service by serviceId
        builder.addCase(deleteService.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(deleteService.fulfilled, (state, action) => {
            state.isLoading = false;
            state.services = state.services.filter(
                (service) => service._id !== action.payload
            );
        });
        builder.addCase(deleteService.rejected, (state, action) => {
            state.isLoading = false;
            state.errorMessage = action.payload;
        });
        builder.addCase(addServiceItemsToUser.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(addServiceItemsToUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.serviceDetail = action.payload;
        });
        builder.addCase(addServiceItemsToUser.rejected, (state, action) => {
            state.isLoading = false;
            state.errorMessage = action.payload;
        });
    },
});

// Export the state selectors
export const selectAllServices = (state) => state.service.services;
export const selectServiceDetail = (state) => state.service.serviceDetail;
export const selectServiceLoading = (state) => state.service.isLoading;
export const selectServiceErrorMessage = (state) => state.service.errorMessage;

export default serviceSlice.reducer;
