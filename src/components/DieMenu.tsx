import { Die } from './Die';
import { Text } from 'react-native';
import { PropsWithChildren } from 'react';

type DieMenuProps = PropsWithChildren<{
    die: Die
}>

const DieMenu = ({die, children}: DieMenuProps) => {
    return (<Text />);
};

export default DieMenu;