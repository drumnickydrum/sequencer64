import { ReactComponent as Stop } from 'assets/icons/stop.svg';
import { ReactComponent as Start } from 'assets/icons/start.svg';
import { ReactComponent as Pause } from 'assets/icons/pause.svg';
import { ReactComponent as Undo } from 'assets/icons/undo.svg';
import { ReactComponent as Redo } from 'assets/icons/redo.svg';
import { ReactComponent as EraseOne } from 'assets/icons/erase-one.svg';
import { ReactComponent as EraseAll } from 'assets/icons/erase-all.svg';
import { ReactComponent as Saw } from 'assets/icons/saw.svg';
import { ReactComponent as Copy } from 'assets/icons/copy.svg';
import { ReactComponent as Palette } from 'assets/icons/palette.svg';
import { ReactComponent as Solo } from 'assets/icons/solo.svg';
import { ReactComponent as Mute } from 'assets/icons/mute.svg';
import { ReactComponent as Pitch } from 'assets/icons/pitch.svg';
import { ReactComponent as Velocity } from 'assets/icons/velocity.svg';
import { ReactComponent as Length } from 'assets/icons/length.svg';
import { ReactComponent as Tap } from 'assets/icons/tap.svg';
import { ReactComponent as PointLeft } from 'assets/icons/pointers/point-left.svg';
import { ReactComponent as PointUp } from 'assets/icons/pointers/point-up.svg';
import { ReactComponent as PointDown } from 'assets/icons/pointers/point-down.svg';
import { ReactComponent as Paint } from 'assets/icons/paint.svg';
import { ReactComponent as Close } from 'assets/icons/close.svg';
import { ReactComponent as ChevronDown } from 'assets/icons/chevrons/chevron-down.svg';
import { ReactComponent as ChevronRight } from 'assets/icons/chevrons/chevron-right.svg';
import { ReactComponent as ChevronLeft } from 'assets/icons/chevrons/chevron-left.svg';
import { ReactComponent as Open } from 'assets/icons/open.svg';
import { ReactComponent as Save } from 'assets/icons/save.svg';
import { ReactComponent as Delete } from 'assets/icons/delete.svg';
import { ReactComponent as Kit } from 'assets/icons/kit.svg';
import { ReactComponent as Eraser } from 'assets/icons/eraser.svg';
import { ReactComponent as CloudDownload } from 'assets/icons/cloud-download.svg';
import { ReactComponent as Check } from 'assets/icons/check-bold.svg';
import { ReactComponent as Twitter } from 'assets/icons/social/twitter.svg';
import { ReactComponent as Facebook } from 'assets/icons/social/facebook.svg';

export const ChevronDownIcon = ({ addClass = '' }) => (
  <ChevronDown className={addClass + ' icon chevron-down'} />
);

export const ChevronLeftIcon = ({ addClass = '' }) => (
  <ChevronLeft className={addClass + ' icon chevron-left'} />
);
export const ChevronRightIcon = ({ addClass = '' }) => (
  <ChevronRight className={addClass + ' icon chevron-right'} />
);

export const StopIcon = ({ addClass = '' }) => (
  <Stop className={addClass + ' icon'} />
);
export const StartIcon = ({ addClass = '' }) => (
  <Start className={addClass + ' icon'} />
);
export const PauseIcon = ({ addClass = '' }) => (
  <Pause className={addClass + ' icon'} />
);

export const UndoIcon = ({ addClass = '' }) => (
  <Undo className={addClass + ' icon'} />
);
export const RedoIcon = ({ addClass = '' }) => (
  <Redo className={addClass + ' icon'} />
);
export const EraseOneIcon = ({ addClass = '' }) => (
  <EraseOne className={addClass + ' icon'} />
);
export const EraseAllIcon = ({ addClass = '' }) => (
  <EraseAll className={addClass + ' icon'} />
);

export const SawIcon = ({ addClass = '' }) => (
  <Saw className={addClass + ' icon'} />
);

export const SliceIcon = ({ addClass = '' }) => (
  <div className={addClass}>
    <Saw className='icon' />
  </div>
);

export const CopyIcon = ({ addClass = '' }) => (
  <Copy className={addClass + ' icon'} />
);

export const PaletteIcon = ({ addClass = '' }) => (
  <Palette className={addClass + ' icon'} />
);

export const SoloIcon = ({ addClass = '' }) => (
  <Solo className={addClass + ' icon'} />
);
export const MuteIcon = ({ addClass = '' }) => (
  <Mute className={addClass + ' icon'} />
);

export const PitchIcon = ({ addClass = '' }) => (
  <Pitch className={addClass + ' icon'} />
);
export const VelocityIcon = ({ addClass = '' }) => (
  <Velocity className={addClass + ' icon'} />
);
export const LengthIcon = ({ addClass = '' }) => (
  <Length className={addClass + ' icon'} />
);

export const PaintIcon = ({ addClass = '' }) => (
  <Paint className={addClass + ' icon'} />
);
export const CloseIcon = ({ addClass = '' }) => (
  <Close className={addClass + ' icon'} />
);

export const OpenIcon = ({ addClass = '' }) => (
  <Open className={addClass + ' icon'} />
);
export const SaveIcon = ({ addClass = '' }) => (
  <Save className={addClass + ' icon'} />
);

export const DeleteIcon = ({ addClass = '' }) => (
  <Delete className={addClass + ' icon'} />
);

export const EraserIcon = ({ addClass = '' }) => (
  <Eraser className={addClass + ' icon'} />
);

export const CloudDownloadIcon = ({ addClass = '' }) => (
  <CloudDownload className={addClass + ' icon'} />
);

export const KitIcon = ({ addClass = '' }) => (
  <Kit className={addClass + ' icon'} />
);

export const CheckIcon = ({ addClass = '' }) => (
  <Check className={addClass + ' icon'} />
);

export const TwitterIcon = ({ addClass = '' }) => (
  <Twitter className={addClass + ' icon'} />
);

export const FacebookIcon = ({ addClass = '' }) => (
  <Facebook className={addClass + ' icon'} />
);

export const TapIcon = ({ addClass = '' }) => (
  <Tap className={addClass + ' icon'} />
);

export const PointUpIcon = ({ addClass = '' }) => (
  <PointUp className={addClass + ' icon'} />
);

export const PointDownIcon = ({ addClass = '' }) => (
  <PointDown className={addClass + ' icon'} />
);

export const PointLeftIcon = ({ addClass = '' }) => (
  <PointLeft className={addClass + ' icon'} />
);
