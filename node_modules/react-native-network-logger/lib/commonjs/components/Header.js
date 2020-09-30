"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactNative = require("react-native");

var _theme = require("../theme");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Header = ({
  children,
  shareContent
}) => {
  const styles = (0, _theme.useThemedStyles)(themedStyles);
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.container
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.header,
    accessibilityRole: "header",
    testID: "header-text"
  }, children), !!shareContent && /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    testID: "header-share",
    accessibilityLabel: "Share",
    accessibilityRole: "button",
    onPress: () => {
      _reactNative.Share.share({
        message: shareContent
      });
    }
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
    source: require('./share.png'),
    resizeMode: "contain",
    style: styles.shareIcon
  })));
};

const themedStyles = theme => _reactNative.StyleSheet.create({
  header: {
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 10,
    marginBottom: 5,
    marginHorizontal: 10,
    color: theme.colors.text
  },
  shareIcon: {
    width: 24,
    height: 24,
    marginRight: 10
  },
  container: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center'
  }
});

var _default = Header;
exports.default = _default;
//# sourceMappingURL=Header.js.map