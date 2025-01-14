import {View, Text, ActivityIndicator, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  AvatarComponent,
  ButtonComponent,
  ContainerComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import {useDispatch, useSelector} from 'react-redux';
import {
  addAuth,
  authSelector,
  AuthState,
} from '../../redux/reducers/authReducer';
import userAPI from '../../api/userApi';
import {ProfileModel} from '../../models/ProfileModel';
import {LoadingModal} from '../../modals';
import {appInfo} from '../../constants/appInfo';
import appColors from '../../constants/appColors';
import {globalStyle} from '../../styles/GlobalStyle';
import AboutProfile from './components/AboutProfile';
import EditProfile from './components/EditProfile';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const ProfileScreen = ({navigation, route}: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState<ProfileModel>();
  const [userFollowers, setUserFollowers] = useState([]);
  const [profileId, setProfileId] = useState('');
  const dispatch = useDispatch();
  const auth: AuthState = useSelector(authSelector);

  useEffect(() => {
    if (route.params) {
      const {id} = route.params;

      setProfileId(id);
      if (route.params?.isUpdated) {
        getProfile();
      }
    } else {
      setProfileId(auth.id);
    }
  }, [route.params]);

  useEffect(() => {
    if (profile) {
      dispatch(
        addAuth({
          ...auth,
          fullname: profile.fullname,
          givenName: profile.givenName,
          familyName: profile.familyName,
          photoUrl: profile.photoUrl,
        }),
      );
    }
  }, [profile]);

  useEffect(() => {
    if (profileId) {
      getProfile();
      getFollowersById();
    }
  }, [profileId]);

  const getProfile = async () => {
    setIsLoading(true);
    const api = `/get-profile?uid=${profileId}`;

    try {
      const res = await userAPI.HandleUser(api);

      if (res && res.data) {
        await setProfile(res.data);
      }
      setIsLoading(false);
    } catch (error) {
      console.log('Get profile error:', error);
      setIsLoading(false);
    }
  };

  const getFollowersById = async () => {
    const api = `/get-followers?uid=${profileId}`;
    try {
      const res = await userAPI.HandleUser(api);
      if (res) {
        setUserFollowers(res.data);
      }
    } catch (error) {
      console.log('Get Followers Error:', error);
    }
  };
  return (
    <>
      <ContainerComponent
        isScroll
        back
        title={route.params ? '' : 'Profile'}
        right={
          <ButtonComponent
            icon={<MaterialIcons name="more-vert" size={22} />}
            onPress={() => {}}
          />
        }
        // onBack={() => navigation.navigate('Explore')}
      >
        {profile ? (
          <>
            <SectionComponent styles={[globalStyle.center]}>
              <RowComponent>
                <AvatarComponent
                  photoUrl={profile.photoUrl}
                  name={profile.fullname ? profile.fullname : profile.email}
                  size={120}
                />
              </RowComponent>
              <SpaceComponent height={16} />
              <TextComponent
                text={profile.fullname ? profile.fullname : profile.email}
                title
                size={24}
              />
              <SpaceComponent height={16} />
              <RowComponent>
                <View style={[globalStyle.center, {flex: 1}]}>
                  <TextComponent
                    title
                    text={`${profile.following.length}`}
                    size={18}
                  />
                  <SpaceComponent height={6}/>
                  <TextComponent text="Following" size={18} />
                </View>
                <View
                  style={{
                    backgroundColor: appColors.gray2,
                    width: 1,
                    height: '100%',
                  }}
                />
                <View style={[globalStyle.center, {flex: 1}]}>
                  <TextComponent
                    title
                    text={`${userFollowers.length}`}
                    size={18}
                  />
                  <SpaceComponent height={6}/>
                  <TextComponent text="Follower" size={18} />
                </View>
              </RowComponent>
            </SectionComponent>
            {auth.id !== profileId ? (
              <AboutProfile profile={profile}/>
            ) : (
              <EditProfile profile={profile} />
            )}
          </>
        ) : (
          <Image
            source={require('../../assets/images/profile_not_found.jpg')}
            style={{
              resizeMode: 'contain',
              width: appInfo.sizes.WIDTH,
              height: appInfo.sizes.HEIGHT * 0.7,
            }}
          />
        )}
      </ContainerComponent>
      <LoadingModal visible={isLoading} />
    </>
  );
};

export default ProfileScreen;
