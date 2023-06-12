import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { toast } from "react-toastify";
import { axiosApi } from "../../helpers/axios";

const initialStates = {
  tableData: [],
  status: null,
  reload: [],
  typeList: [],
  isSuccess: false,
  userData: {},
  introducersData: [],
  profile: [],
  YearlyIntroducer: null,
  totalCount: 0,
};

// ** Introducers List
export const introducersListApi = createAsyncThunk(
  "introducersListApi",
  async ({ page, limit, search }, { rejectWithValue }) => {
    try {
      const response = await axiosApi.get(`/SuperAdmin/getIntroducers?page=${page}&limit=${limit}&search=${search ?? ""}`);
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

// ** Add Intruducer
export const addIntroducer = createAsyncThunk(
  "addIntroducer",
  async ({ data }, { rejectWithValue }) => {
    try {
      const response = await axiosApi.post(`/SuperAdmin/introducerRegisterforsuperAdmin`, data);
      toast.success(response.data.message)
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

// ** Delete Introducer
export const deleteIntroducerApi = createAsyncThunk(
  "deleteIntroducerApi",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosApi.delete(`/SuperAdmin/removeIntroducer/${id}`);
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

// ** Introducers Type
export const introducersTypeApi = createAsyncThunk(
  "introducersTypeApi",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosApi.get("/auth/introducertype");
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

// ** Introducer Profile List
export const introducerProfileApi = createAsyncThunk(
  "introducerProfileApi",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await axiosApi.get(`/SuperAdmin/getintroducerprofile/${id}`);
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

// ** Super Admin Profile List
export const superAdminProfileApi = createAsyncThunk(
  "superAdminProfileApi",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosApi.get(`/SuperAdmin/getSuperAdminProfile/${id}`);
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

// ** Update Super Admin Profile
export const updateSuperAdminApi = createAsyncThunk(
  "updateSuperAdminApi",
  async ({ data, id }, { rejectWithValue }) => {
    try {
      const response = await axiosApi.put(`/SuperAdmin/updateSuperAdminDetails/${id}`, data);
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

// ** Update Introducer Profile
export const updateIntroducer = createAsyncThunk(
  "updateIntroducer",
  async ({ data, id }, { rejectWithValue }) => {
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };
    try {
      const response = await axiosApi.put(`/auth/updateIntroducer/${id}`, data, config);
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

// ** Year wise Introducer Count
export const YearlyCountIntroducer = createAsyncThunk(
  "YearlyCountIntroducer",
  async ({ year }, { rejectWithValue }) => {
    try {
      const response = await axiosApi.get(`/SuperAdmin/getIntroducerChartData?year=${year}`);
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

const introducerSlice = createSlice({
  name: "introducer",
  initialState: initialStates,
  extraReducers: {
    [introducersListApi.pending]: (state) => {
      state.status = "loading";
    },
    [introducersListApi.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.tableData = action.payload;
      state.reload = null
      state.isSuccess = false;
      state.totalCount = action.payload.totalResults;
    },
    [introducersListApi.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    [addIntroducer.pending]: (state) => {
      state.status = "loading";
    },
    [addIntroducer.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.introducersData = action.payload;
      state.isSuccess = true;
    },
    [addIntroducer.rejected]: (state, action) => {
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
    [introducersTypeApi.pending]: (state) => {
      state.status = "loading";
    },
    [introducersTypeApi.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.typeList = action.payload;
    },
    [introducersTypeApi.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    [introducerProfileApi.pending]: (state) => {
      state.status = "loading";
    },
    [introducerProfileApi.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.profile = action.payload;
    },
    [introducerProfileApi.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    [updateSuperAdminApi.pending]: (state) => {
      state.status = "loading";
    },
    [updateSuperAdminApi.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.reload = action.payload;
      state.isSuccess = true;
    },
    [updateSuperAdminApi.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    [updateIntroducer.pending]: (state) => {
      state.status = "loading";
    },
    [updateIntroducer.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.reload = action.payload;
      state.isSuccess = true;
    },
    [updateIntroducer.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    [superAdminProfileApi.pending]: (state) => {
      state.status = "loading";
    },
    [superAdminProfileApi.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.userData = action.payload;
      state.isSuccess = false;
    },
    [superAdminProfileApi.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    [YearlyCountIntroducer.pending]: (state) => {
      state.status = "loading";
    },
    [YearlyCountIntroducer.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.YearlyIntroducer = action.payload;
    },
    [YearlyCountIntroducer.rejected]: (state) => {
      state.status = "failed";
    },
  },
  reducers: {
    clearIntroducer(state) {
      state.profile = []
    },
    clearProfile(state) {
      state.userData = []
    }
  }
});

export const { clearIntroducer, clearProfile } = introducerSlice.actions

const { reducer } = introducerSlice;

export default reducer;
