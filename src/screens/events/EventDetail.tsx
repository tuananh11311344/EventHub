import {ArrowLeft, ArrowRight, Calendar, Location} from 'iconsax-react-native';
import React from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import {LinearGradient} from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  AvatarGroup,
  ButtonComponent,
  CardComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TabBarComponent,
  TextComponent,
} from '../../components';
import appColors from '../../constants/appColors';
import {appInfo} from '../../constants/appInfo';
import {fontFamily} from '../../constants/fontFamily';
import {EventModel} from '../../models/EventModel';
import {globalStyle} from '../../styles/GlobalStyle';

const EventDetail = ({navigation, route}: any) => {
  const {item}: {item: EventModel} = route.params;

  return (
    <View style={{flex: 1, backgroundColor: appColors.white}}>
      <ImageBackground
        source={require('../../assets/images/event-image.png')}
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
              styles={[globalStyle.noSpaceCard, {width: 40, height: 40}]}
              color="#ffffff4D">
              <FontAwesome name="bookmark" size={16} color={appColors.white} />
            </CardComponent>
          </RowComponent>
        </LinearGradient>
      </ImageBackground>
      <SectionComponent
        styles={{
          alignItems: 'center',
          marginTop: 244 - 115,
        }}>
        <RowComponent
          styles={[
            globalStyle.shadow,
            {
              backgroundColor: appColors.white,
              borderRadius: 100,
              paddingHorizontal: 12,
            },
          ]}>
          <RowComponent justify="space-between" styles={{minWidth: 290}}>
            <AvatarGroup size={32} />
            <TouchableOpacity
              style={[
                {
                  backgroundColor: appColors.primary,
                  paddingHorizontal: 20,
                  paddingVertical: 5,
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
              <Calendar variant="Bold" size={24} color={appColors.primary} />
            </CardComponent>
            <SpaceComponent width={16} />
            <View
              style={{
                flex: 1,
                height: 50,
                justifyContent: 'space-around',
              }}>
              <TextComponent
                text="14 December, 2021"
                font={fontFamily.medium}
                size={16}
              />
              <TextComponent
                text="Tuesday, 4:00PM - 9:00PM"
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
              <Location variant="Bold" size={24} color={appColors.primary} />
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
              />
            </View>
          </RowComponent>
          <RowComponent styles={{marginBottom: 20}}>
            <Image
              source={{
                uri: 'https://gear5world.com/cdn/shop/articles/luffy_mugiwara_chapeau_paille_one_piece.jpg?v=1698943111',
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
                text="Sơn Tùng MTP"
                font={fontFamily.medium}
                size={16}
              />
              <TextComponent
                text="Organizer"
                color={appColors.gray}
                size={12}
              />
            </View>
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
          text="BUY TICKET 120$"
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
    </View>
  );
};

export default EventDetail;
