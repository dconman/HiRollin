/* eslint-disable react/jsx-props-no-spreading -- Ignored in higher order components */
import { functionify } from './TypeUtils';
import { useCallback, useState } from 'react';
import Popover from 'react-native-popover-view/dist/Popover';

import type { PublicPopoverProps } from 'react-native-popover-view/dist/Popover';

export default function usePopover(initial = false): {
  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types -- externally defined type
  readonly renderPopover: (props: Readonly<PublicPopoverProps>) => JSX.Element;
  readonly visible: boolean;
  readonly showPopover: () => void;
  readonly hidePopover: () => void;
  readonly showPopoverAnd: (callback?: (() => void)) => void;
  readonly hidePopoverAnd: (callback?: (() => void)) => void;
} {
  const [popover, setPopover] = useState(
    { visible: initial } as { visible: boolean; handleClose?: () => void; handleOpen?: () => void },
  );

  const hidePopoverAnd = useCallback(
    (callback?: (() => void)) => { setPopover({ visible: false, handleClose: callback }); },
    [],
  );

  const showPopoverAnd = useCallback((callback?: (() => void)) => {
    setPopover({ visible: true, handleOpen: callback });
  }, []);

  const hidePopover = useCallback(
    () => { setPopover({ visible: false }); },
    [],
  );

  const showPopover = useCallback((callback?: (() => void)) => {
    setPopover({ visible: true, handleOpen: functionify(callback) });
  }, []);

  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types -- externally defined type
  const renderPopover = (props: Readonly<PublicPopoverProps>): JSX.Element => (
    <Popover
      {...props}
      isVisible={popover.visible}
      onCloseComplete={popover.handleClose}
      onOpenComplete={popover.handleOpen}
    />
  );

  return {
    renderPopover, visible: popover.visible, showPopover, hidePopover, showPopoverAnd, hidePopoverAnd,
  };
}
