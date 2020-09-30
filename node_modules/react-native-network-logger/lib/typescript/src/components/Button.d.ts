import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
interface Props {
    children: string;
    fullWidth?: boolean;
    onPress: () => void;
    style?: StyleProp<ViewStyle>;
}
declare const Button: React.FC<Props>;
export default Button;
