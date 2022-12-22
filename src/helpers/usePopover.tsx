import { useCallback, useState } from 'react';
import Popover from 'react-native-popover-view/dist/Popover';
import type { ComponentPropsWithoutRef } from 'react';

export default function usePopover(initial = false): {
  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types -- imported type
  readonly renderPopover: (props: ComponentPropsWithoutRef<typeof Popover>) => JSX.Element;
  readonly visible: boolean;
  readonly showPopover: (callback?: (() => void)) => void;
  readonly hidePopover: (callback?: (() => void)) => void;
} {
  const [popover, setPopover] = useState(
    { visible: initial } as { visible: boolean; handleClose?: () => void; handleOpen?: () => void },
  );

  const hidePopover = useCallback(
    (callback?: (() => void)) => { setPopover({ visible: false, handleClose: callback }); },
    [],
  );

  const showPopover = useCallback((callback?: (() => void)) => {
    setPopover({ visible: true, handleOpen: callback });
  }, []);

  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
  const renderPopover = (props: ComponentPropsWithoutRef<typeof Popover>): JSX.Element => (
    <Popover
      // eslint-disable-next-line react/jsx-props-no-spreading -- forwarding props to third party
      {...props}
      isVisible={popover.visible}
      onCloseComplete={popover.handleClose}
      onOpenComplete={popover.handleOpen}
    />
  );

  return {
    renderPopover, visible: popover.visible, showPopover, hidePopover,
  };
}
