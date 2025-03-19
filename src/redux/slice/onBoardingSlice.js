import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AuthRequest } from '../../Authservices';
import { Request } from '../../services';
import ApiConstant from '../../utils/apiConstant';
import { showLoader, hideLoader } from './loadingSlice';
import { navigateTo, resetNavigation } from '../../utils/navigateTo';
import { showToast } from '../../utils/flashMessageAlert';

const initialState = {
  loginToken: null,
  loading: 'idle',
  error: null,
};

export const fetchLogin = createAsyncThunk('LoginSlice', async (data, thunkAPI) => {
  try {
    thunkAPI.dispatch(showLoader());
    const response = await AuthRequest.post(ApiConstant.Login, data);
    return { data: response };
  } catch (error) {
    thunkAPI.dispatch(hideLoader());
    return thunkAPI.rejectWithValue('Login failed');
  } finally {
    thunkAPI.dispatch(hideLoader());
  }
});

export const fetchRegister = createAsyncThunk('RegisterSlice', async (data, thunkAPI) => {
  try {
    thunkAPI.dispatch(showLoader());
    const response = await AuthRequest.post(ApiConstant.Register, data);
    return { data: response };
  } catch (error) {
    thunkAPI.dispatch(hideLoader());
    return thunkAPI.rejectWithValue('Register failed');
  } finally {
    thunkAPI.dispatch(hideLoader());
  }
});

//createCustomer
export const fetchRegisterCustomer = createAsyncThunk('RegisterCustomerSlice', async (data, thunkAPI) => {
  try {
    thunkAPI.dispatch(showLoader());
    const response = await Request.post(ApiConstant.createCustomer, data);
    return { data: response };
  } catch (error) {
    thunkAPI.dispatch(hideLoader());
    return thunkAPI.rejectWithValue('Register failed');
  } finally {
    thunkAPI.dispatch(hideLoader());
  }
});


export const onLoginSlice = createSlice({
  name: 'LoginSlice',
  initialState,
  reducers: {
    LoginAction(state, action) {
      state.loginToken = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogin.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        // const userinfo = action.payload.data.data;
        // if (userinfo.success) {
        //   state.loginData = userinfo;
        //   state.isLogedIn = true;
        //   setTimeout(() => {
        //     resetNavigation('Home');
        //   }, 100);
        // }
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message || 'Login failed';
      })


      .addCase(fetchRegister.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchRegister.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        const userinfo = action.payload.data;
        console.log('object=====userinfo====:', userinfo)
       if (userinfo.token) {
            // await AsyncStorage.setItem('token', res.data.token)
            state.loginToken = userinfo.token
            navigateTo('RegisterProfile')
        }
        else {
          showToast(userinfo.message, 'warning')
          // navigateTo('RegisterProfile')
        }
      })
      .addCase(fetchRegister.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message || 'Login failed';
      })

      
      .addCase(fetchRegisterCustomer.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchRegisterCustomer.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        const userinfo = action.payload.data;
        console.log('object=====userinfo====:', userinfo)
       if (userinfo.token) {
            // await AsyncStorage.setItem('token', res.data.token)
            // state.loginToken = userinfo.token
            // navigateTo('RegisterProfile')
        }
        else {
          showToast(userinfo.message, 'warning')
          // navigateTo('RegisterProfile')
        }
      })
      .addCase(fetchRegisterCustomer.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message || 'Login failed';
      })

  },
});

export const { LoginAction, AutoLoginData } = onLoginSlice.actions;
export const AuthSelector = ((state) => state.AuthReducer)
export default onLoginSlice.reducer;
