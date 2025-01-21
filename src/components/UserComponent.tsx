import {View, Text, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import RowComponent from './RowComponent';
import TextComponent from './TextComponent';
import userAPI from '../api/userApi';
import {ProfileModel} from '../models/ProfileModel';
import SpaceComponent from './SpaceComponent';
import {fontFamily} from '../constants/fontFamily';
import appColors from '../constants/appColors';

interface Props {
  userId: string;
  type: 'Notification' | 'Invite';
  onPress: () => void;
}

const UserComponent = (props: Props) => {
  const {userId, type, onPress} = props;
  const [profile, setProfile] = useState<ProfileModel>();
  const [searchKey, setSearchKey] = useState('');
  const [results, setResults] = useState<string[]>([]);

  useEffect(() => {
    getProfile();
  }, [userId]);

  const getProfile = async () => {
    const api = `/get-profile?uid=${userId}`;

    try {
      const res = await userAPI.HandleUser(api);

      if (res && res.data) {
        await setProfile(res.data);
      }
    } catch (error) {
      console.log('Get profile error:', error);
    }
  };
  return (
    profile && (
      <RowComponent onPress={onPress}>
        <Image
          source={{
            uri:
              profile?.photoUrl ??
              'https://img.icons8.com/clouds/100/user-male-circle.png',
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
            text={profile?.fullname ?? ''}
            font={fontFamily.medium}
            size={16}
          />
          <TextComponent text="Organizer" color={appColors.gray} size={12} />
        </View>
      </RowComponent>
    )
  );
};

export default UserComponent;
