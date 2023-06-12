import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { axiosApi } from "../../helpers/axios";

const initialStates = {
  loginData: [],
  ProfileData: [],
  responseCode: null,
  reload: [],
  status: null,
  process: null,
  message: null,
  isSuccess: false,
  tableData: [],
  SuperAdminData: [],
  dashboard: null,
  dashboardForIntroducer: null,
  totalCount: 0
};

// ** Login
export const login = createAsyncThunk(
  "login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosApi.post("/SuperAdmin/login", data);
      if (response) {
        localStorage.setItem("access", response.data.tokens.access.token);
        localStorage.setItem("refresh", response.data.tokens.access.token);
        if (response.data.user.role.role === "Super Admin") {
          response.data.user.role.role === "Super Admin" ? localStorage.setItem("isAdmin", true) : localStorage.setItem("isAdmin", false);
        }
        else {
          response.data.user.role.role === "Admin" ? localStorage.setItem("isAdmin", true) : localStorage.setItem("isAdmin", false);
        }
        axiosApi.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.tokens.access.token}`;
        toast.success(response.data.message);
      }
      return response;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

// ** Login Profile
export const loginProfile = createAsyncThunk(
  "loginProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosApi.get("/auth/accessToken");
      toast.success(response.data.message);
      return response.data.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

// ** Reset Password
export const resetPassword = createAsyncThunk(
  "resetPassword",
  async ({ data }, { rejectWithValue }) => {
    try {
      const response = await axiosApi.post("/SuperAdmin/reset-password", data);
      toast.success(response.data.msg)
      return response;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

// ** Send OTP for End User
export const sendOTPforEndUser = createAsyncThunk(
  "sendOTPforEndUser",
  async ({ data }, { rejectWithValue }) => {
    try {
      const response = await axiosApi.post("/SuperAdmin/sendOTPforEndUser", data);
      localStorage.setItem("email", data.email);
      toast.success(response.data.msg)
      return response;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

// ** Verify OTP for End User
export const verifyOTPforEndUser = createAsyncThunk(
  "verifyOTPforEndUser",
  async ({ otp, email }, { rejectWithValue }) => {
    try {
      const response = await axiosApi.post(`/SuperAdmin/verifyOTPforEndUser`, { otp, email });
      toast.success(response.data.msg);
      return response;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

// ** Forgot Password End User
export const forgetpasswordforEnduser = createAsyncThunk(
  "forgetpasswordforEnduser",
  async ({ data }, { rejectWithValue }) => {
    try {
      const email = localStorage.getItem('email')
      const response = await axiosApi.put("/SuperAdmin/forgetpasswordforEnduser", { ...data, email });
      return response;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

// ** Introducers List
export const introducersListApi = createAsyncThunk(
  "introducersListApi",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosApi.get("/auth/getIntroducers");
      return response.data.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

// ** Super Admins List
export const superAdminsListApi = createAsyncThunk(
  "superAdminsListApi",
  async ({ page, limit, search }, { rejectWithValue }) => {
    try {
      const response = await axiosApi.get(`/SuperAdmin/SubSuperAdminList?page=${page}&limit=${limit}&search=${search ?? ''}`);
      return response.data.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

// ** Super Admin Add Another Super Admin
export const RegisterSuperAdminApi = createAsyncThunk(
  "RegisterSuperAdminApi",
  async ({ data }, { rejectWithValue }) => {
    try {
      const response = await axiosApi.post("/SuperAdmin/SuperAdminaddOtherSuperAdmin", data);
      return response.data.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

// ** Super Admin Delete Another Super Admin
export const DeleteSuperAdminApi = createAsyncThunk(
  "DeleteSuperAdminApi",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosApi.delete(`/SuperAdmin/subSuperAdminDeleteBySuperAdmin/${id}`);
      toast.success(response.data.msg)
      return response.data.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

// ** Update Introducer
export const updateIntroducerApi = createAsyncThunk(
  "updateIntroducerApi",
  async ({ active, id }, { rejectWithValue }) => {
    try {
      const response = await axiosApi.put(`/SuperAdmin/activeAndinactiveintroducer/${id}`, { isActive: active });
      toast.success(response.data.msg);
      return response.data.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

// Dashboard Count For Super Admin
export const dashboardCount = createAsyncThunk(
  "dashboardCount",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosApi.get(`/SuperAdmin/deshboardCount?yearOfIntroducer=${new Date().getFullYear()}&yearOfUser=${new Date().getFullYear()}`);
      return response.data.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

// Dashboard Count For Introducer
export const dashboardCountForIntroducer = createAsyncThunk(
  "dashboardCountForIntroducer",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosApi.get(`/auth/dashboardCount?year=${new Date().getFullYear()}`);
      return response.data.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

// ** Create Slice
const authSlice = createSlice({
  name: "auth",
  initialState: initialStates,
  extraReducers: {
    [login.pending]: (state) => {
      state.status = "loading";
    },
    [login.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.loginData = action.payload;
    },
    [login.rejected]: (state) => {
      state.status = "failed";
    },
    [loginProfile.pending]: (state) => {
      state.process = "loading";
    },
    [loginProfile.fulfilled]: (state, action) => {
      state.process = "succeeded";
      state.ProfileData = action.payload;
    },
    [loginProfile.rejected]: (state) => {
      state.status = "failed";
    },
    [resetPassword.pending]: (state) => {
      state.status = "loading";
    },
    [resetPassword.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.loginData = action.payload;
      state.isSuccess = true
    },
    [resetPassword.rejected]: (state) => {
      state.status = "failed";
    },
    [sendOTPforEndUser.pending]: (state) => {
      state.status = "loading";
    },
    [sendOTPforEndUser.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.loginData = action.payload;
      state.isSuccess = true;
    },
    [sendOTPforEndUser.rejected]: (state) => {
      state.status = "failed";
    },
    [verifyOTPforEndUser.pending]: (state) => {
      state.status = "loading";
    },
    [verifyOTPforEndUser.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.responseCode = action.payload.status;
      state.isSuccess = false;
    },
    [verifyOTPforEndUser.rejected]: (state) => {
      state.status = "failed";
    },
    [forgetpasswordforEnduser.pending]: (state) => {
      state.status = "loading";
    },
    [forgetpasswordforEnduser.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.loginData = action.payload;
    },
    [forgetpasswordforEnduser.rejected]: (state) => {
      state.status = "failed";
    },
    [superAdminsListApi.pending]: (state) => {
      state.status = "loading";
    },
    [superAdminsListApi.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.tableData = action.payload;
      state.reload = null;
      state.isSuccess = false;
      state.totalCount = action.payload.totalResults;
    },
    [superAdminsListApi.rejected]: (state) => {
      state.status = "failed";
    },
    [RegisterSuperAdminApi.pending]: (state) => {
      state.status = "loading";
    },
    [RegisterSuperAdminApi.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.SuperAdminData = action.payload;
      state.isSuccess = true;
    },
    [RegisterSuperAdminApi.rejected]: (state) => {
      state.status = "failed";
    },
    [DeleteSuperAdminApi.pending]: (state) => {
      state.status = "loading";
    },
    [DeleteSuperAdminApi.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.reload = action.payload;
    },
    [DeleteSuperAdminApi.rejected]: (state) => {
      state.status = "failed";
    },
    [introducersListApi.pending]: (state) => {
      state.status = "loading";
    },
    [introducersListApi.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.isSuccess = false;
    },
    [introducersListApi.rejected]: (state) => {
      state.status = "failed";
    },
    [updateIntroducerApi.pending]: (state) => {
      state.status = "loading";
    },
    [updateIntroducerApi.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.reload = action.payload;
    },
    [updateIntroducerApi.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    [dashboardCount.pending]: (state) => {
      state.status = "loading";
    },
    [dashboardCount.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.dashboard = action.payload;
      state.isSuccess = false
    },
    [dashboardCount.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    [dashboardCountForIntroducer.pending]: (state) => {
      state.status = "loading";
    },
    [dashboardCountForIntroducer.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.dashboardForIntroducer = action.payload;
      state.isSuccess = false
    },
    [dashboardCountForIntroducer.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
  }
});

const { reducer } = authSlice;

export default reducer;
