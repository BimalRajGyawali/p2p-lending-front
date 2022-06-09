// import { createStore } from 'redux'
//
// const initialState = {
//   sidebarShow: true,
// }
//
// const changeState = (state = initialState, { type, ...rest }) => {
//   switch (type) {
//     case 'set':
//       return { ...state, ...rest }
//     default:
//       return state
//   }
// }
//
// const store = createStore(changeState)
// export default store
import { configureStore } from '@reduxjs/toolkit'
import sidebarShowSlice from './slices/SidebarShowSlice'
import userSlice from './slices/userSlice'

const store = configureStore({
  reducer: {
    showSideBar: sidebarShowSlice.reducer,
    user: userSlice.reducer,
  },
})

export default store
