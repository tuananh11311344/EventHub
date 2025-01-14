import {Camera, Image, Link} from 'iconsax-react-native';
import React, {ReactNode, useRef, useState} from 'react';
import {Modal, TouchableOpacity, View, Text} from 'react-native';
import ImageCropPicker, {
  Image as ImgType,
  Options,
} from 'react-native-image-crop-picker';
import {Modalize} from 'react-native-modalize';
import {Portal} from 'react-native-portalize';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  ButtonComponent,
  InputComponent,
  RowComponent,
  SpaceComponent,
  TextComponent,
} from '.';
import appColors from '../constants/appColors';
import {fontFamily} from '../constants/fontFamily';
import { globalStyle } from '../styles/GlobalStyle';

interface Props {
  onSelect: (val: {type: 'url' | 'base64'; value: any}) => void;
  errorMessage?: string;
  title?: string
}

const ButtonImagePicker = (props: Props) => {
  const {onSelect, errorMessage, title} = props;
  const modalizeRef = useRef<Modalize>(null);

  const [imageUrl, setImageUrl] = useState('');
  const [isVisibleModalAddUrl, setIsVisibleModalAddUrl] = useState(false);

  const options: Options = {
    cropping: true,
    includeBase64: true,
    mediaType: 'photo',
  };

  const choiceImages = [
    {
      key: 'camera',
      title: 'Take a picture',
      icon: <Camera size={22} color={appColors.text} />,
    },
    {
      key: 'library',
      title: 'From libary',
      icon: <Image size={22} color={appColors.text} />,
    },
    {
      key: 'url',
      title: 'From url',
      icon: <Link size={22} color={appColors.text} />,
    },
  ];

  const renderItem = (item: {icon: ReactNode; key: string; title: string}) => {
    return (
      <RowComponent
        key={item.key}
        styles={{marginBottom: 20}}
        onPress={() => handleChoiceImage(item.key)}>
        {item.icon}
        <SpaceComponent width={12} />
        <TextComponent text={item.title} flex={1} font={fontFamily.medium} />
      </RowComponent>
    );
  };

  const handleChoiceImage = (key: string) => {
    switch (key) {
      case 'library':
        ImageCropPicker.openPicker(options).then((res: ImgType) => {
          
          const base64 = res.data;
          const mimeType = res.mime ?? 'image/jpeg';
          const base64WithMime = `data:${mimeType};base64,${base64}`;

          onSelect({type: 'base64', value: base64WithMime});
        });
        break;

      case 'camera':
        ImageCropPicker.openCamera(options).then((res: ImgType) => {

          const base64 = res.data;
          const mimeType = res.mime ?? 'image/jpeg';
          const base64WithMime = `data:${mimeType};base64,${base64}`;

          onSelect({type: 'base64', value: base64WithMime});
        });
        break;

      default:
        setIsVisibleModalAddUrl(true);
        break;
    }

    modalizeRef.current?.close();
  };

  return (
    <View style={{marginBottom: 20}}>
      <ButtonComponent
        text= {title ? title : "Upload image"}
        onPress={() => modalizeRef.current?.open()}
        type="link"
      />
      {errorMessage && (
        <Text style={globalStyle.errorMessage}>{errorMessage}</Text>
      )}
      <Portal>
        <Modalize
          ref={modalizeRef}
          adjustToContentHeight
          handlePosition="inside">
          <View style={{marginTop: 30, paddingHorizontal: 20}}>
            {choiceImages.map(item => renderItem(item))}
          </View>
        </Modalize>
      </Portal>
      <Modal
        visible={isVisibleModalAddUrl}
        style={{flex: 1}}
        transparent
        statusBarTranslucent
        animationType="slide">
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.6)',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              backgroundColor: appColors.white,
              margin: 20,
              borderRadius: 12,
              width: '90%',
              padding: 20,
            }}>
            {/* <ButtonComponent
              text="Close"
              onPress={() => setIsVisibleModalAddUrl(false)}
            />
            <TextComponent text="Enter image url" font={fontFamily.medium} /> */}
            <RowComponent justify="flex-end">
              <TouchableOpacity
                onPress={() => {
                  setIsVisibleModalAddUrl(false);
                  setImageUrl('');
                }}>
                <AntDesign name="close" size={24} color={appColors.gray} />
              </TouchableOpacity>
            </RowComponent>
            <TextComponent text="Image URL" size={15} />
            <SpaceComponent height={12} />
            <InputComponent
              placeholder="URL"
              value={imageUrl}
              onChange={val => setImageUrl(val)}
              allowClear
            />
            <RowComponent justify="flex-end">
              <ButtonComponent
                type="link"
                text="Agree"
                onPress={() => {
                  onSelect({type: 'url', value: imageUrl});
                  setIsVisibleModalAddUrl(false);
                  setImageUrl('');
                }}
              />
            </RowComponent>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ButtonImagePicker;
