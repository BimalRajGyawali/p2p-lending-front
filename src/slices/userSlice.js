import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',

  initialState: {
    email: '',
    role: '',
  },

  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload
    },

    setRole: (state, action) => {
      state.role = action.payload
    },
  },
})

export default userSlice
