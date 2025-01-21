import { ArrowLeft, ArrowRight, Calendar, Location } from 'iconsax-react-native';
import React, { useEffect, useState } from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import eventAPI from '../../api/eventApi';
import userAPI from '../../api/userApi';
import {
  AvatarGroup,
  ButtonComponent,
  CardComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TabBarComponent,
  TagComponent,
  TextComponent,
} from '../../components';
import appColors from '../../constants/appColors';
import { appInfo } from '../../constants/appInfo';
import { fontFamily } from '../../constants/fontFamily';
import { LoadingModal, ModalInvite } from '../../modals';
import { EventModel } from '../../models/EventModel';
import { ProfileModel } from '../../models/ProfileModel';
import {
  authSelector,
  AuthState,
  updateFollowing,
} from '../../redux/reducers/authReducer';
import { globalStyle } from '../../styles/GlobalStyle';
import { UserHandle } from '../../utils/UserHandler';
import { DateTime } from '../../utils/datetime';

const EventDetail = ({navigation, route}: any) => {
  const {id}: {id: string} = route.params;
  const auth: AuthState = useSelector(authSelector);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [followers, setFollowers] = useState<string[]>([]);
  const [profile, setProfile] = useState<ProfileModel>();
  const [isVisibleModelInvite, setIsVisibleModelInvite] = useState(false);
  const [item, setItem] = useState<EventModel>();

  useEffect(() => {
    if (id) {
      getEventById(id);
      getFollowersById();
    }
  }, [id]);

  useEffect(() => {
    if (item) {
      getProfile(item.authorId);
    }
  }, [item]);

  const getEventById = async (id: string) => {
    setIsLoading(true);
    const api = `/get-event?id=${id}`;
    try {
      const res = await eventAPI.HandleEvent(api);
      if (res) {
        await setItem(res.data);
      }
      setIsLoading(false);
    } catch (error) {
      console.log('Get Event Error:', error);
      setIsLoading(false);
    }
  };
  const getFollowersById = async () => {
    const api = `/get-followers?id=${id}`;
    try {
      const res = await eventAPI.HandleEvent(api);
      if (res && res.data) {
        setFollowers(res.data);
      }
    } catch (error) {
      console.log('Get followers error:', error);
    }
  };

  const getProfile = async (id: string) => {
    setIsLoading(true);
    const api = `/get-profile?uid=${id}`;

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

  const handleFollower = () => {
    const items = [...followers];

    if (items.includes(auth.id)) {
      const index = items.findIndex(element => element === auth.id);
      if (index !== -1) {
        items.splice(index, 1);
      }
    } else {
      items.push(auth.id);
    }
    setFollowers(items);
    handleUpdateFollowers(items);
  };

  const handleUpdateFollowers = async (data: string[]) => {
    setIsLoading(true);

    const api = '/update-followers';
    try {
      await eventAPI.HandleEvent(
        api,
        {
          id: id,
          followers: data,
        },
        'post',
      );
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log('Update followers error:', error);
    }
    UserHandle.getFollowedEventById(auth.id, dispatch);
  };

  const handleToggleFollowing = async (id: string) => {
    setIsLoading(true);
    const api = `/update-following`;
    try {
      const res = await userAPI.HandleUser(
        api,
        {
          uid: auth.id,
          authorId: id,
        },
        'post',
      );
      await dispatch(updateFollowing(res.data));
      setIsLoading(false);
    } catch (error) {
      console.log('Update following error:', error);
      setIsLoading(false);
    }
  };

  return (
    <>
      {item && (
        <View style={{flex: 1, backgroundColor: appColors.white}}>
          <ImageBackground
            source={{uri: item.photoUrl}}
            imageStyle={{
              flex: 1,
              resizeMode: 'cover',
              height: 244,
              width: appInfo.sizes.WIDTH,
            }}>
            <LinearGradient colors={['rgba(0,0,0,0.5)', 'rgba(0,0,0,0)']}>
              <RowComponent
                justify="space-between"
                styles={{
                  paddingHorizontal: 16,
                  paddingTop: 40,
                }}>
                <RowComponent>
                  <TouchableOpacity onPress={() => navigation.goBack()}>
                    <ArrowLeft size={24} color={appColors.white} />
                  </TouchableOpacity>
                  <SpaceComponent width={10} />
                  <TextComponent
                    text="Event Details"
                    size={20}
                    title
                    color={appColors.white}
                  />
                </RowComponent>
                <CardComponent
                  onPress={handleFollower}
                  styles={[globalStyle.noSpaceCard, {width: 40, height: 40}]}
                  color={
                    auth.follow_events &&
                    auth.follow_events.includes(item._id ?? '')
                      ? '#ffffffB3'
                      : '#ffffff4D'
                  }>
                  <FontAwesome
                    name="bookmark"
                    size={16}
                    color={
                      auth.follow_events &&
                      auth.follow_events.includes(item._id ?? '')
                        ? appColors.danger2
                        : appColors.white
                    }
                  />
                </CardComponent>
              </RowComponent>
            </LinearGradient>
          </ImageBackground>
          <SectionComponent
            styles={{
              alignItems: 'center',
              marginTop: 244 - 115,
            }}>
            {item.users.length > 0 ? (
              <RowComponent
                styles={[
                  globalStyle.shadow,
                  {
                    backgroundColor: appColors.white,
                    borderRadius: 100,
                    paddingHorizontal: 15,
                  },
                ]}>
                <RowComponent justify="space-between" styles={{minWidth: 290}}>
                  <AvatarGroup usersId={item.users} size={32} />
                  <TouchableOpacity
                    onPress={() => setIsVisibleModelInvite(true)}
                    style={[
                      {
                        backgroundColor: appColors.primary,
                        paddingHorizontal: 30,
                        paddingVertical: 8,
                        borderRadius: 10,
                      },
                    ]}>
                    <TextComponent
                      text="Invite"
                      size={14}
                      font={fontFamily.semiBold}
                      color={appColors.white}
                    />
                  </TouchableOpacity>
                </RowComponent>
              </RowComponent>
            ) : (
              <>
                <ButtonComponent
                  onPress={() => setIsVisibleModelInvite(true)}
                  type="primary"
                  text="Invite"
                  styles={{
                    width: appInfo.sizes.WIDTH * 0.8,
                    borderRadius: 100,
                    marginBottom: -5,
                  }}
                />
              </>
            )}
          </SectionComponent>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              flexGrow: 1,
              paddingBottom: 100,
            }}>
            <SectionComponent>
              <TextComponent text={item.title} title size={34} />
            </SectionComponent>
            <SectionComponent>
              <RowComponent styles={{marginBottom: 20}}>
                <CardComponent
                  styles={[
                    globalStyle.noSpaceCard,
                    {
                      width: 48,
                      height: 48,
                    },
                  ]}
                  color={`${appColors.primary}4D`}>
                  <Calendar
                    variant="Bold"
                    size={24}
                    color={appColors.primary}
                  />
                </CardComponent>
                <SpaceComponent width={16} />
                <View
                  style={{
                    flex: 1,
                    height: 50,
                    justifyContent: 'space-around',
                  }}>
                  <TextComponent
                    text={DateTime.getDate(item.date)}
                    font={fontFamily.medium}
                    size={16}
                  />
                  <TextComponent
                    text={`${DateTime.getDay(
                      item.date,
                    )}, ${DateTime.getTimeString(
                      item.startAt,
                    )} - ${DateTime.getTimeString(item.endAt)}`}
                    color={appColors.gray}
                    size={12}
                  />
                </View>
              </RowComponent>
              <RowComponent styles={{marginBottom: 20}}>
                <CardComponent
                  styles={[
                    globalStyle.noSpaceCard,
                    {
                      width: 48,
                      height: 48,
                    },
                  ]}
                  color={`${appColors.primary}4D`}>
                  <Location
                    variant="Bold"
                    size={24}
                    color={appColors.primary}
                  />
                </CardComponent>
                <SpaceComponent width={16} />
                <View
                  style={{
                    flex: 1,
                    height: 50,
                    justifyContent: 'space-around',
                  }}>
                  <TextComponent
                    text={item.titleAddress}
                    font={fontFamily.medium}
                    size={16}
                  />
                  <TextComponent
                    text={item.location.address}
                    color={appColors.gray}
                    size={12}
                    numberOfLine={2}
                  />
                </View>
              </RowComponent>
              <RowComponent
                styles={{marginBottom: 20}}
                onPress={() =>
                  navigation.navigate('ProfileScreen', {
                    id: item.authorId,
                  })
                }>
                <Image
                  source={{
                    uri:
                      profile?.photoUrl ??
                      'https://img.icons8.com/clouds/100/user-male-circle.png',
                  }}
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    resizeMode: 'cover',
                  }}
                />
                <SpaceComponent width={16} />
                <View
                  style={{
                    flex: 1,
                    height: 50,
                    justifyContent: 'space-around',
                  }}>
                  <TextComponent
                    text={profile?.fullname ?? ''}
                    font={fontFamily.medium}
                    size={16}
                  />
                  <TextComponent
                    text="Organizer"
                    color={appColors.gray}
                    size={12}
                  />
                </View>
                {item.authorId !== auth.id && (
                  <TagComponent
                    label={
                      auth.following && auth.following.includes(item.authorId)
                        ? 'Unfollow'
                        : 'Follow'
                    }
                    onPress={() => handleToggleFollowing(item.authorId)}
                    textColor={appColors.primary}
                    styles={{
                      backgroundColor: `${appColors.primary}20`,
                      borderRadius: 12,
                    }}
                    textStyles={{fontFamily: fontFamily.regular}}
                  />
                )}
              </RowComponent>
            </SectionComponent>
            <TabBarComponent title="About Event" />
            <SectionComponent>
              <TextComponent text={item.description} />
            </SectionComponent>
          </ScrollView>
          <LinearGradient
            colors={['rgba(255,255,255,0.8)', ' rgba(255,255,255,1)']}
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              left: 0,
              padding: 12,
            }}>
            <ButtonComponent
              text={`BUY TICKET ${item.price}$`}
              type="primary"
              onPress={() => {}}
              iconFlex="right"
              icon={
                <View
                  style={[
                    globalStyle.iconContainer,
                    {
                      backgroundColor: appColors.primary2,
                    },
                  ]}>
                  <ArrowRight size={18} color={appColors.white} />
                </View>
              }
            />
          </LinearGradient>
          <ModalInvite
            visible={isVisibleModelInvite}
            onClose={() => setIsVisibleModelInvite(false)}
            eventId={item._id ?? ''}
          />
        </View>
      )}
      <LoadingModal visible={isLoading} />
    </>
  );
};

export default EventDetail;
