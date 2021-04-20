import { Button } from 'App/shared/Button';
import { usePopupMenu } from './usePopupMenu';
import { Portal } from 'App/shared/Portal';
import { useMemo } from 'react';

export const PopupMenu = ({
  name,
  Icon,
  disabled = false,
  addBtnClasses = '',
  keepOpenOnSelect,
  children,
}) => {
  const popupMenu = usePopupMenu(keepOpenOnSelect);
  const { btnRef, btnClasses, onClick, renderMenu, menuStyle, menuClasses } = popupMenu;

  const btnId = `${name}Btn`;
  return (
    <div ref={btnRef} className='menuBtnWrapper'>
      <Button
        id={btnId}
        classes={btnClasses + ' ' + addBtnClasses}
        disabled={disabled}
        onClick={onClick}
      >
        <Icon />
        <label htmlFor={btnId}>{name}</label>
      </Button>
      <PopupMenuItems renderMenu={renderMenu} menuStyle={menuStyle} menuClasses={menuClasses}>
        {children}
      </PopupMenuItems>
    </div>
  );
};

const PopupMenuItems = ({ renderMenu, menuStyle, menuClasses, children }) => {
  const memo = useMemo(() => {
    return (
      <Portal targetId='popupMenuPortal'>
        <div style={menuStyle} className={menuClasses}>
          {children}
        </div>
      </Portal>
    );
  }, [children, menuClasses, menuStyle]);
  return !renderMenu ? null : memo;
};

export const MenuItem = ({ item, selected, onClick, label }) => {
  const btnId = `item${item}`;
  const memo = useMemo(() => {
    return (
      <Button
        id={btnId}
        classes={selected ? 'popupMenuBtn active' : 'popupMenuBtn'}
        disabled={selected}
        onClick={() => onClick(item)}
      >
        <label htmlFor={btnId}>{label ? label : item}</label>
      </Button>
    );
  }, [btnId, item, label, onClick, selected]);
  return memo;
};

export const MenuItemToggle = ({ item, on, onClick, label }) => {
  const btnId = `itemToggle${item}`;
  const memo = useMemo(() => {
    return (
      <Button
        id={btnId}
        classes={on ? 'popupMenuBtn active' : 'popupMenuBtn'}
        onClick={onClick}
      >
        <label htmlFor={btnId}>{label ? label : item}</label>
      </Button>
    );
  }, [btnId, item, label, on, onClick]);
  return memo;
};