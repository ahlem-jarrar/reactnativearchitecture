import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useThemedStyles } from '../theme';

const Button = ({
  children,
  fullWidth,
  style,
  onPress
}) => {
  const styles = useThemedStyles(themedStyles);
  return /*#__PURE__*/React.createElement(TouchableOpacity, {
    accessibilityRole: "button",
    onPress: onPress,
    style: style
  }, /*#__PURE__*/React.createElement(Text, {
    style: [styles.button, fullWidth && styles.fullWidth]
  }, children));
};

const themedStyles = theme => StyleSheet.create({
  button: {
    color: theme.colors.link,
    fontSize: 18,
    padding: 10,
    alignSelf: 'flex-start'
  },
  fullWidth: {
    alignSelf: 'center'
  }
});

export default Button;
//# sourceMappingURL=Button.js.map