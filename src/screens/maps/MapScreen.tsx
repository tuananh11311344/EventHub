import Geolocation from '@react-native-community/geolocation';
import {ArrowLeft2} from 'iconsax-react-native';
import React, {useEffect, useRef, useState} from 'react';
import {FlatList, StatusBar, TouchableOpacity, View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import eventAPI from '../../api/eventApi';
import {Target} from '../../assets/svgs';
import {
  CardComponent,
  CategoriesList,
  EventItem,
  InputComponent,
  MarkerCustom,
  RowComponent,
  SpaceComponent,
} from '../../components';
import appColors from '../../constants/appColors';
import {appInfo} from '../../constants/appInfo';
import {EventModel} from '../../models/EventModel';
import {LocationModel} from '../../models/LocationModel';
import {globalStyle} from '../../styles/GlobalStyle';

const MapScreen = ({navigation}: any) => {
  const [currentLocation, setCurrentLocation] = useState<LocationModel>();
  const [events, setEvents] = useState<EventModel[]>([]);
  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    Geolocation.getCurrentPosition(position => {
      if (position.coords) {
        setCurrentLocation({
          lat: position.coords.latitude,
          long: position.coords.longitude,
        });
      }
    });
  }, []);

  useEffect(() => {
    currentLocation && getNearByEvents();
  }, [currentLocation]);
  const getNearByEvents = async () => {
    const api = `/get-events?lat=${currentLocation?.lat}&long=${currentLocation?.long}&distance=5`;
    try {
      const res = await eventAPI.HandleEvent(api);
      setEvents(res.data);
    } catch (error) {
      console.log('Error:', error);
    }
  };

  return (
    <View style={{flex: 1}}>
      <StatusBar barStyle={'dark-content'} />
      {currentLocation && (
        <MapView
          ref={mapRef}
          style={{
            flex: 1,
            zIndex: -1,
            width: appInfo.sizes.WIDTH,
            height: 550,
            marginTop: 30,
          }}
          initialRegion={{
            latitude: currentLocation.lat,
            longitude: currentLocation.long,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          region={{
            latitude: currentLocation.lat,
            longitude: currentLocation.long,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
          showsMyLocationButton
          showsUserLocation
          mapType="terrain">
          {events.length > 0 &&
            events.map(event => (
              <Marker
                key={event._id}
                title={event.title}
                description={event.description}
                coordinate={{
                  latitude: event.location.lat,
                  longitude: event.location.long,
                }}>
                <MarkerCustom type={event.category} />
              </Marker>
            ))}
        </MapView>
      )}
      <View
        style={{
          backgroundColor: 'rgba(255,255,255,0.3)',
          position: 'absolute',
          top: 0,
          right: 0,
          left: 0,
          padding: 20,
          paddingTop: 50,
          zIndex: 1,
        }}>
        <RowComponent>
          <View style={{flex: 1}}>
            <InputComponent
              styles={{marginBottom: -27}}
              affix={
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <ArrowLeft2 size={20} color={appColors.gray} />
                </TouchableOpacity>
              }
              placeholder="Search..."
              value=""
              onChange={val => console.log(val)}
            />
          </View>
          <SpaceComponent width={12} />
          <CardComponent
            styles={[
              globalStyle.noSpaceCard,
              {
                width: 56,
                height: 56,
              },
            ]}
            color={appColors.white}
            onPress={() => {
              if (currentLocation && mapRef.current) {
                mapRef.current.animateToRegion(
                  {
                    latitude: currentLocation.lat,
                    longitude: currentLocation.long,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                  },
                  1000,
                );
              }
            }}>
            <Target />
          </CardComponent>
        </RowComponent>
        <SpaceComponent height={15} />
        <CategoriesList />
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: 10,
          right: 0,
          left: 0,
        }}>
        <FlatList
          data={events}
          initialScrollIndex={0}
          renderItem={({item}) => <EventItem item={item} type="list" />}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default MapScreen;
