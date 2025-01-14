import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {
  ButtonComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TagComponent,
  TextComponent,
} from '../../../components';
import {ProfileModel} from '../../../models/ProfileModel';
import {useNavigation} from '@react-navigation/native';
import appColors from '../../../constants/appColors';
import {Edit, Edit2} from 'iconsax-react-native';
import {globalStyle} from '../../../styles/GlobalStyle';
import {ModalSelectCategories} from '../../../modals';

interface Props {
  profile: ProfileModel;
}

const EditProfile = (props: Props) => {
  const navigation: any = useNavigation();
  const [isVisibleModalCatogory, setIsVisibleModalCatogory] = useState(false);
  const {profile} = props;
  return (
    <SectionComponent>
      <RowComponent>
        <ButtonComponent
          styles={{
            borderWidth: 1,
            borderColor: appColors.primary,
            backgroundColor: appColors.white,
          }}
          text="Edit Profile"
          onPress={() =>
            navigation.navigate('EditProfileScreen', {
              profile,
            })
          }
          icon={<Edit size="22" color={appColors.primary} />}
          iconFlex="left"
          textColor={appColors.primary}
          type="primary"
        />
      </RowComponent>
      {profile.bio && (
        <>
          <SpaceComponent height={20} />
          <TextComponent text="About" title size={18} />
          <TextComponent text={profile.bio} size={18} />
        </>
      )}
      <SpaceComponent height={20} />
      <>
        <RowComponent>
          <TextComponent flex={1} text="Interests" title size={18} />
          <RowComponent
            onPress={() => {
              setIsVisibleModalCatogory(true);
            }}>
            <Edit2 size={18} color={appColors.text} />
            <SpaceComponent width={8} />
            <TextComponent text="Change" />
          </RowComponent>
        </RowComponent>
        <RowComponent
          styles={{
            flexWrap: 'wrap',
            justifyContent: 'flex-start',
            marginTop: 10,
          }}>
          {Array.from({length: 9}).map((item, index) => (
            <TagComponent
              key={`tag${index}`}
              bgColor="#e0e0e0"
              label="Music"
              onPress={() => {}}
              styles={{
                marginRight: 8,
                marginBottom: 12,
              }}
            />
          ))}
        </RowComponent>
      </>
      <ModalSelectCategories
        selected={[]}
        onSelected={val =>{
          console.log(val);
          setIsVisibleModalCatogory(false);
          navigation.navigate("ProfileScreen",{
            isUpdated: true,
            id: profile.uid
          });
        }}
        onClose={() => setIsVisibleModalCatogory(false)}
        visible={isVisibleModalCatogory}
      />
    </SectionComponent>
  );
};

export default EditProfile;
