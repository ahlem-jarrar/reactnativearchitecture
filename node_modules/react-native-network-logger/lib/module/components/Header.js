import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Share, Image } from 'react-native';
import { useThemedStyles } from '../theme';

const Header = ({
  children,
  shareContent
}) => {
  const styles = useThemedStyles(themedStyles);
  return /*#__PURE__*/React.createElement(View, {
    style: styles.container
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.header,
    accessibilityRole: "header",
    testID: "header-text"
  }, children), !!shareContent && /*#__PURE__*/React.createElement(TouchableOpacity, {
    testID: "header-share",
    accessibilityLabel: "Share",
    accessibilityRole: "button",
    onPress: () => {
      Share.share({
        message: shareContent
      });
    }
  }, /*#__PURE__*/React.createElement(Image, {
    source: require('./share.png'),
    resizeMode: "contain",
    style: styles.shareIcon
  })));
};

const themedStyles = theme => StyleSheet.create({
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

export default Header;
//# sourceMappingURL=Header.js.map