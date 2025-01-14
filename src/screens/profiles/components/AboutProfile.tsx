import React, {useState} from 'react';
import {Touchable, TouchableOpacity, View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {
  ButtonComponent,
  RowComponent,
  SectionComponent,
  TextComponent,
} from '../../../components';
import appColors from '../../../constants/appColors';
import {ProfileModel} from '../../../models/ProfileModel';
import {fontFamily} from '../../../constants/fontFamily';
import {globalStyle} from '../../../styles/GlobalStyle';
import {useDispatch, useSelector} from 'react-redux';
import {
  authSelector,
  AuthState,
  updateFollowing,
} from '../../../redux/reducers/authReducer';
import userAPI from '../../../api/userApi';
import { LoadingModal } from '../../../modals';

interface Props {
  profile: ProfileModel;
}

const AboutProfile = (props: Props) => {
  const {profile} = props;
  const auth: AuthState = useSelector(authSelector);
  const [tabSelected, setTabSelected] = useState('about');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const tabs = [
    {
      key: 'about',
      title: 'About',
    },
    {
      key: 'events',
      title: 'Events',
    },
    {
      key: 'reviews',
      title: 'Reviews',
    },
  ];

  const renderTabContent = (id: string) => {
    let content = <></>;
    switch (id) {
      case 'about':
        content = (
          <>
            <TextComponent text={profile.bio} />
          </>
        );
        break;

      default:
        content = <></>;
        break;
    }

    return content;
  };

  const handleToggleFollowing = async () => {
    setIsLoading(true);
    const api = `/update-following`;
    try {
      const res = await userAPI.HandleUser(
        api,
        {
          uid: auth.id,
          authorId: profile.uid,
        },
        'post',
      );
      await dispatch(updateFollowing(res.data));
      setIsLoading(false);
    } catch (error) {
      console.log('Update following error:', error);
      setIsLoading(false);
    }
  };

  return (
    <View>
      <SectionComponent>
        <RowComponent styles={{paddingHorizontal: 40}}>
          <ButtonComponent
            onPress={handleToggleFollowing}
            icon={
              <Feather
                name={
                  auth.following && auth.following.includes(profile.uid)
                    ? 'user-minus'
                    : 'user-plus'
                }
                size={24}
                color={appColors.white}
              />
            }
            iconFlex="left"
            text={
              auth.following && auth.following.includes(profile.uid)
                ? 'Unfollow'
                : 'Follow'
            }
            type="primary"
          />
          <ButtonComponent
            icon={
              <Feather
                name="message-circle"
                size={24}
                color={appColors.primary}
              />
            }
            styles={{
              backgroundColor: appColors.white,
              borderColor: appColors.primary,
              borderWidth: 2,
            }}
            textColor={appColors.primary}
            iconFlex="left"
            text="Message"
            type="primary"
          />
        </RowComponent>
      </SectionComponent>
      <SectionComponent>
        <RowComponent>
          {tabs.map(item => (
            <TouchableOpacity
              style={[
                globalStyle.center,
                {
                  flex: 1,
                },
              ]}
              onPress={() => setTabSelected(item.key)}
              key={item.key}>
              <TextComponent
                text={item.title}
                font={
                  item.key === tabSelected
                    ? fontFamily.medium
                    : fontFamily.regular
                }
                size={18}
                color={
                  item.key === tabSelected ? appColors.primary : appColors.text
                }
              />
              <View
                style={{
                  width: 80,
                  borderRadius: 100,
                  flex: 0,
                  marginTop: 6,
                  height: 3,
                  backgroundColor:
                    item.key === tabSelected
                      ? appColors.primary
                      : appColors.white,
                }}
              />
            </TouchableOpacity>
          ))}
        </RowComponent>
        {renderTabContent(tabSelected)}
      </SectionComponent>
      <LoadingModal visible={isLoading}/>
    </View>
  );
};

export default AboutProfile;
