import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {connect} from 'react-redux';


const Loader = ({isLoading}) => (
  <View>
    <ActivityIndicator animating={isLoading} size="large" color="#00ff00" />
  </View>
);
const mapStateToProps = (state) => ({
  isLoading: state.loader.loaderState,
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});
export default connect(mapStateToProps)(Loader);
