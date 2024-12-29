import {HambergerMenu, Notification} from 'iconsax-react-native';
import React from 'react';
import {StatusBar, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  CircleComponent,
  ContainerComponent,
  RowComponent,
  TextComponent,
} from '../../components';
import appColors from '../../constants/appColors';
import {fontFamily} from '../../constants/fontFamily';
import {authSelector} from '../../redux/reducers/authReducer';
import {globalStyle} from '../../styles/GlobalStyle';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const auth = useSelector(authSelector);
  return (
    <View style={[globalStyle.container]}>
      <StatusBar barStyle={'light-content'} />
      <View
        style={{
          backgroundColor: appColors.primary,
          height: 179,
          borderBottomLeftRadius: 40,
          borderBottomRightRadius: 40,
          paddingTop: StatusBar.currentHeight,
          paddingHorizontal: 16,
        }}>
        <RowComponent>
          <TouchableOpacity>
            <HambergerMenu size={24} color={appColors.white} />
          </TouchableOpacity>
          <View style={{flex: 1, alignItems: 'center'}}>
            <RowComponent>
              <TextComponent text="Current Location" color={appColors.white} />
              <MaterialIcons
                name="arrow-drop-down"
                size={18}
                color={appColors.white}
              />
            </RowComponent>
            <TextComponent
              text="New York, USA"
              color={appColors.white2}
              size={13}
              flex={0}
              font={fontFamily.medium}
            />
          </View>
          <CircleComponent color="#524CE0" size={36}>
            <View>
              <Notification size={18} color={appColors.white} />
              <View
                style={{
                  backgroundColor: '#02E9FE',
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  borderWidth: 2,
                  borderColor: '#524CE0',
                  position: 'absolute',
                  top: -2,
                  right: 2,
                }}></View>
            </View>
          </CircleComponent>
        </RowComponent>
      </View>
      <ContainerComponent isScroll>
        <TextComponent text="123" />
      </ContainerComponent>
    </View>
  );
};

export default HomeScreen;
