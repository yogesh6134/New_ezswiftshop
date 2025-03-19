import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Request } from '../../services';
import ApiConstant from '../../utils/apiConstant';
import { hideLoader, showLoader } from './loadingSlice';

const initialState = {
  ProductList: [],
  loading: 'idle',
  error: null,
};

export const fetchProducts = createAsyncThunk('ProductListSlice', async (_, thunkAPI) => {
  try {
    thunkAPI.dispatch(showLoader());
    const response = await Request.get(ApiConstant.Product);
    return { data: response };
  } catch (error) {
    return thunkAPI.rejectWithValue('failed');
  } finally {
      thunkAPI.dispatch(hideLoader());
    }
});

export const fetchAppointment = createAsyncThunk('AppointmentSlice', async (data, thunkAPI) => {
  try {
    thunkAPI.dispatch(showLoader());
    const response = await Request.post(ApiConstant.Appointment, data);
    return { data: response };
  } catch (error) {
    return thunkAPI.rejectWithValue('failed');
  } finally {
      thunkAPI.dispatch(hideLoader());
    }
});


export const fetchAppointmentduration = createAsyncThunk('appointmentdurationSlice', async (_, thunkAPI) => {
  try {
    thunkAPI.dispatch(showLoader());
    const response = await Request.get(ApiConstant.Appointmentduration);
    return { data: response };
  } catch (error) {
    return thunkAPI.rejectWithValue('failed');
  } finally {
      thunkAPI.dispatch(hideLoader());
    }
});





export const onProductSlice = createSlice({
  name: 'LoginSlice',
  initialState,
  reducers: {
    ProductAction(state, action) {
      state.data = action.payload;
    },

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        const data = action.payload?.data;
        state.ProductList = data
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message ?? 'Login failed';
      })


      .addCase(fetchAppointment.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchAppointment.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        const data = action.payload?.data;
        console.log('object data====1111111:', data)

        // state.ProductList = data
      })
      .addCase(fetchAppointment.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message ?? 'Login failed';
      })


      .addCase(fetchAppointmentduration.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchAppointmentduration.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        const data = action.payload?.data;
        console.log('object data====:22222222', data)
        // state.ProductList = data
      })
      .addCase(fetchAppointmentduration.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message ?? 'Login failed';
      })
      
  },
});

export const { ProductAction} = onProductSlice.actions;
export const ProductSelector = ((state) => state.ProductReducer)
export default onProductSlice.reducer;
