import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { toast } from "react-toastify";
import { axiosApi } from "../../helpers/axios";

const initialStates = {
  tableData: [],
  status: null,
  reload: [],
  updatePlayerData: {},
  userData: {},
  endUserData: [],
  isSuccess: false,
  endUserRegister: [],
  profile: [],
  YearlyUser: null,
  yearlyUserOnIntroducer: null,
  totalCount: 0,
  endUserCount: null,
};

// ** Update Introducer
export const updateIntroducerApi = createAsyncThunk(
  "updateIntroducerApi",
  async ({ active, id }, { rejectWithValue }) => {
    try {
      const response = await axiosApi.put(
        `/SuperAdmin/activeAndinactiveintroducer/${id}`,
        { isActive: active }
      );
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

// ** Delete Introducer
export const deleteIntroducerApi = createAsyncThunk(
  "deleteIntroducerApi",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosApi.delete(`/auth/${id}`);
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

// ** End Users List
export const endUserListApi = createAsyncThunk(
  "endUserListApi",
  async ({ page, limit, search }, { rejectWithValue }) => {
    try {
      const response = await axiosApi.get(
        `/auth/getEnduser?page=${page}&limit=${limit}&search=${search ?? ""}`
      );
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

// ** End Users Based On Introducer
export const endUserBasedOnIntroducerApi = createAsyncThunk(
  "endUserBasedOnIntroducerApi",
  async ({ id, page, limit, search }, { rejectWithValue }) => {
    try {
      const response = await axiosApi.get(
        `/SuperAdmin/enduserlistbasedonintroducer/${id}?page=${
          page ?? 1
        }&limit=${limit ?? 10}&search=${search ?? ""}`
      );
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

// ** End Users Register By Introducer
export const endUserRegisterByIntroducerApi = createAsyncThunk(
  "endUserRegisterByIntroducerApi",
  async ({ data, clubs }, { rejectWithValue }) => {
    try {
      const response = await axiosApi.post(
        `/auth/EnduserRegisterByIntroducer`,
        data,
        clubs
      );
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

// ** End Users Profile
export const endUserProfile = createAsyncThunk(
  "endUserProfile",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await axiosApi.get(`/auth/EnduserProfile/${id}`);
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

// ** End Users Update
export const endUserUpdateApi = createAsyncThunk(
  "endUserUpdateApi",
  async ({ data, id, clubs }, { rejectWithValue }) => {
    try {
      const response = await axiosApi.post(
        `/auth/EnduserUpdateByIntroducer/${id}`,
        data,
        clubs
      );
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

// ** Current monthly count User
export const monthlyCountUser = createAsyncThunk(
  "monthlyCountUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosApi.get(
        "/SuperAdmin/CurrentMonthlyCountUser"
      );
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

// ** Current Week count User
export const WeeklyCountUser = createAsyncThunk(
  "WeeklyCountUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosApi.get("/SuperAdmin/CurrentweeklyCountUser");
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

// ** Year wise User Count
export const YearlyCountUser = createAsyncThunk(
  "YearlyCountUser",
  async ({ year }, { rejectWithValue }) => {
    try {
      const response = await axiosApi.get(
        `/SuperAdmin/getUserChartData?year=${year}`
      );
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

// ** Current yearly count User based on Introducer
export const YearlyCountUserBasedOnIntroducer = createAsyncThunk(
  "YearlyCountUserBasedOnIntroducer",
  async ({ year }, { rejectWithValue }) => {
    try {
      const response = await axiosApi.get(
        `/auth/UserbasedOnIntroducerChartData?year=${year}`
      );
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

// ** End User List Count
export const endUserListCount = createAsyncThunk(
  "endUserListCount",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await axiosApi.get(`SuperAdmin/endUserListCount/${id}`);
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

const endUserSlice = createSlice({
  name: "enduser",
  initialState: initialStates,
  extraReducers: {
    [endUserListApi.pending]: (state) => {
      state.status = "loading";
    },
    [endUserListApi.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.reload = null;
      state.isSuccess = false;
      state.tableData = action.payload;
      state.totalCount = action.payload.totalResults;
    },
    [endUserListApi.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
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
    [deleteIntroducerApi.pending]: (state) => {
      state.status = "loading";
    },
    [deleteIntroducerApi.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.reload = action.payload;
    },
    [deleteIntroducerApi.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    [endUserBasedOnIntroducerApi.pending]: (state) => {
      state.status = "loading";
    },
    [endUserBasedOnIntroducerApi.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.endUserData = action.payload;
      state.isSuccess = false;
      state.reload = null;
      state.totalCount = action.payload[0].totalResults;
    },
    [endUserBasedOnIntroducerApi.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    [endUserRegisterByIntroducerApi.pending]: (state) => {
      state.status = "loading";
    },
    [endUserRegisterByIntroducerApi.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.endUserRegister = action.payload;
      state.isSuccess = true;
    },
    [endUserRegisterByIntroducerApi.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    [endUserProfile.pending]: (state) => {
      state.status = "loading";
    },
    [endUserProfile.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.profile = action.payload;
    },
    [endUserProfile.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    [endUserUpdateApi.pending]: (state) => {
      state.status = "loading";
    },
    [endUserUpdateApi.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.updatePlayerData = action.payload;
    },
    [endUserUpdateApi.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    [YearlyCountUser.pending]: (state) => {
      state.status = "loading";
    },
    [YearlyCountUser.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.YearlyUser = action.payload;
    },
    [YearlyCountUser.rejected]: (state) => {
      state.status = "failed";
    },
    [YearlyCountUserBasedOnIntroducer.pending]: (state) => {
      state.status = "loading";
    },
    [YearlyCountUserBasedOnIntroducer.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.yearlyUserOnIntroducer = action.payload;
    },
    [YearlyCountUserBasedOnIntroducer.rejected]: (state) => {
      state.status = "failed";
    },
    [endUserListCount.pending]: (state) => {
      state.status = "loading";
    },
    [endUserListCount.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.endUserCount = action.payload;
    },
    [endUserListCount.rejected]: (state) => {
      state.status = "failed";
    },
  },
  reducers: {
    clearStatus(state) {
      state.status = null;
    },
    clearEndUser(state) {
      state.endUserData = [];
    },
    clearEndUserProfile(state) {
      state.profile = [];
    },
    clearReload(state) {
      state.reload = [];
      state.updatePlayerData = {};
    },
    clearClub(state) {
      state.profile = [];
    },
  },
});

export const {
  clearEndUser,
  clearStatus,
  clearReload,
  clearEndUserProfile,
  clearClub,
} = endUserSlice.actions;

const { reducer } = endUserSlice;

export default reducer;
