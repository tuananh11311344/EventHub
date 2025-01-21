import {SearchNormal1, TickCircle} from 'iconsax-react-native';
import React, {useEffect, useRef, useState} from 'react';
import {Modalize} from 'react-native-modalize';
import {Portal} from 'react-native-portalize';
import {useSelector} from 'react-redux';
import {
  ButtonComponent,
  InputComponent,
  RowComponent,
  SectionComponent,
  TextComponent,
  UserComponent,
} from '../components';
import appColors from '../constants/appColors';
import {fontFamily} from '../constants/fontFamily';
import {authSelector, AuthState} from '../redux/reducers/authReducer';
import {Alert, Share, View} from 'react-native';
import {globalStyle} from '../styles/GlobalStyle';
import userAPI from '../api/userApi';
import eventAPI from '../api/eventApi';

interface Props {
  visible: boolean;
  onClose: () => void;
  eventId: string;
}

const ModalInvite = (props: Props) => {
  const {visible, onClose, eventId} = props;
  const [friendIds, setFriendIds] = useState<string[]>([]);
  const [userSelected, setUserSelected] = useState<string[]>([]);
  const modalizeRef = useRef<Modalize>();
  const auth: AuthState = useSelector(authSelector);

  useEffect(() => {
    if (visible) {
      modalizeRef.current?.open();
    } else {
      modalizeRef.current?.close();
    }
  }, [visible]);

  useEffect(() => {
    if (auth.following && auth.following.length > 0) {
      setFriendIds(auth.following);
    }
  }, [auth]);

  const handleSelectedId = (id: string) => {
    const items: string[] = [...userSelected];
    const index = items.findIndex(e => e === id);
    if (index !== -1) {
      items.splice(index, 1);
    } else {
      items.push(id);
    }
    setUserSelected(items);
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'React Native | A framework for building native apps using React',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };

  const handleSendInviteNotification = async () => {    
    const api = `/send-invite`;
    try {
      await userAPI.HandleUser(
        api,
        {ids: userSelected, eventId: eventId},
        'post',
      );
      
    } catch (error) {
      console.log('Send invite error:', error);
    }
  };

  return (
    <Portal>
      <Modalize
        adjustToContentHeight
        handlePosition="inside"
        ref={modalizeRef}
        FooterComponent={
          <SectionComponent>
            <ButtonComponent
              disable={userSelected.length == 0}
              text="Invite"
              onPress={handleSendInviteNotification}
              type="primary"
            />
          </SectionComponent>
        }
        onClose={onClose}>
        <SectionComponent styles={{paddingVertical: 30}}>
          <TextComponent
            title
            text="Invite Friend"
            size={24}
            font={fontFamily.medium}
          />
          <InputComponent
            styles={{marginTop: 12, marginBottom: 24}}
            placeholder="Search"
            value=""
            onChange={val => console.log(val)}
            suffix={<SearchNormal1 size={20} color={appColors.primary} />}
          />
          {friendIds.length > 0 ? (
            friendIds.map(id => (
              <RowComponent key={id}>
                <View style={{flex: 1}}>
                  <UserComponent
                    userId={id}
                    type="Invite"
                    onPress={() => handleSelectedId(id)}
                  />
                </View>

                <TickCircle
                  size={24}
                  variant="Bold"
                  color={
                    userSelected.includes(id)
                      ? appColors.primary
                      : appColors.gray2
                  }
                />
              </RowComponent>
            ))
          ) : (
            <TextComponent text="No friends" />
          )}
        </SectionComponent>
      </Modalize>
    </Portal>
  );
};

export default ModalInvite;
