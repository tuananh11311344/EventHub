import {View, Text, ImageBackground} from 'react-native';
import React from 'react';
import CardComponent from './CardComponent';
import TextComponent from './TextComponent';
import {EventModel} from '../models/EventModel';
import AvatarGroup from './AvatarGroup';
import RowComponent from './RowComponent';
import {Location} from 'iconsax-react-native';
import appColors from '../constants/appColors';
import SpaceComponent from './SpaceComponent';
import {appInfo} from '../constants/appInfo';
import {fontFamily} from '../constants/fontFamily';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {globalStyle} from '../styles/GlobalStyle';
import {useNavigation} from '@react-navigation/native';

interface Props {
  item: EventModel;
  type: 'card' | 'list';
}

const EventItem = (props: Props) => {
  const {item, type} = props;

  const navigation: any = useNavigation();

  return (
    <CardComponent
      styles={{width: appInfo.sizes.WIDTH * 0.7}}
      isShadow
      onPress={() =>
        navigation.navigate('EventDetail', {
          item: item,
        })
      }>
      <ImageBackground
        style={{flex: 1, marginBottom: 12, height: 131}}
        source={require('../assets/images/event-image.png')}
        imageStyle={{
          padding: 10,
          resizeMode: 'cover',
          borderRadius: 12,
        }}>
        <RowComponent
          justify="space-between"
          styles={{alignItems: 'flex-start'}}>
          <CardComponent styles={[globalStyle.noSpaceCard]} color="#ffffffB3">
            <TextComponent
              color={appColors.danger2}
              font={fontFamily.bold}
              text="10"
              size={18}
            />
            <TextComponent
              color={appColors.danger2}
              font={fontFamily.semiBold}
              size={10}
              text="JUNE"
            />
          </CardComponent>
          <CardComponent
            styles={[globalStyle.noSpaceCard, {width: 35, height: 35}]}
            color="#ffffffB3">
            <FontAwesome name="bookmark" size={15} color={appColors.danger} />
          </CardComponent>
        </RowComponent>
      </ImageBackground>
      <TextComponent numberOfLine={1} text={item.title} title size={18} />
      <AvatarGroup />
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
    </CardComponent>
  );
};

export default EventItem;
