import { useCallback, useState } from 'react';
import Popover from 'react-native-popover-view/dist/Popover';
import type { ComponentPropsWithoutRef } from 'react';

interface PopoverState {
  readonly handleClose?: () => void;
  readonly handleOpen?: () => void;
  readonly visible: boolean;
}

interface UsePopoverReturn {
  readonly hidePopover: () => void;
  readonly hidePopoverAnd: (callback: () => void) => void;
  readonly renderPopover: (
    // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types -- inferred type for forwarding
    props: ComponentPropsWithoutRef<typeof Popover>,
  ) => JSX.Element;
  readonly showPopover: () => void;
  readonly showPopoverAnd: (callback: () => void) => void;
  readonly visible: boolean;
}

export default function usePopover(initial = false): UsePopoverReturn {
  const [popover, setPopover] = useState(
    { visible: initial } as PopoverState,
  );

  const hidePopover = useCallback(() => {
    setPopover({ visible: false });
  }, []);

  const hidePopoverAnd = useCallback((callback: () => void) => {
    setPopover({ handleClose: callback, visible: false });
  }, []);

  const showPopover = useCallback(() => {
    setPopover({ visible: true });
  }, []);

  const showPopoverAnd = useCallback((callback: () => void) => {
    setPopover({ handleOpen: callback, visible: true });
  }, []);

  // This really should be a HOC, but this 3rd party class does some weird garbage
  // about looking at its parent. Very non-React.
  const renderPopover = useCallback((
    // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types -- inferred type for forwarding
    props: ComponentPropsWithoutRef<typeof Popover>,
  ): JSX.Element => (
    <Popover
      // eslint-disable-next-line react/jsx-props-no-spreading -- forwarding props to third party
      {...props}
      isVisible={popover.visible}
      onCloseComplete={popover.handleClose}
      onOpenComplete={popover.handleOpen}
    />
  ), [popover]);

  return {
    hidePopover, hidePopoverAnd, renderPopover, showPopover, showPopoverAnd, visible: popover.visible,
  };
}
