import React, { useState } from 'react';
import RNFetchBlob from 'rn-fetch-blob';
import userAPI from '../../api/userApi';
import {
  AvatarComponent,
  ButtonComponent,
  ButtonImagePicker,
  ContainerComponent,
  InputComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
} from '../../components';
import { LoadingModal } from '../../modals';
import { ProfileModel } from '../../models/ProfileModel';

const EditProfileScreen = ({navigation, route}: any) => {
  const {profile}: {profile: ProfileModel} = route.params;
  const [isLoading, setIsLoading] = useState(false);
  const [profileData, setProfileData] = useState<ProfileModel>(profile);

  const convertUrlToBase64 = async (url: string) => {
    try {
      const response = await RNFetchBlob.fetch('GET', url);
      const base64Data = response.base64();
      const mime = response.respInfo.headers['Content-Type'] || 'image/jpeg';
      const base64Name = `data:${mime};base64,${base64Data}`;
      handleChangeValue('photoUrl', base64Name);
    } catch (error) {
      console.error('Lỗi khi chuyển URL thành base64:', error);
      return null;
    }
  };

  const handleChangeValue = (key: string, value: any) => {
    const items: any = {...profileData};

    items[`${key}`] = value;
    setProfileData(items);
  };

  const handleUpdateProfile = async () => { 
    const api = `/update-profile?uid=${profile.uid}`;
    const newData = {
      bio: profileData.bio ?? '',
      familyName: profileData.familyName ?? '',
      fullname: profileData.fullname ?? '',
      givenName: profileData.givenName ?? '',
      photoUrl: profileData.photoUrl ?? '',
    };
    setIsLoading(true);
    try {
      const res = await userAPI.HandleUser(api, newData, 'post');
      setIsLoading(false);
      if (res) {
        navigation.navigate("ProfileScreen",{
          isUpdated: true,
          id: profile.uid
        });
      }
      console.log(res);
    } catch (error) {
      console.log('Update profile error:', error);
      setIsLoading(false);
    }
  };

  return (
    <ContainerComponent back isScroll title="Edit Profile">
      <SectionComponent>
        <RowComponent>
          <AvatarComponent
            photoUrl={profileData.photoUrl}
            name={
              profileData.fullname ? profileData.fullname : profileData.email
            }
            size={120}
          />
        </RowComponent>
        <SpaceComponent height={16} />
        <RowComponent>
          <ButtonImagePicker
            title="Update representative photo"
            onSelect={val => {
              val.type === 'url'
                ? convertUrlToBase64(val.value as string)
                : handleChangeValue('photoUrl', val.value);
            }}
          />
        </RowComponent>
        <InputComponent
          value={profileData.fullname}
          onChange={val => handleChangeValue('fullname', val)}
          title="FullName"
          allowClear
          placeholder="Enter a fullname"
        />
        {profileData.givenName && (
          <InputComponent
            value={profileData.givenName}
            onChange={val => handleChangeValue('givenName', val)}
            title="GiveName"
            allowClear
            placeholder="Enter a givename"
          />
        )}
        {profileData.familyName && (
          <InputComponent
            value={profileData.familyName}
            onChange={val => handleChangeValue('familyName', val)}
            title="FamilyName"
            allowClear
            placeholder="Enter a familyname"
          />
        )}
        <InputComponent
          value={profileData.bio}
          onChange={val => handleChangeValue('bio', val)}
          title="Introduction"
          allowClear
          multiline
          numberOfLine={5}
          placeholder="Enter a introduction"
        />
        <ButtonComponent
          disable={profileData === profile}
          type="primary"
          text="Update"
          onPress={handleUpdateProfile}
        />
      </SectionComponent>
      <LoadingModal visible={isLoading} />
    </ContainerComponent>
  );
};

export default EditProfileScreen;
