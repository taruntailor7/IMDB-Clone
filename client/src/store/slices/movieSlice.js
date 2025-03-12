import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const fetchMovies = createAsyncThunk('movies/fetchMovies', async (_, { getState }) => {
  const token = getState().auth.token;
  const response = await axios.get(`${API_URL}/api/movies`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
});

export const addMovie = createAsyncThunk('movies/addMovie', async (movieData, { getState }) => {
  const token = getState().auth.token;
  const response = await axios.post(`${API_URL}/api/movies`, movieData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
});

export const updateMovie = createAsyncThunk('movies/updateMovie', async ({ id, updates }, { getState }) => {
  const token = getState().auth.token;
  const response = await axios.put(`${API_URL}/api/movies/${id}`, updates, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
});

export const deleteMovie = createAsyncThunk('movies/deleteMovie', async (id, { getState }) => {
  const token = getState().auth.token;
  await axios.delete(`${API_URL}/api/movies/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return id;
});

const movieSlice = createSlice({
  name: 'movies',
  initialState: {
    list: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addMovie.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(updateMovie.fulfilled, (state, action) => {
        // replace updated movie in list
        const index = state.list.findIndex(m => m._id === action.payload._id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      .addCase(deleteMovie.fulfilled, (state, action) => {
        state.list = state.list.filter(m => m._id !== action.payload);
      });
  }
});

export default movieSlice.reducer;
