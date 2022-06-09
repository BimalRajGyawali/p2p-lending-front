import { createSlice } from '@reduxjs/toolkit'

const SidebarShowSlice = createSlice({
  name: 'showSidebar',

  initialState: {
    on: false,
  },

  reducers: {
    toggle: (state) => {
      state.on = !state.on
    },
  },
})

export default SidebarShowSlice
