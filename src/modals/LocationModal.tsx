import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  ButtonComponent,
  InputComponent,
  RowComponent,
  SpaceComponent,
  TextComponent,
} from '../components';
import {SearchNormal1} from 'iconsax-react-native';
import appColors from '../constants/appColors';
import axios from 'axios';
import {LocationModel} from '../models/LocationModel';
import {DOMParser} from 'xmldom';
import MapView, {Marker} from 'react-native-maps';
import {appInfo} from '../constants/appInfo';
import {AddressModel} from '../models/AddressModel';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';

interface Props {
  visible: boolean;
  onClose: () => void;
  onSelect: (val: LocationModel) => void;
}
Geocoder.init(process.env.MAP_API_KEY as string);

const LocationModal = (props: Props) => {
  const {visible, onClose, onSelect} = props;
  const [searchKey, setSearchKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [locations, setLocations] = useState<LocationModel[]>([]);
  const [addressSelected, setAddressSelected] = useState('');
  const [currentLocation, setCurrentLocation] = useState<LocationModel>();

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
    if (addressSelected) {
      fetch(
        `https://nominatim.openstreetmap.org/search?q=${addressSelected}&limit=1&format=json`,
      )
        .then(response => response.json())
        .then(data => {
          if (data && data.length > 0) {
            const latitude = parseFloat(data[0].lat);
            const longitude = parseFloat(data[0].lon);

            setCurrentLocation({lat: latitude, long: longitude});
          }
        })
        .catch(err => console.log(err));
    }
  }, [addressSelected]);

  useEffect(() => {
    if (!searchKey) {
      setLocations([]);
    }
  }, [searchKey]);

  const handleSearchLocation = async () => {
    // const api = `https://autocomplete.search.hereapi.com/v1/autocomplete?q=${searchKey}&limit=10&apiKey=N9V72HSRPAUfVoZp3W2CS_QDRBrnfET75fMxF15V3H4`;
    // const api = `https://nominatim.openstreetmap.org/reverse?lat=21.042090020364355&lon=105.817627763892`;
    const api = `https://nominatim.openstreetmap.org/search?q=${searchKey}&format=json&addressdetails=1&limit=20`;
    try {
      setIsLoading(true);
      const res = await axios.get(api);

      if (res.data) {
        const locationsData = res.data.map((item: any) => ({
          display_name: item.display_name,
          lat: parseFloat(item.lat),
          long: parseFloat(item.lon),
          name: item.name || '',
        }));
        setLocations(locationsData);
      }
      setIsLoading(false);
    } catch (error) {
      console.log('Error:', error);
      setIsLoading(false);
    }
  };
  return (
    <Modal style={{flex: 1}} animationType="slide" visible={visible}>
      <View>
        <RowComponent
          justify="flex-end"
          styles={{paddingVertical: 10, paddingHorizontal: 20}}>
          <View style={{flex: 1}}>
            <InputComponent
              styles={{marginBottom: 0}}
              value={searchKey}
              onChange={val => setSearchKey(val)}
              placeholder="Search..."
              affix={<SearchNormal1 size={20} color={appColors.gray} />}
              allowClear
              onEnd={handleSearchLocation}
            />
            <View
              style={{
                position: 'absolute',
                top: 70,
                right: 10,
                left: 10,
                backgroundColor: appColors.white,
                zIndex: 999,
                paddingHorizontal: 10,
                maxHeight: 400,
              }}>
              {isLoading ? (
                <ActivityIndicator />
              ) : locations.length > 0 ? (
                <FlatList
                  showsVerticalScrollIndicator={false}
                  data={locations}
                  renderItem={({item}) => (
                    <TouchableOpacity
                      style={{marginBottom: 15}}
                      onPress={() => {
                        setAddressSelected(item.display_name ?? '');
                        setSearchKey('');
                      }}>
                      <TextComponent text={item.display_name ?? ''} />
                    </TouchableOpacity>
                  )}
                />
              ) : (
                <View>
                  <TextComponent
                    text={searchKey ? 'Location not found' : 'Search location'}
                  />
                </View>
              )}
            </View>
          </View>
          <SpaceComponent width={12} />
          <ButtonComponent
            text="Cancel"
            type="link"
            onPress={() => {              
              setSearchKey('');
              onClose();
            }}
          />
        </RowComponent>
        {currentLocation && (
          <MapView
            style={{
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
            mapType="hybrid"
            onRegionChange={val => console.log(val)}>
            <Marker
              coordinate={{
                latitude: currentLocation.lat,
                longitude: currentLocation.long,
              }}
            />
          </MapView>
        )}
        <ButtonComponent
          styles={{marginTop: 20}}
          text="Confirm"
          type="primary"
          onPress={() => {
            if (currentLocation) {
              onSelect({
                display_name: addressSelected,
                lat: currentLocation.lat,
                long: currentLocation.long,
              });
              onClose();
            }
          }}
        />
      </View>
    </Modal>
  );
};

export default LocationModal;
