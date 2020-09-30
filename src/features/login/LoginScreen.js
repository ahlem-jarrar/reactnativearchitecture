import React from 'react';
import {connect} from 'react-redux';

import {
  Keyboard,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Button,
  StyleSheet,
} from 'react-native';

import {loginUser} from '../login/actions';
import {Formik} from 'formik';
import {setLocale} from 'react-redux-i18n';

const LoginScreen = ({loginUser, changeLanguage, locale}) => {
  var I18n = require('react-redux-i18n').I18n;

  const initialValues = {
    email: '',
    password: '',
  };
  return (
    <KeyboardAvoidingView style={styles.containerView} behavior="padding">
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => loginUser(values)}>
        {({handleSubmit, values, handleBlur, handleChange}) => (
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.loginScreenContainer}>
              <View style={styles.loginFormView}>
                <Text style={styles.logoText}>{I18n.t('LOGIN_TITLE')}</Text>
                <TextInput
                  name="email"
                  fieldName="email"
                  placeholder={I18n.t('EMAIL')}
                  placeholderColor="#c4c3cb"
                  onBlur={handleBlur('email')}
                  style={
                    locale === 'ar'
                      ? styles.loginFormTextInputRTL
                      : styles.loginFormTextInput
                  }
                  onChangeText={handleChange('email')}
                />
                <TextInput
                  // value={values.password}
                  name="password"
                  fieldName="password"
                  placeholder={I18n.t('PASSWORD')}
                  placeholderColor="#c4c3cb"
                  onBlur={handleBlur('password')}
                  style={
                    locale === 'ar'
                      ? styles.loginFormTextInputRTL
                      : styles.loginFormTextInput
                  }
                  secureTextEntry={true}
                  onChangeText={handleChange('password')}
                />
                <Button
                  buttonStyle={styles.loginButton}
                  onPress={handleSubmit}
                  title={I18n.t('VALIDATE')}
                />
                <Button
                  buttonStyle={styles.loginButton}
                  title={I18n.t('CHANGE_LANGUAGE')}
                  onPress={() => changeLanguage('ar')}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        )}
      </Formik>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
  },
  loginScreenContainer: {
    flex: 1,
  },
  logoText: {
    fontSize: 40,
    fontWeight: '800',
    marginTop: 150,
    marginBottom: 30,
    textAlign: 'center',
  },
  loginFormView: {
    flex: 1,
  },
  loginFormTextInput: {
    height: 43,
    fontSize: 14,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#eaeaea',
    backgroundColor: '#fafafa',
    paddingLeft: 10,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 5,
    marginBottom: 5,
    textAlign: 'left',
  },
  loginFormTextInputRTL: {
    height: 43,
    fontSize: 14,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#eaeaea',
    backgroundColor: '#fafafa',
    paddingLeft: 10,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 5,
    marginBottom: 5,
    textAlign: 'right',
  },
  loginButton: {
    backgroundColor: '#3897f1',
    borderRadius: 5,
    height: 45,
    margin: 15,
  },
  fbLoginButton: {
    height: 45,
    marginTop: 10,
    marginLeft: 15,
    marginRight: 15,
    backgroundColor: 'transparent',
  },
});

const mapStateToProps = (state) => ({
  currentUser: state?.auth?.currentUser,
  locale: state.i18n.locale,
});

const mapDispatchToProps = (dispatch) => ({
  loginUser: (payload) => dispatch(loginUser(payload)),
  changeLanguage: (payload) => dispatch(setLocale(payload)),
});
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
