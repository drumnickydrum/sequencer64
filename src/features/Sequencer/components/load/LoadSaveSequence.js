import React, { useMemo } from 'react';
import { LoadSequence } from './LoadSequence';
import { SaveSequence } from './SaveSequence';
import { useDispatch, useSelector } from 'react-redux';
import { logout, setShow } from '../../../../reducers/appSlice';
import { stopSequence } from '../../reducers/toneSlice';
import { Button } from '../../../../components/Button';
import { Link } from 'react-router-dom';

export const LoadSaveSequence = () => {
  const dispatch = useDispatch();

  const show = useSelector((state) => state.app.show);

  const loadSaveSequenceMemo = useMemo(() => {
    const changeTab = (type) => {
      dispatch(setShow(type));
    };

    const onClose = () => dispatch(setShow(''));

    let loadStyle = 'load-save-tab';
    let saveStyle = loadStyle;
    if (show === 'load') loadStyle += ' selected';
    if (show === 'save') saveStyle += ' selected';

    // console.log('rendering: LoadSaveSequence');
    return (
      <>
        <div
          className={show ? 'load-save-sequence show' : 'load-save-sequence'}
        >
          <div className='load-save-tabs'>
            <button
              id='load-tab'
              className={loadStyle}
              onClick={() => changeTab('load')}
            >
              <label htmlFor='load-tab'>Load</label>
            </button>
            <button
              id='save-tab'
              className={saveStyle}
              onClick={() => changeTab('save')}
            >
              <label htmlFor='save-tab'>Save</label>
            </button>
          </div>
          <LoginSection />
          {show === 'save' && <SaveSequence />}
          {show === 'load' && <LoadSequence />}
        </div>
        <div className={show ? 'bottom-btn show' : 'bottom-btn'}>
          <Button classes='load-save-sequence-close' onClick={onClose}>
            Close
          </Button>
        </div>
      </>
    );
  }, [dispatch, show]);
  return loadSaveSequenceMemo;
};

const LoginSection = () => {
  const dispatch = useDispatch();
  const username = useSelector((state) => state.app.user.username);
  const loggedIn = useSelector((state) => state.app.user.loggedIn);
  const fetching = useSelector((state) => state.app.fetching);

  const onLogout = () => dispatch(logout());

  const handleStopSequence = () => {
    dispatch(stopSequence());
  };

  return loggedIn ? (
    <div className='login-status'>
      {fetching ? (
        <p>please wait...</p>
      ) : (
        <div className='login-status-text'>
          <p className='login-status-title'>Logged in as: {username}</p>
          <p className='login-status-sub'>cloud sync</p>
        </div>
      )}
      <button disabled={fetching} onClick={onLogout}>
        logout
      </button>
    </div>
  ) : (
    <div className='login-div'>
      <p className='sequence-select-sub'>
        {fetching
          ? 'Logging in...'
          : 'Login to sync your sequences with your account and share to social media'}
      </p>
      <Link
        className='login-btn'
        onTouchStart={handleStopSequence}
        to='/login'
        disabled={fetching}
      >
        {fetching ? 'x' : 'Login'}
      </Link>
    </div>
  );
};
