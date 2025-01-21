import { useNavigation } from '@react-navigation/native';
import { Location } from 'iconsax-react-native';
import React from 'react';
import {
  Image,
  ImageBackground,
  StyleProp,
  ViewStyle
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux';
import appColors from '../constants/appColors';
import { appInfo } from '../constants/appInfo';
import { fontFamily } from '../constants/fontFamily';
import { EventModel } from '../models/EventModel';
import { authSelector, AuthState } from '../redux/reducers/authReducer';
import { globalStyle } from '../styles/GlobalStyle';
import { DateTime } from '../utils/datetime';
import AvatarGroup from './AvatarGroup';
import CardComponent from './CardComponent';
import RowComponent from './RowComponent';
import SpaceComponent from './SpaceComponent';
import TextComponent from './TextComponent';

interface Props {
  item: EventModel;
  type: 'card' | 'list';
  styles?: StyleProp<ViewStyle>;
}

const EventItem = (props: Props) => {
  const {item, type, styles} = props;

  const navigation: any = useNavigation();
  const auth: AuthState = useSelector(authSelector);

  return (
    <CardComponent
      styles={[{width: appInfo.sizes.WIDTH * 0.7}, styles]}
      isShadow
      onPress={() =>
        navigation.navigate('EventDetail', {
          id: item._id,
        })
      }>
      {type === 'card' ? (
        <>
          <ImageBackground
            style={{flex: 1, marginBottom: 12, height: 131}}
            source={{uri: item.photoUrl}}
            imageStyle={{
              padding: 10,
              resizeMode: 'cover',
              borderRadius: 12,
            }}>
            <RowComponent
              justify="space-between"
              styles={{alignItems: 'flex-start', paddingHorizontal: 10}}>
              <CardComponent
                styles={[globalStyle.noSpaceCard]}
                color="#ffffffB3">
                <TextComponent
                  color={appColors.danger2}
                  font={fontFamily.bold}
                  text={`${new Date(item.date).getDate()}`}
                  size={18}
                />
                <TextComponent
                  color={appColors.danger2}
                  font={fontFamily.semiBold}
                  size={13}
                  text={DateTime.getMonthString(
                    new Date(item.date).toISOString(),
                  )}
                />
              </CardComponent>
              {auth.follow_events &&
                auth.follow_events.includes(item._id ?? '') && (
                  <CardComponent
                    styles={[globalStyle.noSpaceCard, {width: 35, height: 35}]}
                    color="#ffffffB3">
                    <FontAwesome
                      name="bookmark"
                      size={15}
                      color={appColors.danger}
                    />
                  </CardComponent>
                )}
            </RowComponent>
          </ImageBackground>
          <TextComponent numberOfLine={1} text={item.title} title size={18} />
          <AvatarGroup usersId={item.users} />
          <RowComponent>
            <Location size={18} color={appColors.text3} variant="Bold" />
            <SpaceComponent width={10} />
            <TextComponent
              flex={1}
              size={12}
              numberOfLine={1}
              text={item.location.address}
              color={appColors.text2}
            />
          </RowComponent>
        </>
      ) : (
        <>
          <RowComponent styles={{flex: 1}}>
            <Image
              source={{uri: item.photoUrl}}
              style={{
                width: 79,
                height: 92,
                borderRadius: 12,
                resizeMode: 'cover',
              }}></Image>
            <SpaceComponent width={12} />
            <RowComponent
              justify="space-around"
              styles={{
                flex: 1,
                height: 92,
                flexDirection: 'column',
                alignItems: 'flex-start',
              }}>
              <TextComponent
                text={`${DateTime.getDatesString(
                  item.date,
                )} • ${DateTime.getTimeString(item.startAt)}`}
                color={appColors.primary}
                size={14}
              />
              <TextComponent
                text={item.title}
                title
                size={18}
                numberOfLine={2}
              />
              <RowComponent>
                <Location size={18} color={appColors.text3} variant="Bold" />
                <TextComponent
                  flex={1}
                  size={12}
                  numberOfLine={1}
                  text={item.location.address}
                  color={appColors.text2}
                />
              </RowComponent>
            </RowComponent>
          </RowComponent>
        </>
      )}
    </CardComponent>
  );
};

export default EventItem;
