import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import actorReducer from './slices/actorSlice';
import producerReducer from './slices/producerSlice';
import movieReducer from './slices/movieSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    actors: actorReducer,
    producers: producerReducer,
    movies: movieReducer
  }
});
