import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { getSS, setSS } from 'utils/storage';
import { HOST } from 'utils/network';
import {
  flagDeleted,
  getUserFromCloud,
  getUserFromIDB,
  idbDelSeq,
  idbSaveSeqs,
  mergeSequences,
} from 'App/reducers/functions/user';

export const VIEWS = {
  SAVE: 'save',
  LOAD: 'load',
  LOAD_KIT: 'LOAD_KIT',
};

export const INITIAL_USER = {
  _id: '',
  username: '',
  loggedIn: false,
};

const INITIAL_STATE = {
  user: { ...INITIAL_USER },
  userSequences: [],
  status: { count: 0, message: 'loading' },
  show: getSS('show') || '',
  fetching: false,
  confirmation: '',
  error: '',
  networkError: false,
  serviceWorkerActive: false,
  online: window.navigator.onLine,
};

export const appSlice = createSlice({
  name: 'app',
  initialState: INITIAL_STATE,
  reducers: {
    setShow: (state, { payload }) => {
      state.show = payload;
      state.confirmation = '';
      state.error = '';
      setSS('show', payload);
    },
    setUser: (state, { payload: { user, message } }) => {
      state.user = user;
      state.status.count++;
      state.status.message = message;
    },
    setStatus: (state, { payload }) => {
      state.status.count++;
      state.status.message = `${state.status.count}#${payload}`;
    },
    setFetching: (state, { payload }) => {
      state.fetching = payload;
    },
    setConfirmation: (state, { payload }) => {
      state.confirmation = payload;
    },
    setError: (state, { payload }) => {
      state.error = payload;
    },
    setNetworkError: (state, { payload: { val, timeout } }) => {
      state.networkError = val;
      if (val) {
        state.networkTimeout = timeout;
      } else {
        console.log('clearing networkTimeout');
        clearTimeout(state.networkTimeout);
      }
    },
    setServiceWorkerActive: (state, { payload }) => {
      state.serviceWorkerActive = payload;
      if (payload) {
        console.log('service worker is active');
      } else {
        console.log('service worker is not active');
      }
    },
    setOnline: (state, { payload }) => {
      state.online = payload;
    },
    updateSequencesFinally: (
      state,
      { payload: { newSequences, message, error, confirmation } }
    ) => {
      state.userSequences = newSequences;
      state.status.count++;
      state.status.message = message;
      if (confirmation) state.confirmation = confirmation;
      if (error) state.error = error;
      state.fetching = false;
    },
    getUserFinally: (
      state,
      { payload: { loggedIn, username, sequences, message } }
    ) => {
      state.user.loggedIn = loggedIn;
      state.user.username = username;
      state.userSequences = sequences;
      state.status.count++;
      state.status.message = message;
      state.fetching = false;
    },
  },
});

export const changeNetworkError = (val) => (dispatch) => {
  let timer;
  dispatch(appSlice.actions.setNetworkError(val, timer));
  if (val)
    timer = setTimeout(() =>
      dispatch(appSlice.actions.setNetworkError(false), 1000 * 60)
    );
};

export const updateSequences = (type, data) => async (dispatch, getState) => {
  let newSequences = [...getState().app.userSequences];
  dispatch(appSlice.actions.setFetching(true));
  let message = '',
    confirmation = '',
    error = '';
  try {
    if (type === 'save') await idbSaveSeqs(data, newSequences);
    if (type === 'delete') await idbDelSeq(data._id, newSequences);
    message = 'success!';
    confirmation = `succesfully ${
      type === 'save' ? 'saved' : 'deleted'
    } sequence: ${data.name}`;
    await axios({
      url: `${HOST}/user/sequence/${type}`,
      method: 'POST',
      data,
      withCredentials: true,
    });
    if (type === 'save') confirmation += ' to cloud';
  } catch (e) {
    if (!message) {
      message = 'unsuccessful :(';
      error = 'Error: Please try again later';
    } else {
      message = 'updated local database';
      if (type === 'delete') flagDeleted(data._id);
    }
  } finally {
    dispatch(
      appSlice.actions.updateSequencesFinally({
        message,
        error,
        confirmation,
        newSequences,
      })
    );
  }
};

export const getUser = () => async (dispatch) => {
  dispatch(appSlice.actions.setFetching(true));
  let payload = {
    loggedIn: false,
    _id: '',
    username: '',
    sequences: [],
    message: '',
  };
  let promises;
  try {
    const cloudSeqs = await getUserFromCloud(payload);
    const idbSeqs = await getUserFromIDB(payload);
    promises = await mergeSequences(payload, cloudSeqs, idbSeqs);
  } catch (e) {
    console.error('getUser ->\n', e);
    payload.message = 'no user data';
  } finally {
    dispatch(appSlice.actions.getUserFinally(payload));
    if (payload.loggedIn && promises && promises.length > 0) {
      try {
        Promise.all(promises);
        dispatch(appSlice.actions.setStatus('user data refreshed'));
      } catch (e) {
        console.error('getUser | promises ->:\n', e);
      }
    }
  }
};

export const logout = () => async (dispatch) => {
  try {
    dispatch(appSlice.actions.setFetching(true));
    await axios({
      url: `${HOST}/user/logout`,
      method: 'GET',
      withCredentials: true,
    });
    dispatch(
      setUser({ user: { ...INITIAL_USER }, message: 'Successfully logged out' })
    );
  } catch (e) {
    console.error('logout ->\n', e);
    dispatch(appSlice.actions.setStatus('error logging out'));
  } finally {
    dispatch(appSlice.actions.setFetching(false));
  }
};

export const {
  setShow,
  setUser,
  setStatus,
  setFetching,
  setConfirmation,
  setError,
  setServiceWorkerActive,
  saveSuccess,
  saveFail,
  setOnline,
} = appSlice.actions;

export default appSlice.reducer;