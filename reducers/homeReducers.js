import * as actionTypes from '../actions/actionType';

const initialState = {
  loading: false,
  homeError: null,
  homeMessage: null,
  homeWeatherError: null,
  homeWeatherMessage: null,
  homeUpdateMoodError: null,
  homeUpdateMoodMessage: null,
  homeData: {},
  weatherData: [],
};

const homeReducers = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ISLOADING:
      return {
        ...state,
        homeError: null,
        homeWeatherError: null,
        homeUpdateMoodError: null,
        loading: true,
      };

    case actionTypes.HOMEERROR:
      return {
        ...state,
        homeError: action.error,
        homeMessage: null,
        loading: false,
      };

    case actionTypes.HOMEWEATHERERROR:
      return {
        ...state,
        homeWeatherError: action.error,
        homeWeatherMessage: null,
        loading: false,
      };

    case actionTypes.HOMEUPDATEMOODERROR:
      return {
        ...state,
        homeUpdateMoodError: action.error,
        homeUpdateMoodMessage: null,
        loading: false,
      };

    case actionTypes.CLEARERROR:
      return {
        ...state,
        homeMessage: null,
        homeUpdateMoodError: null,
        homeUpdateMoodMessage: null,
        homeWeatherMessage: null,
        homeWeatherError: null,
        homeError: null,
        loading: false,
      };

    case actionTypes.HOMEDATA:
      return {
        ...state,
        homeData: action.payload,
        homeError: null,
        homeMessage: null,
        loading: false,
      };

    case actionTypes.HOMEWEATHERDATA:
      return {
        ...state,
        weatherData: action.payload,
        homeWeatherError: null,
        homeWeatherMessage: null,
        // loading: false,
      };

    case actionTypes.HOMEUPDATEMOOD:
      return {
        ...state,
        homeUpdateMoodError: null,
        homeUpdateMoodMessage: action.payload,
        loading: false,
      };

    case actionTypes.HOMEUPDATEMOODERROR:
      return {
        ...state,
        homeUpdateMoodError: action.error,
        homeUpdateMoodMessage: null,
        loading: false,
      };

    default:
      return state;
  }
};
export default homeReducers;
