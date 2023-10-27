import { createSlice } from '@reduxjs/toolkit';
import { sublinks } from 'constants';

const initialState = {
  showSidebar: false,
  showSubmenu: true,
  location: {},
  page: {
    page: '',
    links: [],
  },
};

export const subMenuSlice = createSlice({
  name: 'submenu',
  initialState,
  reducers: {
    openSidebar: (state) => {
      state.showSidebar = true;
    },
    closeSidebar: (state) => {
      state.showSidebar = false;
    },
    openSubmenu: (state, { payload }) => {
      state.page = sublinks.find((item) => item.page === payload.page);
      state.location = payload.coordinates;
      state.showSubmenu = true;
    },
    closeSubmenu: (state) => {
      state.showSubmenu = false;
    },
  },
});

export const { closeSidebar, closeSubmenu, openSidebar, openSubmenu } = subMenuSlice.actions;

export default subMenuSlice.reducer;
