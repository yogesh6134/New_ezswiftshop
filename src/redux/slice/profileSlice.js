import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ApiConstant from '../../utils/apiConstant';
import { Request } from '../../services';

const initialState = {
  userProfile: null,
  loading: 'idle',
  error: null,
};

export const fetchProfile = createAsyncThunk(
  'userProfileSlice',
  async (_, thunkAPI) => {
    try {
      const response = await Request.get(ApiConstant.userProfile);
      return { data: response };
    } catch (error) {
      return thunkAPI.rejectWithValue('Profile failed');
    }
  }
);

export const onProfileSlice = createSlice({
  name: 'ProfileSlice',
  initialState,
  reducers: {
    ProfileAction(state, action) {
      state.userProfile = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        const userinfo = action.payload.data;
        state.userProfile = userinfo.data;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message ?? 'Profile failed';
      });
  },
});

export const { ProfileAction } = onProfileSlice.actions;
export const ProfileSelector = (state) => state.ProfileReducer;
export default onProfileSlice.reducer;
