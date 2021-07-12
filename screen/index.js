
//import liraries
import React, { Component } from 'react';

import {
  View,
  Text,
  Image,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';
import styles from './style';
import { vw, vh } from '../../common/ViewportUnits';
import Colors from '../../common/Colors';
import PageContainer from './../../Components/PageContainer/index';
import refreshFill1 from './../../assets/icons/refreshFill1.png';
import heartPulseFill1 from './../../assets/icons/heartPulseFill1.png';
import medalFill from './../../assets/icons/medalFill.png';
import chatSmile3Fill from './../../assets/icons/chatSmile3Fill.png';
import book2Fill1 from './../../assets/icons/book2Fill1.png';
import gift2Fill from './../../assets/icons/gift2Fill.png';
import ballPenFill from './../../assets/icons/ballPenFill.png';
import handHeartFill1 from './../../assets/icons/handHeartFill1.png';
import surveyFill1 from './../../assets/icons/surveyFill1.png';
import cameraLensFill1 from './../../assets/icons/cameraLensFill1.png';
import userSettingsFill from './../../assets/icons/userSettingsFill.png';
import emergencyFill1 from './../../assets/icons/emergencyFill1.png';
import CustomModal from '../../Components/CustomModal';
import Button from '../../Components/Button';
import EmojiPage from '../EmojiPage';
import { ENUM_MOOD_HAPPY, StaticString, USER_DATA, CURRENT_LANGUAGE } from '../../utility/index';
import { connect } from 'react-redux';
import { updateTodaysMood, clearError } from '../../store/actions/homeAction';
import Loader from '../../helper/loader';
import { Utils } from '../../utility/index';
import AsyncStorage from '@react-native-community/async-storage';
import questionAnswerFill1Dark from '../../assets/icons/questionAnswerFill1Dark.png';
import filePaper2Fill from '../../assets/icons/filePaper2Fill.png';
import videoChatFill from '../../assets/icons/videoChatFill.png';
import handHeartFill1Dark from '../../assets/icons/handHeartFill1Dark.png';
import logoutBoxFill from '../../assets/icons/logoutBoxFill.png';
import Layer from '../../assets/icons/Layer.png';
import Fonts from '../../common/Fonts';
import RNRestart from 'react-native-restart';
import I18n, { strings } from '../../i18n/i18n';
import { logout } from '../../store/actions/userAction';

const DATA = [
  {
    id: '1',
    title: 'updates',
    source: refreshFill1,
    onPress: 'Updates',
  },
  {
    id: '2',
    title: 'howAreYouToday',
    source: heartPulseFill1,
    onPress: 'How Are You Today?',
  },
  {
    id: '3',
    title: 'employeeAward',
    source: medalFill,
    onPress: 'Award',
  },
  {
    id: '4',
    title: 'askCXO',
    source: chatSmile3Fill,
    onPress: 'AskCXO',
  },
  {
    id: '5',
    title: 'myLearning',
    source: book2Fill1,
    onPress: 'MyLearning',
  },
  {
    id: '6',
    title: 'myBenifits',
    source: gift2Fill,
    onPress: 'MyBenefits',
  },
  {
    id: '7',
    title: 'myJournal',
    source: ballPenFill,
    onPress: 'MyJournal',
  },
  {
    id: '8',
    title: 'yana',
    source: handHeartFill1,
    onPress: 'YanaScreen',
  },
  {
    id: '9',
    title: 'survey',
    source: surveyFill1,
    onPress: 'SurveyPage',
  },
  {
    id: '10',
    title: 'watermark',
    source: cameraLensFill1,
    onPress: 'Watermark',
  },
  {
    id: '11',
    title: 'nurture',
    source: handHeartFill1Dark,
    onPress: 'InsightPage',
  },
  {
    id: '12',
    title: 'emergency',
    source: emergencyFill1,
    onPress: '1 Item',
  },
  {
    id: '13',
    title: 'trainingFeedback',
    source: questionAnswerFill1Dark,
    onPress: 'TrainingFeedback',
  },
  {
    id: '14',
    title: 'letterRequest',
    source: filePaper2Fill,
    onPress: 'LetterRequest',
  },
  {
    id: '15',
    title: 'meetingMinute',
    source: videoChatFill,
    onPress: 'MeetingMiuntes',
  },
  {
    id: '16',
    title: 'leaderShipTools',
    source: userSettingsFill,
    onPress: '1 Item',
  },
  {
    id: '17',
    title: 'selectLanguage',
    source: Layer,
    onPress: 'InsightPage',
  },
  {
    id: '18',
    title: 'logout',
    source: logoutBoxFill,
    onPress: '',
  },
];

const language = [
  {
    id: '1',
    code: 'en',
    name: 'English' //English
  },
  {
    id: '2',
    code: 'hi',
    name: 'हिंदी' //Hindi
  }, {
    id: '3',
    code: 'gu',
    name: 'ગુજરાતી' //gujarati
  }, {
    id: '4',
    code: 'ta',
    name: 'તામિલ' //Tamil
  }, {
    id: '5',
    code: 'bn',
    name: 'বাংলা' //Bengali
  }, {
    id: '6',
    code: 'mr',
    name: 'मराठी' //Marathi
  }, {
    id: '7',
    code: 'kn',
    name: 'ಕನ್ನಡ' //Kannada
  }, {
    id: '8',
    code: 'te',
    name: 'તેલુગુ' //Telugu
  }, {
    id: '9',
    code: 'ml',
    name: 'മലയാളം' //Malayalam
  }
]


let token = '';

class HomeRHS extends Component {

  constructor(props) {
    super(props);
    this.state = {
      status: false,
      isTermsChecked: false,
      isModalVisible: false,
      onSubmit: false,
      moodType: '',
      showLanguageModal: false,
      selectLanguage: '',
      index: ''
    };

  }



  onSubmit = (enumType) => {
    this.setState({ onSubmit: true, moodType: enumType }, () => {
      console.log('moodType' + this.state.moodType);
    });
  };

  toggleModal = () => {
    console.log(
      'this.props.homeData.rhs' + JSON.stringify(this.props.homeData.rhs),
    );
    this.setState({
      moodType:
        this.props.homeData.rhs != undefined
          ? this.props.homeData.rhs.mood
          : '',
    });
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };



  handleOnPress(id) {
    if (id === '8') {
      this.props.navigation.navigation.navigate('YanaScreen');
    } else if (id === '2') {
      this.toggleModal();
    } else if (id === '1') {
      this.props.navigation.navigation.navigate('Updates');
    } else if (id === '7') {
      this.props.navigation.navigation.navigate('MyJournal');
    } else if (id == '4') {
      this.props.navigation.navigation.navigate('AskCXO');
    } else if (id == '5') {
      this.props.navigation.navigation.navigate('MyLearning');
    } else if (id == '6') {
      this.props.navigation.navigation.navigate('MyBenefits');
    } else if (id == '3') {
      this.props.navigation.navigation.navigate('Award');
    } else if (id == '9') {
      this.props.navigation.navigation.navigate('SurveyPage');
    } else if (id == '10') {
      this.props.navigation.navigation.navigate('Watermark');
    } else if (id == '12') {
      this.props.navigation.navigation.navigate('Emergency');
    } else if (id == '13') {
      this.props.navigation.navigation.navigate('TrainingFeedback');
    } else if (id == '14') {
      this.props.navigation.navigation.navigate('LetterRequest');
    } else if (id == '15') {
      this.props.navigation.navigation.navigate('MeetingMiuntes');
    } else if (id == '11') {
      this.props.navigation.navigation.navigate('InsightPage');
    } else if (id == '17') {
      this.setState({ showLanguageModal: true })
    } else if (id == '18') {
      Utils.alertConfirm(`${strings('logoutText')}`, () => {
        this.props.logout(token);
      });
    } else if (id == '16') {
      if (!global.isLeader) {
        Utils.alertOK(`${strings('leaderAccesible')}`, () => {
        })
      } else {
        this.props.navigation.navigation.navigate('LeadershipTools');
      }
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.logoutMessage != this.props.logoutMessage) {
      this.props.navigation.navigation.reset({
        index: 0,
        routes: [{ name: 'Auth' }],
      });
    }
  }

  async componentDidMount() {
    const asyncUser = await AsyncStorage.getItem(USER_DATA);
    if (asyncUser !== null) {
      let userJson = JSON.parse(asyncUser);
      token = userJson.token;
    }
  }

  onSubmitPress() {
    if (this.state.moodType == '') {
      Utils.alertOK(`${strings('errMoodType')}`, () => {
        this.props.homeData.rhs.mood;
      });
    } else {
      this.props.updateTodaysMood(
        {
          feeling:
            this.state.moodType == '' ? ENUM_MOOD_HAPPY : this.state.moodType,
          offset: new Date().getTimezoneOffset(),
        },
        token,
      );
      this.props.homeData.rhs.mood = this.state.moodType;
    }
  }


  renderItem = (item) => {
    return (
      <View style={styles.itemStyle}>
        <TouchableOpacity
          onPress={() => { this.handleOnPress(item.id) }}>
          <View style={styles.itemInnerStyle}>
            <Image
              style={styles.itemIconStyle}
              source={item.source}
              resizeMode="contain"
            />
            <Text numberOfLines={2} style={styles.itemTextStyle}>{`${strings(`${item.title}`)}`}</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }


  setLanguage = (item) => {
    this.setState({ selectLanguage: item.code });
    this.props.navigation.navigation.setOptions({
      title: `${strings('home')}`,
    })
    I18n.locale = item.code
    AsyncStorage.setItem(CURRENT_LANGUAGE, item.code);
    //  RNRestart.Restart()

  }

  render() {
    const { navigation } = this.props;
    const { main, headingTextStyle } = styles;
    console.log(this.state)
    let currentLanguage = AsyncStorage.getItem(CURRENT_LANGUAGE);
    console.log('currentLanguage', currentLanguage)
    return (
      <>
        <View style={main}>
          {this.props.loading && <Loader />}

          {this.props.homeUpdateMoodError
            ? Utils.alertOK(this.props.homeUpdateMoodError, () => {
              this.props.clearError();
              this.setState({ moodType: '' });
            })
            : null}

          {this.props.homeUpdateMoodMessage
            ? Utils.alertOK(this.props.homeUpdateMoodMessage, () => {
              this.props.clearError();
              this.toggleModal();
            })
            : null}

          <PageContainer
            keyboardAvoiding={false}
            viewEnabled={true}
            safeAreaTop={true}
            padding={vw(16)}>
            <FlatList
              ListHeaderComponent={
                <Text style={headingTextStyle}>{`${strings('shortcuts')}`}</Text>
              }
              data={DATA}
              renderItem={({ item }) => this.renderItem(item)}
              keyExtractor={(item, index) => 'key' + index}
              numColumns={3}
            />
          </PageContainer>
        </View>

        <Modal
          testID={'modal'}
          isVisible={this.state.showLanguageModal}
        //  onBackdropPress={() => this.setState({ showLanguageModal: false })}
        >
          <View>
            <View style={{ backgroundColor: '#696969', alignItems: 'center', justifyContent: 'center', paddingVertical: 30, }}>
              <Text style={{ color: 'white', fontFamily: Fonts.medium, fontSize: vw(20) }}>{`${strings('pleaseSelectLanguage')}`}</Text>

            </View>
            <View style={{ backgroundColor: 'white', }}>
              <FlatList
                data={language}
                bounces={false}
                renderItem={({ item, index }) => {
                  return (
                    <TouchableOpacity style={{
                      borderBottomColor: Colors.gray,
                      borderBottomWidth: 0.6,
                      borderBottomColor:'#E0E0E0',
                      paddingVertical: vh(10),
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: (this.state.selectLanguage && this.state.index == index) || this.state.index == index && currentLanguage ? '#E0E0E0' : 'white'
                    }} onPress={() => this.setState({ index: index }, () => this.setLanguage(item))}>
                      <Text style={{ color: Colors.black, fontFamily: Fonts.regluar, fontSize: vw(15) }}>{item.name}</Text>
                    </TouchableOpacity>
                  )
                }}
              />
              <TouchableOpacity style={{
                borderRadius: vw(30), marginVertical: 20,
                backgroundColor: this.state.selectLanguage || currentLanguage ? 'black' : '#E0E0E0', alignSelf: 'center', alignItems: 'center',
                justifyContent: 'center', width: vw(80), height: vh(35)
              }} disabled={this.state.selectLanguage || currentLanguage ? false : true} onPress={() => this.setState({ showLanguageModal: false })}>
                <Text style={{ color: 'white' }}>Ok</Text>
              </TouchableOpacity>
            </View>

          </View>

        </Modal>

        <CustomModal
          isVisible={this.state.isModalVisible}
          onPress={this.toggleModal}
          headingText={`${strings('howYouFeelingToday')}`}>
          <View>
            <View
              style={{ maxHeight: Dimensions.get('window').height - vh(200) }}>
              <EmojiPage
                moodType={
                  this.state.moodType == ''
                    ? this.props.homeData.rhs != undefined
                      ? this.props.homeData.rhs.mood
                      : ENUM_MOOD_HAPPY
                    : this.state.moodType
                }
                parentMethod={(enumType) => this.onSubmit(enumType)}
              />
            </View>
            <View style={{}}>
              <Button
                text={`${strings('submit')}`}
                bgColor={Colors.black}
                height={vh(48)}
                textColor={Colors.whiteFour}
                borderColor={Colors.whiteFour}
                borderRadius={vw(6)}
                fontSize={vw(14)}
                fontFamily={true}
                onPress={() => this.onSubmitPress()}
              />
            </View>
          </View>
        </CustomModal>
      </>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    homeData: state.homeReducers.homeData,
    loading: state.homeReducers.loading,
    homeUpdateMoodError: state.homeReducers.homeUpdateMoodError,
    homeUpdateMoodMessage: state.homeReducers.homeUpdateMoodMessage,
    logoutMessage: state.userDetailReducers.logoutMessage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateTodaysMood: (data, token) => dispatch(updateTodaysMood(data, token)),
    clearError: () => dispatch(clearError()),
    logout: (token) => dispatch(logout(token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeRHS);

