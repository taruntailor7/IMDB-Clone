import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const fetchProducers = createAsyncThunk('producers/fetchProducers', async (_, { getState }) => {
  const token = getState().auth.token;
  const response = await axios.get(`${API_URL}/api/producers`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
});

export const addProducer = createAsyncThunk('producers/addProducer', async (producerData, { getState }) => {
  const token = getState().auth.token;
  const response = await axios.post(`${API_URL}/api/producers`, producerData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
});

// Similarly for update, delete, etc.

const producerSlice = createSlice({
  name: 'producers',
  initialState: {
    list: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchProducers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addProducer.fulfilled, (state, action) => {
        state.list.push(action.payload);
      });
  }
});

export default producerSlice.reducer;
