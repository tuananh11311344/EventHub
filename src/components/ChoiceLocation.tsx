import {ArrowRight2, Location} from 'iconsax-react-native';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import appColors from '../constants/appColors';
import {globalStyle} from '../styles/GlobalStyle';
import RowComponent from './RowComponent';
import SpaceComponent from './SpaceComponent';
import TextComponent from './TextComponent';
import {LocationModal} from '../modals';

const ChoiceLocation = () => {
  const [isVidibleModalLocation, setIsVidibleModalLocation] = useState(false);
  const [addressSelected, setAddressSelected] = useState<{
    address: string;
    position: {lat: number; long: number};
  }>();
  return (
    <>
      <RowComponent
        onPress={() => setIsVidibleModalLocation(!isVidibleModalLocation)}
        styles={[
          globalStyle.inputContainer,
          {
            borderColor: appColors.gray3,
            paddingHorizontal: 10,
            paddingVertical: 10,
          },
        ]}>
        <View style={styles.card}>
          <View
            style={[
              styles.card,
              {
                backgroundColor: appColors.white,
                width: 25,
                height: 25,
              },
            ]}>
            <Location size={15} color={appColors.primary} />
          </View>
        </View>
        <SpaceComponent width={12} />
        <TextComponent
          text={`${addressSelected?.address ?? 'Choose location'}`}
          flex={1}
          size={15}
        />
        <ArrowRight2 size={15} color={appColors.primary} />
      </RowComponent>
      <LocationModal
        visible={isVidibleModalLocation}
        onClose={() => setIsVidibleModalLocation(false)}
        onSelect={location => setAddressSelected(location)}
      />
    </>
  );
};

export default ChoiceLocation;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#5568FF80',
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
