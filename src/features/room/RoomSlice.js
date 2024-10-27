import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//View all room
export const ViewAllRoom = createAsyncThunk(
    'room/viewAllRoom',
    async (thunkAPI) => {
        try {
            const response = await fetch(`https://sdn-hotel-api.onrender.com/room`);
            if (!response.ok) {
                throw new Error('Failed to fetch Room!')
            }
            const data = await response.json();
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)

//View room by ID
export const ViewRoomById = createAsyncThunk(
    'room/viewRoomById',
    async ({ categoryRoomId, roomId }, thunkAPI) => {
        try {
            const response = await fetch(`https://sdn-hotel-api.onrender.com/room/${roomId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch room!');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// Add Room Category
export const AddRoomCategory = createAsyncThunk(
    'room/addRoomCategory',
    async ({ roomCategoryName, price, amount }, thunkAPI) => {  // Wrap parameters in an object
        try {
            const response = await fetch('https://sdn-hotel-api.onrender.com/category', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ roomCategoryName, price, amount }),  // Properly format request body
            });
            if (!response.ok) {
                throw new Error('Failed to add room category!');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

//View Room Category
export const ViewRoomCategory = createAsyncThunk(
    'room/ViewRoomCategory',
    async (thunkAPI) => {
        try {
            const response = await fetch(`https://sdn-hotel-api.onrender.com/category`);
            if (!response.ok) {
                throw new Error('Failed to fetch Room!')
            }
            const data = await response.json();
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

//View Room Category
export const ViewRoomCategoryById = createAsyncThunk(
    'room/ViewRoomCategoryById',
    async (categoryRoomId, thunkAPI) => {
        try {
            const response = await fetch(`https://sdn-hotel-api.onrender.com/category/${categoryRoomId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch Room!')
            }
            const data = await response.json();
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);


// Update Room Category
export const UpdateRoomCategory = createAsyncThunk(
    'room/updateRoomCategory',
    async ({ categoryRoomID, roomCategoryName, price, amount }, thunkAPI) => {  // Wrap parameters in an object
        try {
            const response = await fetch(`https://sdn-hotel-api.onrender.com/category/${categoryRoomID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ roomCategoryName, price, amount }),  // Properly format request body
            });
            if (!response.ok) {
                throw new Error('Failed to update room category!');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

//Delete room category
export const DeleteRoomCategory = createAsyncThunk(
    'room/deleteRoomCategory',
    async (arg, thunkAPI) => {
        try {
            const categoryRoomId = arg.categoryRoomId;
            const response = await fetch(`https://sdn-hotel-api.onrender.com/category/${categoryRoomId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete room category!');
            }
            return categoryRoomId; // Return the ID of the deleted category
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

//Create new room
export const CreateRoom = createAsyncThunk(
    'room/createRoom',
    async ({ categoryRoomId }, thunkAPI) => {
        try {
            const response = await fetch(`https://sdn-hotel-api.onrender.com/category/${categoryRoomId}/room`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: '',
            });
            if (!response.ok) {
                throw new Error('Failed to create room!');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

//Delete room
export const DeleteRoom = createAsyncThunk(
    'room/deleteRoom',
    async ({ roomId }, thunkAPI) => {
        try {
            const response = await fetch(`https://sdn-hotel-api.onrender.com/room/${roomId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete room!');
            }
            return roomId; // Return the ID of the deleted room
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

const initialState = {
    roomCategories: [],
    roomCategory: [],
    rooms: [],
    loading: false,
    error: null,
};

const roomSlice = createSlice({
    name: 'roomReducer',
    initialState,
    reducers: {
        clearError(state) {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        // View All Rooms
        builder.addCase(ViewAllRoom.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(ViewAllRoom.fulfilled, (state, action) => {
            state.loading = false;
            state.rooms = action.payload;
            state.error = null;
        });
        builder.addCase(ViewAllRoom.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // View All Category
        builder.addCase(ViewRoomCategory.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(ViewRoomCategory.fulfilled, (state, action) => {
            state.loading = false;
            state.roomCategories = action.payload;
            state.error = null;
        });
        builder.addCase(ViewRoomCategory.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // View Category by ID
        builder.addCase(ViewRoomCategoryById.pending, (state) => {
            state.loading = false;
        });
        builder.addCase(ViewRoomCategoryById.fulfilled, (state, action) => {
            state.loading = false;
            const room = action.payload;
            // Find the room by ID and update only that room
            const roomIndex = state.rooms.findIndex(r => r.id === room.id);
            if (roomIndex !== -1) {
                state.rooms[roomIndex] = room;  // Update only the specific room
            }
            state.error = null;
        });
        builder.addCase(ViewRoomCategoryById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // View Room by ID
        builder.addCase(ViewRoomById.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(ViewRoomById.fulfilled, (state, action) => {
            state.loading = false;
            const room = action.payload;
            state.rooms = state.rooms.map(r => (r.id === room.id ? room : r));
            state.error = null;
        });
        builder.addCase(ViewRoomById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // Add Room Category
        builder.addCase(AddRoomCategory.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(AddRoomCategory.fulfilled, (state, action) => {
            state.loading = false;
            state.roomCategories.push(action.payload);
            state.error = null;
        });
        builder.addCase(AddRoomCategory.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // Update Room Category
        builder.addCase(UpdateRoomCategory.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(UpdateRoomCategory.fulfilled, (state, action) => {
            state.loading = false;
            const updatedCategory = action.payload;
            state.roomCategories = state.roomCategories.map(category =>
                category._id === updatedCategory._id ? updatedCategory : category
            );
            state.error = null;
        });
        builder.addCase(UpdateRoomCategory.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // Delete Room Category
        builder.addCase(DeleteRoomCategory.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(DeleteRoomCategory.fulfilled, (state, action) => {
            state.loading = false;
            const categoryId = action.payload;
            state.roomCategories = state.roomCategories.filter(category => category.id !== categoryId);
            state.error = null;
        });
        builder.addCase(DeleteRoomCategory.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // Create Room
        builder.addCase(CreateRoom.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(CreateRoom.fulfilled, (state, action) => {
            state.loading = false;
            state.rooms.push(action.payload);
            state.error = null;
        });
        builder.addCase(CreateRoom.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // Delete Room
        builder.addCase(DeleteRoom.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(DeleteRoom.fulfilled, (state, action) => {
            state.loading = false;
            const roomId = action.payload;
            state.rooms = state.rooms.filter(room => room.id !== roomId);
            state.error = null;
        });
        builder.addCase(DeleteRoom.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

// Export the reducer and actions
export const { clearError } = roomSlice.actions;
export default roomSlice.reducer;