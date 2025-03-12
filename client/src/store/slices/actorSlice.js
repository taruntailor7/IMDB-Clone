import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const fetchActors = createAsyncThunk('actors/fetchActors', async (_, { getState }) => {
  const token = getState().auth.token;
  const response = await axios.get(`${API_URL}/api/actors`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
});

export const addActor = createAsyncThunk('actors/addActor', async (actorData, { getState }) => {
  const token = getState().auth.token;
  const response = await axios.post(`${API_URL}/api/actors`, actorData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
});

// Similarly for updateActor, deleteActor, etc.

const actorSlice = createSlice({
  name: 'actors',
  initialState: {
    list: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchActors.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchActors.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchActors.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addActor.fulfilled, (state, action) => {
        state.list.push(action.payload);
      });
  }
});

export default actorSlice.reducer;
