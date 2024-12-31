import {View, Text, Image} from 'react-native';
import React from 'react';
import {CircleComponent, RowComponent, SpaceComponent, TextComponent} from '.';
import appColors from '../constants/appColors';
import {fontFamily} from '../constants/fontFamily';

interface Props{
  size?: number
}

const AvatarGroup = (props: Props) => {
  const {size} = props
  const photoUrl =
    'https://gear5world.com/cdn/shop/articles/luffy_mugiwara_chapeau_paille_one_piece.jpg?v=1698943111';
  return (
    <RowComponent justify="flex-start" styles={{paddingVertical: 12, alignItems: 'center'}}>
      {Array.from({length: 3}).map((item, index) => (
        <Image
          key={`image${index}`}
          source={{uri: photoUrl}}
          style={{
            width: size ?? 30,
            height: size ?? 30,
            borderRadius: 100,
            borderWidth: 1,
            borderColor: appColors.white,
            marginLeft: index === 0 ? 0 : -8,
          }}
        />
      ))}
      <SpaceComponent width={10}/>
      <TextComponent
        text="+20 Going"
        size={13 + (size ? (size -24)/5 : 0)}
        color={appColors.primary}
        font={fontFamily.semiBold}
      />
    </RowComponent>
  );
};

export default AvatarGroup;
