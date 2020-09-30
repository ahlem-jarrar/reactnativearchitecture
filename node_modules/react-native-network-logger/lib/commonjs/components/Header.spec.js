"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactNative = require("@testing-library/react-native");

var _Header = _interopRequireDefault(require("./Header"));

var _reactNative2 = require("react-native");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.mock('react-native/Libraries/Share/Share', () => ({
  share: jest.fn()
}));
jest.mock('react-native/Libraries/Components/Touchable/TouchableOpacity', () => 'TouchableOpacity');
test('it renders header correctly', () => {
  const {
    getByTestId,
    queryByTestId
  } = (0, _reactNative.render)( /*#__PURE__*/_react.default.createElement(_Header.default, null, "My Title"));
  expect(getByTestId('header-text').props.children).toEqual('My Title');
  expect(queryByTestId('header-share')).toBeNull();
});
test('share button renders when provided with value', async () => {
  const {
    getByTestId
  } = (0, _reactNative.render)( /*#__PURE__*/_react.default.createElement(_Header.default, {
    shareContent: "share me"
  }, "My Title"));
  expect(getByTestId('header-text').props.children).toEqual('My Title');
  expect(getByTestId('header-share')).toBeDefined();
  (0, _reactNative.act)(() => {
    _reactNative.fireEvent.press(getByTestId('header-share'));
  });
  expect(_reactNative2.Share.share).toHaveBeenCalledWith({
    message: 'share me'
  });
});
test("share button doesn't render if content is empty string", async () => {
  const {
    getByTestId,
    queryByTestId
  } = (0, _reactNative.render)( /*#__PURE__*/_react.default.createElement(_Header.default, {
    shareContent: ""
  }, "My Title"));
  expect(getByTestId('header-text').props.children).toEqual('My Title');
  expect(queryByTestId('header-share')).toBeNull();
});
//# sourceMappingURL=Header.spec.js.map