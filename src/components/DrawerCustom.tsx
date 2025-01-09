import AsyncStorage from '@react-native-async-storage/async-storage';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {
  Bookmark2,
  Calendar,
  Logout,
  Message2,
  MessageQuestion,
  Setting2,
  Sms,
  User,
} from 'iconsax-react-native';
import React, {useState} from 'react';
import {
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import appColors from '../constants/appColors';
import {
  authSelector,
  AuthState,
  removeAuth,
} from '../redux/reducers/authReducer';
import {globalStyle} from '../styles/GlobalStyle';
import RowComponent from './RowComponent';
import SpaceComponent from './SpaceComponent';
import TextComponent from './TextComponent';
import {HandleNotification} from '../utils/handleNotification';
import {LoadingModal} from '../modals';

const DrawerCustom = ({navigation}: any) => {
  const [isLoading, setIsLoading] = useState(false);

  const auth: AuthState = useSelector(authSelector);
  
  const dispatch = useDispatch();
  const size = 20;
  const color = appColors.gray;
  const profileMenu = [
    {
      key: 'MyProfile',
      title: 'My Profile',
      icon: <User size={size} color={color} />,
    },
    {
      key: 'Message',
      title: 'Message',
      icon: <Message2 size={size} color={color} />,
    },
    {
      key: 'Calendar',
      title: 'Calendar',
      icon: <Calendar size={size} color={color} />,
    },
    {
      key: 'Bookmark',
      title: 'Bookmark',
      icon: <Bookmark2 size={size} color={color} />,
    },
    {
      key: 'ContactUs',
      title: 'Contact Us',
      icon: <Sms size={size} color={color} />,
    },
    {
      key: 'Settings',
      title: 'Settings',
      icon: <Setting2 size={size} color={color} />,
    },
    {
      key: 'HelpAndFAQs',
      title: 'Help & FAQs',
      icon: <MessageQuestion size={size} color={color} />,
    },
    {
      key: 'SignOut',
      title: 'Sign Out',
      icon: <Logout size={size} color={color} />,
    },
  ];

  const handleSignOut = async () => {
    setIsLoading(true);
    const fcmToken = await AsyncStorage.getItem('fcmToken');
    if (fcmToken) {
      if (auth.fcmTokens && auth.fcmTokens.length > 0) {
        const items = [...auth.fcmTokens];
        const index = auth.fcmTokens.findIndex(e => e === fcmToken);

        if (index !== -1) {
          items.splice(index, 1);
        }
        await HandleNotification.update(auth.id, items);
      }
    }
    await GoogleSignin.signOut();
    await AsyncStorage.clear();
    dispatch(removeAuth());
    setIsLoading(false);
  };

  return (
    <>
      <View style={[localStyle.container]}>
        <TouchableOpacity
          onPress={() => {
            navigation.closeDrawer();
            navigation.navigate('Profile', {
              screen: 'ProfileScreen',
            });
          }}>
          {auth.photoUrl ? (
            <Image source={{uri: auth.photoUrl}} style={[localStyle.avatar]} />
          ) : (
            <Image
              source={require('../assets/images/user.png')}
              style={[localStyle.avatar]}
            />
          )}
          <TextComponent text={auth.fullname} title size={18} />
        </TouchableOpacity>
        <View style={{paddingVertical: 20, flex: 1}}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={profileMenu}
            style={{flex: 1, marginVertical: 20}}
            renderItem={({item, index}) => (
              <RowComponent
                styles={[localStyle.listItem]}
                onPress={
                  item.key === 'SignOut'
                    ? () => handleSignOut()
                    : () => {
                        navigation.closeDrawer();
                      }
                }>
                {item.icon}
                <TextComponent
                  text={item.title}
                  styles={[localStyle.listItemText]}
                />
              </RowComponent>
            )}
          />
        </View>
        <RowComponent justify="flex-start">
          <TouchableOpacity
            style={[globalStyle.button, {backgroundColor: '#00F8FF33'}]}>
            <MaterialCommunityIcons name="crown" size={22} color="#00F8FF" />
            <SpaceComponent width={8} />
            <TextComponent text="Upgrade Pro" color="#00F8FF" />
          </TouchableOpacity>
        </RowComponent>
      </View>
      <LoadingModal visible={isLoading} />
    </>
  );
};

export default DrawerCustom;

const localStyle = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingVertical: StatusBar.currentHeight,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 100,
    marginBottom: 12,
  },
  listItem: {
    paddingVertical: 15,
    justifyContent: 'flex-start',
  },
  listItemText: {
    paddingLeft: 12,
  },
});
