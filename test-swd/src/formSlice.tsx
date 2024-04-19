import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DataType {
  name: string;
  birthday: Date;
  gender: string;
  IDcard: string | null;
  phoneNumber: string;
  national: string;
  passport: string | null;
  salary: number;
}

interface FormState {
  formData: DataType[];
}

const initialState: FormState = {
  formData: [],
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    addFormData: (state, action: PayloadAction<DataType>) => {
      state.formData.push(action.payload);
    },
    clearFormData: (state) => {
      state.formData = [];
    },
  },
});

export const { addFormData, clearFormData } = formSlice.actions;

export default formSlice.reducer;
