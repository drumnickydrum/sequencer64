import React, { useEffect, useRef } from 'react';
import { TransportPanel } from 'App/Sequencer/MenuBar/TransportPanel';
import { UndoRedo } from 'App/Sequencer/MenuBar/UndoRedo';
import { Erase } from 'App/Sequencer/MenuBar/Erase';
import { LoadSaveButton } from 'App/Sequencer/MenuBar/LoadSaveButton';
import { LoadKitBtn } from 'App/Sequencer/MenuBar/LoadKitBtn';
import { ScrollLeft, ScrollRight } from 'App/shared/Button';

export const Menu = () => {
  const menuRef = useRef(null);
  const scrollbarRef = useRef(null);

  useEffect(() => {
    if (menuRef.current) {
      const width = scrollbarRef.current.clientWidth;
      menuRef.current.scrollTo({
        left: width * 2,
        behavior: 'smooth',
      });
    }
  });

  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const scrollEnd = useRef(null);

  const scroll = (dir) => {
    enableScroll();
    clearTimeout(scrollEnd.current);
    const offset =
      dir === 'right'
        ? scrollbarRef.current.clientWidth
        : scrollbarRef.current.clientWidth * -1;
    const start = menuRef.current.scrollLeft;
    menuRef.current.scrollTo({ left: start + offset, behavior: 'smooth' });
    scrollEnd.current = setTimeout(() => disableScroll(), 500);
  };

  const enableScroll = () => {
    rightRef.current.disabled = false;
    leftRef.current.disabled = false;
  };

  const disableScroll = () => {
    if (menuRef.current.scrollLeft <= 0) {
      leftRef.current.disabled = true;
    }
    if (
      menuRef.current.scrollLeft + scrollbarRef.current.clientWidth >=
      5 * scrollbarRef.current.clientWidth
    ) {
      rightRef.current.disabled = true;
    }
  };

  const handleScroll = () => {
    enableScroll();
    clearTimeout(scrollEnd.current);
    scrollEnd.current = setTimeout(() => disableScroll(), 100);
  };

  // console.log('rendering: Menu');
  return (
    <div ref={menuRef} id='menu' onScroll={handleScroll}>
      <LoadKitBtn />
      <LoadSaveButton />
      <TransportPanel />
      <UndoRedo />
      <Erase />
      <div ref={scrollbarRef} className='scrollbar'>
        <ScrollLeft fwdRef={leftRef} onClick={() => scroll('left')} />
        <ScrollRight fwdRef={rightRef} onClick={() => scroll('right')} />
      </div>
    </div>
  );
};
