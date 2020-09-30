"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactNative = require("react-native");

var _theme = require("../theme");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Button = ({
  children,
  fullWidth,
  style,
  onPress
}) => {
  const styles = (0, _theme.useThemedStyles)(themedStyles);
  return /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    accessibilityRole: "button",
    onPress: onPress,
    style: style
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: [styles.button, fullWidth && styles.fullWidth]
  }, children));
};

const themedStyles = theme => _reactNative.StyleSheet.create({
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

var _default = Button;
exports.default = _default;
//# sourceMappingURL=Button.js.map