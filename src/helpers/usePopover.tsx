import { useCallback, useState } from 'react';
import Popover from 'react-native-popover-view/dist/Popover';
import type { ComponentPropsWithoutRef } from 'react';

interface PopoverState {
  readonly visible: boolean;
  readonly handleClose?: () => void;
  readonly handleOpen?: () => void;
}

interface UsePopoverReturn {
  readonly renderPopover: (
    // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types -- inferred type for forwarding
    props: ComponentPropsWithoutRef<typeof Popover>,
  ) => JSX.Element;
  readonly visible: boolean;
  readonly showPopover: () => void;
  readonly hidePopover: () => void;
  readonly showPopoverAnd: (callback: () => void) => void;
  readonly hidePopoverAnd: (callback: () => void) => void;
}

export default function usePopover(initial = false): UsePopoverReturn {
  const [popover, setPopover] = useState(
    { visible: initial } as PopoverState,
  );

  const hidePopover = useCallback(() => {
    setPopover({ visible: false });
  }, []);

  const hidePopoverAnd = useCallback((callback: () => void) => {
    setPopover({ visible: false, handleClose: callback });
  }, []);

  const showPopover = useCallback(() => {
    setPopover({ visible: true });
  }, []);

  const showPopoverAnd = useCallback((callback: () => void) => {
    setPopover({ visible: true, handleOpen: callback });
  }, []);

  const renderPopover = (
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
  );

  return {
    renderPopover, visible: popover.visible, showPopover, hidePopover, showPopoverAnd, hidePopoverAnd,
  };
}
