"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBackHandler = exports.backHandlerSet = exports.setBackHandler = void 0;
let appBackHandler;
let networkLoggerBackHandler;

const setBackHandler = backHandler => {
  networkLoggerBackHandler = backHandler;
};

exports.setBackHandler = setBackHandler;

const goBack = () => {
  var _appBackHandler;

  if (networkLoggerBackHandler) {
    return networkLoggerBackHandler();
  }

  (_appBackHandler = appBackHandler) === null || _appBackHandler === void 0 ? void 0 : _appBackHandler();
};

const backHandlerSet = () => {
  return !!appBackHandler;
};
/**
 * Get a replacement back handler to use instead of your default navigation so you
 * can use your existing back button to navigate inside the network logger.
 *
 * If navigation has occurred in the logger app then pressing your back handler will
 * navigate internally. If it is already on the default page then it will call your
 * original back handler.
 *
 * e.g.
 *
 * const navigation = useNavigation()
 *
 * const onBack = getBackHandler(navigation.goBack)
 *
 * <Button onPress={onBack} title="Go back" />
 *
 * @param backHandler App navigation default back handler
 */


exports.backHandlerSet = backHandlerSet;

const getBackHandler = backHandler => {
  appBackHandler = backHandler;
  return goBack;
};

exports.getBackHandler = getBackHandler;
//# sourceMappingURL=backHandler.js.map