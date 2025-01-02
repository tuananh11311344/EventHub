import {
  HambergerMenu,
  Notification,
  SearchNormal1,
  Sort,
} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  ImageBackground,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import {
  CategoriesList,
  CircleComponent,
  EventItem,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TabBarComponent,
  TagComponent,
  TextComponent,
} from '../../components';
import appColors from '../../constants/appColors';
import {fontFamily} from '../../constants/fontFamily';
import {authSelector} from '../../redux/reducers/authReducer';
import {globalStyle} from '../../styles/GlobalStyle';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import {AddressModel} from '../../models/AddressModel';
import Geocoder from 'react-native-geocoding';

const HomeScreen = ({navigation}: any) => {
  const [currentLocation, setCurrentLocation] = useState<AddressModel>();
  const dispatch = useDispatch();
  const auth = useSelector(authSelector);

  Geocoder.init(process.env.MAP_API_KEY as string);

  // useEffect(() => {
  //   // Geocoder.from('253 Hoang Hoa Tham, Hanoi')
  //   //   .then(
  //   //     position =>
  //   //       position && console.log(position.results[0].geometry.location),
  //   //   )
  //   //   .catch(err => console.log(err));
  //   fetch(
  //     'https://nominatim.openstreetmap.org/search?q=253+Hoang+Hoa+Tham,+Hanoi&format=json',
  //   )
  //     .then(response => response.json())
  //     .then(data => console.log(data[0].lat, data[0].lon))
  //     .catch(err => console.log(err));
  // }, []);

  useEffect(() => {
    Geolocation.getCurrentPosition(position => {
      if (position.coords) {
        reverseGeoCode({
          lat: position.coords.latitude,
          long: position.coords.longitude,
        });
      }
    });
  }, []);

  const reverseGeoCode = async ({lat, long}: {lat: number; long: number}) => {
    const api = `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${lat},${long}&lang=en-US&apiKey=N9V72HSRPAUfVoZp3W2CS_QDRBrnfET75fMxF15V3H4`;

    try {
      const res = await axios(api);
      if (res && res.status === 200 && res.data) {
        const items = res.data.items;
        setCurrentLocation(items[0]);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const itemEvent = {
    title: 'International Band Music Concert',
    imageUrl: '',
    description:
      'Enjoy your favorite dishe and a lovely your friends and family and have a great time. Food from local food trucks will be available for purchase.',
    location: {
      title: 'Gala Convention Center',
      address: '36 Guild Street London, UK ',
    },
    users: [''],
    authorId: '',
    startAt: Date.now(),
    endAt: Date.now(),
    date: Date.now(),
  };
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
          marginBottom: 20,
        }}>
        <RowComponent>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <HambergerMenu size={24} color={appColors.white} />
          </TouchableOpacity>
          <View style={{flex: 1, alignItems: 'center'}}>
            <RowComponent>
              <TextComponent
                text="Current Location"
                size={13}
                color={appColors.white}
              />
              <MaterialIcons
                name="arrow-drop-down"
                size={20}
                color={appColors.white}
              />
            </RowComponent>
            {currentLocation && (
              <TextComponent
                text={`${currentLocation.address.city}, ${currentLocation.address.countryCode}`}
                color={appColors.white2}
                size={13}
                flex={0}
                font={fontFamily.medium}
              />
            )}
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
        <SpaceComponent height={20} />
        <RowComponent>
          <RowComponent
            styles={{flex: 1}}
            onPress={() =>
              navigation.navigate('SearchEvents', {
                isFilter: false,
              })
            }>
            <SearchNormal1
              variant="TwoTone"
              color={appColors.white}
              size={20}
            />
            <View
              style={{
                width: 1,
                height: 20,
                backgroundColor: appColors.gray2,
                marginHorizontal: 10,
              }}
            />
            <TextComponent
              flex={1}
              text="Search..."
              color={appColors.gray2}
              size={16}
            />
          </RowComponent>
          <TagComponent
            onPress={() =>
              navigation.navigate('SearchEvents', {
                isFilter: true,
              })
            }
            label="Filters"
            bgColor="#5D56F3"
            icon={
              <CircleComponent size={20} color="#A29EF0">
                <Sort size={16} color="#5D56F3" />
              </CircleComponent>
            }
          />
        </RowComponent>
        <SpaceComponent height={15} />
        <CategoriesList isColor />
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
        <SectionComponent styles={{paddingHorizontal: 0, paddingTop: 15}}>
          <TabBarComponent title="Upcoming Events" onPress={() => {}} />
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            data={Array.from({length: 5})}
            renderItem={({item, index}) => (
              <EventItem key={`event${index}`} item={itemEvent} type="card" />
            )}
          />
        </SectionComponent>
        <SectionComponent>
          <ImageBackground
            source={require('../../assets/images/invite-image.png')}
            style={{
              flex: 1,
              padding: 16,
              minHeight: 127,
            }}
            imageStyle={{
              resizeMode: 'cover',
              borderRadius: 12,
              backgroundColor: '#00F8FF29',
            }}>
            <TextComponent text="Invite your friends" title size={18} />
            <SpaceComponent height={4} />
            <TextComponent text="Get $20 for ticket" size={13} />
            <RowComponent justify="flex-start">
              <TouchableOpacity
                style={[
                  globalStyle.button,
                  {
                    marginTop: 20,
                    backgroundColor: '#00F8FF',
                    paddingHorizontal: 28,
                    paddingVertical: 10,
                    minHeight: 32,
                  },
                ]}>
                <TextComponent
                  text="INVITE"
                  size={14}
                  font={fontFamily.bold}
                  color={appColors.white}
                />
              </TouchableOpacity>
            </RowComponent>
          </ImageBackground>
        </SectionComponent>
        <SectionComponent>
          <TabBarComponent title="Nearby You" onPress={() => {}} />
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            data={Array.from({length: 5})}
            renderItem={({item, index}) => (
              <EventItem key={`event${index}`} item={itemEvent} type="card" />
            )}
          />
        </SectionComponent>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
