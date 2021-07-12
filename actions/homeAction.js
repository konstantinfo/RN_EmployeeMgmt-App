import * as actionTypes from './actionType';
import Axios from '../../helper/axios';
import { StaticString } from '../../utility/StaticString';
import I18n, { strings } from '../../i18n/i18n'
import { Alert, Linking } from 'react-native';
import { AUTHORIZATION, NOTIFICATION, WEATHER_URL } from '../../utility';
import AsyncStorage from '@react-native-community/async-storage';

export const isLoading = () => {
  return {
    type: actionTypes.ISLOADING,
  };
};

export const Success = (response) => {
  return response;
};

export const HomeFail = (error) => {
  return {
    type: actionTypes.HOMEERROR,
    error: error,
  };
};

export const HomeWeatherFail = (error) => {
  return {
    type: actionTypes.HOMEWEATHERERROR,
    error: error,
  };
};

export const HomeUpdateMoodFail = (error) => {
  return {
    type: actionTypes.HOMEUPDATEMOODERROR,
    error: error,
  };
};

// Handle Home screen data.
export const getHomeData = (data, token) => {
  console.log('Data to send:', data + ' :  token :   ' + token);
  return async (dispatch) => {
    dispatch(isLoading());
    Axios.defaults.headers.common[AUTHORIZATION] = token;
    Axios.get('home/' + data)
      .then((response) => {
        console.log('Response home:', response.data);
        console.log('Response status:', response.status);

        if (response.status === 200 && response.data.success === true) {
          let notification = response.data.data.notifications;
          console.log('notification==', notification);
          AsyncStorage.setItem(NOTIFICATION, JSON.stringify(notification));
          dispatch(
            Success({
              type: actionTypes.HOMEDATA,
              payload: response.data.data,
            }),
          );
        } else {
          dispatch(
            HomeFail(
              response.data.message
                ? response.data.message
                : `${strings('couldNotFetchData')}`,
            ),
          );
        }
      })
      .catch((err) => {
        console.log('Response err home:', err.response);
        if (err.response) {
          if (err.response.status == 440) {
            dispatch(
              HomeFail(
                440
              ),
            );
          } else {
            dispatch(
              HomeFail(
                err.response.data.message
                  ? err.response.data.message
                  : `${strings('couldNotFetchData')}`,
              ),
            );
          }

        } else {
          dispatch(
            HomeFail(
              err.message ? err.message : `${strings('couldNotFetchData')}`,
            ),
          );
        }
      });
  };
};

// Handle Home screen data.
export const getWeatherData = () => {
  // console.log("Data to send:", data)
  return async (dispatch) => {
    //  dispatch(isLoading());
    Axios.get(WEATHER_URL)
      .then((response) => {
        console.log('Response weather:', response.data.list);
        dispatch(
          Success({
            type: actionTypes.HOMEWEATHERDATA,
            payload: response.data.list,
          }),
        );
      })
      .catch((err) => {
        console.log('Response weather err:', err);
        if (err.response) {
          dispatch(
            HomeWeatherFail(
              err.response.data.message
                ? err.response.data.message
                : `${strings('couldNotFetchData')}`,
            ),
          );
        } else {
          dispatch(
            HomeWeatherFail(
              err.message ? err.message : `${strings('couldNotFetchData')}`,
            ),
          );
        }
      });
  };
};

// Handle Home screen data.
export const updateTodaysMood = (data, token) => {
  console.log('Data to send:', data);
  return async (dispatch) => {
    dispatch(isLoading());
    Axios.defaults.headers.common[AUTHORIZATION] = token;
    Axios.post('feelingToday', data)
      .then((response) => {
        console.log('Response:', response.data);
        dispatch(
          Success({
            type: actionTypes.HOMEUPDATEMOOD,
            payload: response.data.message,
          }),
        );
      })
      .catch((err) => {
        console.log('Response err:', err);
        if (err.response) {
          dispatch(
            HomeUpdateMoodFail(
              err.response.data.message
                ? err.response.data.message
                : `${strings('couldNotFetchData')}`,
            ),
          );
        } else {
          dispatch(
            HomeUpdateMoodFail(
              err.message ? err.message : `${strings('couldNotFetchData')}`,
            ),
          );
        }
      });
  };
};

export const callNumber = (phone = '') => {
  console.log('callNumber ----> ', phone);
  return (dispatch) => {
    let phoneNumber = phone;
    if (Platform.OS !== 'android') {
      phoneNumber = `telprompt:${phone}`;
    } else {
      phoneNumber = `tel:${phone}`;
    }
    Linking.canOpenURL(phoneNumber)
      .then((supported) => {
        if (!supported) {
          Alert.alert(`${strings('phnNotAvailable')}`);
        } else {
          return Linking.openURL(phoneNumber);
        }
      })
      .catch((err) => console.log(err));
  };
};

// Clear error
export const clearError = () => {
  return (dispatch) => {
    dispatch(
      Success({
        type: actionTypes.CLEARERROR,
      }),
    );
  };
};
