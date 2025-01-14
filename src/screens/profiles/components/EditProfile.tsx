import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
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
import {Category} from '../../../models/CategoryModel';
import eventAPI from '../../../api/eventApi';

interface Props {
  profile: ProfileModel;
}

const EditProfile = (props: Props) => {
  const navigation: any = useNavigation();
  const [isVisibleModalCatogory, setIsVisibleModalCatogory] = useState(false);
  const [category, setCategory] = useState<Category[]>([]);

  const {profile} = props;

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    const api = `/get-categories`;
    try {
      const res: any = await eventAPI.HandleEvent(api);
      setCategory(res.data);
    } catch (error) {
      console.log('Get categories error:', error);
    }
  };

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
            }}
            styles={[
              globalStyle.tag,
              {
                backgroundColor: '#5669FF40',
              },
            ]}>
            <Edit2 size={18} color={appColors.primary} />
            <SpaceComponent width={8} />
            <TextComponent
              text="Change"
              styles={{paddingVertical: 3}}
              color={appColors.primary}
            />
          </RowComponent>
        </RowComponent>
        <RowComponent
          styles={{
            flexWrap: 'wrap',
            justifyContent: 'flex-start',
            marginTop: 10,
          }}>
          {category.length > 0 &&
            category.map(
              item =>
                profile.interests?.includes(item._id) && (
                  <View
                    key={item._id}
                    style={[
                      globalStyle.tag,
                      {backgroundColor: item.color, margin: 6},
                    ]}>
                    <TextComponent text={item.title} color={appColors.white} />
                  </View>
                ),
            )}
        </RowComponent>
      </>
      <ModalSelectCategories
        selected={profile.interests}
        onSelected={() => {
          setIsVisibleModalCatogory(false);
          navigation.navigate('ProfileScreen', {
            isUpdated: true,
            id: profile.uid,
          });
        }}
        onClose={() => setIsVisibleModalCatogory(false)}
        visible={isVisibleModalCatogory}
        category={category}
      />
    </SectionComponent>
  );
};

export default EditProfile;
