import React from 'react';
import {ImageBackground, TouchableOpacity} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {TextComponent} from '.';
import {
  Art,
  ChefFork,
  ChefForkGreen,
  Food,
  Music,
  Sports,
} from '../assets/svgs';
import appColors from '../constants/appColors';
import {Category} from '../models/CategoryModel';
import {globalStyle} from '../styles/GlobalStyle';

interface Props {
  // onPress: () => void;
  type: string;
}

const MarkerCustom = (props: Props) => {
  const {type} = props;

  //   const categories: Category[] = [
  //     {
  //       key: 'sports',
  //       icon: <Ionicons name="basketball" size={22} color={'#EE544A'} />,
  //       iconColor: '#EE544A',
  //       title: 'Sports',
  //     },
  //     {
  //       key: 'music',
  //       icon: <FontAwesome name="music" size={20} color="#F59762" />,
  //       iconColor: '#F59762',
  //       title: 'Music',
  //     },
  //     {
  //       key: 'food',
  //       icon: <ChefForkGreen />,
  //       iconColor: '#29D697',
  //       title: 'Food',
  //     },
  //     {
  //       key: 'art',
  //       icon: <Ionicons name="color-palette-sharp" size={20} color="#46CDFB" />,
  //       iconColor: '#46CDFB',
  //       title: 'Art',
  //     },
  //   ];

  const renderItem = (type: string) => {
    let icon;
    switch (type) {
      case 'art':
        icon = <Art />;
        break;
      case 'food':
        icon = <Food />;
        break;
      case 'music':
        icon = <Music />;
        break;
      case 'sports':
        icon = <Sports />;
        break;

      default:
        icon = <Music />;
        break;
    }
    return icon;
  };
  return renderItem(type);
};

export default MarkerCustom;
