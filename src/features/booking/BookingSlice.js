import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// CREATE booking
export const bookRoom = createAsyncThunk(
    'booking/bookRoom',
    async (bookingData, thunkAPI) => {
        try {
            const response = await fetch('https://sdn-hotel-fpt.onrender.com', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bookingData),
            });
            if (!response.ok) {
                throw new Error('Failed to book room');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// GET bookings for the current user
export const fetchUserBookings = createAsyncThunk(
    'booking/fetchUserBookings',
    async (username, thunkAPI) => {
        try {
            const response = await fetch(`https://sdn-hotel-fpt.onrender.com/booking/${username}`);
            if (!response.ok) {
                throw new Error('Failed to fetch bookings for user');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// GET current booking
export const fetchCurrentBookings = createAsyncThunk(
    'booking/fetchBookingInformation',
    async (_id, thunkAPI) => {
        try {
            const response = await fetch(`https://sdn-hotel-fpt.onrender.com/booking/user/${_id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch bookings for user');
            }
            const data = await response.json();
            console.log(data)
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// GET all bookings
export const fetchBookings = createAsyncThunk(
    'booking/fetchBookings',
    async (_, thunkAPI) => {
        try {
            const response = await fetch('https://sdn-hotel-fpt.onrender.com/booking');
            if (!response.ok) {
                throw new Error('Failed to fetch bookings');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// UPDATE a booking by ID
export const updateBooking = createAsyncThunk(
    'booking/updateBooking',
    async ({ id, updatedData }, thunkAPI) => {
        try {
            const response = await fetch(`https://sdn-hotel-fpt.onrender.com/booking/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
            });
            if (!response.ok) {
                throw new Error('Failed to update booking');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// DELETE a booking by ID
export const deleteBooking = createAsyncThunk(
    'booking/deleteBooking',
    async (bookingID, thunkAPI) => {
        try {
            const response = await fetch(`https://sdn-hotel-fpt.onrender.com/booking/${bookingID}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete booking');
            }
            return bookingID; // Return the deleted booking ID
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// Booking slice
const bookingSlice = createSlice({
    name: 'booking',
    initialState: {
        bookingDetails: null,
        bookings: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        // CREATE booking
        builder
            .addCase(bookRoom.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(bookRoom.fulfilled, (state, action) => {
                state.loading = false;
                state.bookings.push(action.payload); // Add new booking
                state.error = null;
            })
            .addCase(bookRoom.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // GET user-specific bookings
        builder
            .addCase(fetchUserBookings.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserBookings.fulfilled, (state, action) => {
                state.loading = false;
                state.bookings = action.payload; // Store fetched bookings
                state.error = null;
            })
            .addCase(fetchUserBookings.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // GET current booking
        builder
            .addCase(fetchCurrentBookings.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCurrentBookings.fulfilled, (state, action) => {
                state.loading = false;
                state.bookingDetails = action.payload;
                state.error = null;
            })
            .addCase(fetchCurrentBookings.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // READ all bookings
        builder
            .addCase(fetchBookings.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBookings.fulfilled, (state, action) => {
                state.loading = false;
                state.bookings = action.payload; // Store fetched bookings
                state.error = null;
            })
            .addCase(fetchBookings.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // UPDATE booking
        builder
            .addCase(updateBooking.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateBooking.fulfilled, (state, action) => {
                state.loading = false;
                const updatedBooking = action.payload;
                state.bookings = state.bookings.map(booking =>
                    booking._id === updatedBooking._id ? updatedBooking : booking
                );
                console.log(state.bookings)
                state.error = null;
            })
            .addCase(updateBooking.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // DELETE booking
        builder
            .addCase(deleteBooking.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteBooking.fulfilled, (state, action) => {
                state.loading = false;
                state.bookings = state.bookings.filter(booking => booking.id !== action.payload); // Remove the deleted booking
                state.error = null;
            })
            .addCase(deleteBooking.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

// Export the state selectors
export const selectAllBookings = (state) => state.booking.bookings;
export default bookingSlice.reducer;
