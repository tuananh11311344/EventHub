import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
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
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import eventAPI from '../../api/eventApi';
import {
  CategoriesList,
  CircleComponent,
  EventItem,
  LoadingComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TabBarComponent,
  TagComponent,
  TextComponent,
} from '../../components';
import appColors from '../../constants/appColors';
import {fontFamily} from '../../constants/fontFamily';
import {AddressModel} from '../../models/AddressModel';
import {EventModel} from '../../models/EventModel';
import {authSelector} from '../../redux/reducers/authReducer';
import {globalStyle} from '../../styles/GlobalStyle';
import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';

const HomeScreen = ({navigation}: any) => {
  const dispatch = useDispatch();
  const auth = useSelector(authSelector);
  const [currentLocation, setCurrentLocation] = useState<AddressModel>();
  const [eventsUpcoming, setEventsUpcoming] = useState<EventModel[]>([]);
  const [eventsNearby, setEventsNearby] = useState<EventModel[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    setIsLoading(true);
    Geolocation.getCurrentPosition(position => {
      if (position.coords) {
        reverseGeoCode({
          lat: position.coords.latitude,
          long: position.coords.longitude,
        });
      }
    });
    getEvents('upcoming');
    messaging().onMessage(
      async (mess: FirebaseMessagingTypes.RemoteMessage) => {
        ToastAndroid.show(mess.notification?.title ?? '', ToastAndroid.SHORT);
      },
    );
  }, []);

  useEffect(() => {
    if (currentLocation) {
      getEvents('nearby');
      setIsLoading(false);
    }
  }, [currentLocation]);

  const reverseGeoCode = async ({lat, long}: {lat: number; long: number}) => {
    const api = `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${lat},${long}&lang=en-US&apiKey=N9V72HSRPAUfVoZp3W2CS_QDRBrnfET75fMxF15V3H4`;

    try {
      const res = await axios(api);
      if (res && res.status === 200 && res.data) {
        const items = res.data.items;
        setCurrentLocation(items[0]);
      }
    } catch (error) {
      setIsLoading(false);
      console.log('Error:', error);
    }
  };
  const getEvents = async (type: string) => {
    var api = '';

    switch (type) {
      case 'upcoming':
        api = `/get-events?limit=5&date=${new Date().getTime()}`;
        try {
          const res = await eventAPI.HandleEvent(api);
          setEventsUpcoming(res.data);
        } catch (error) {
          setIsLoading(false);
          console.log('Get events upcoming error:', error);
        }
        break;
      case 'nearby':
        api = `/get-events?limit=5&lat=${currentLocation?.position.lat}&long=${currentLocation?.position.lng}&distance=5`;
        try {
          const res = await eventAPI.HandleEvent(api);
          setEventsNearby(res.data);
        } catch (error) {
          setIsLoading(false);
          console.log('Get events nearby error:', error);
        }
        break;
      default:
        break;
    }
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
          {eventsUpcoming && eventsUpcoming.length > 0 ? (
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal
              data={eventsUpcoming}
              renderItem={({item, index}) => (
                <EventItem key={`event${index}`} item={item} type="card" />
              )}
            />
          ) : (
            <LoadingComponent
              isLoading={isLoading}
              values={eventsUpcoming.length}
            />
          )}
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
        <SectionComponent styles={{paddingHorizontal: 0}}>
          <TabBarComponent title="Nearby You" onPress={() => {}} />
          {eventsNearby && eventsNearby.length > 0 ? (
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal
              data={eventsNearby}
              renderItem={({item, index}) => (
                <EventItem key={`event${index}`} item={item} type="card" />
              )}
            />
          ) : (
            <LoadingComponent
              isLoading={isLoading}
              values={eventsNearby.length}
            />
          )}
        </SectionComponent>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
