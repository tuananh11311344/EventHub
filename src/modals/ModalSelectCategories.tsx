import {View, Text, Touchable, TouchableOpacity} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {Category} from '../models/CategoryModel';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import appColors from '../constants/appColors';
import {ChefFork, ChefForkGreen} from '../assets/svgs';
import {Portal} from 'react-native-portalize';
import {Modalize, useModalize} from 'react-native-modalize';
import {
  ButtonComponent,
  RowComponent,
  SectionComponent,
  TextComponent,
} from '../components';
import eventAPI from '../api/eventApi';
import {globalStyle} from '../styles/GlobalStyle';
import {useSelector} from 'react-redux';
import {authSelector} from '../redux/reducers/authReducer';
import userAPI from '../api/userApi';

interface Props {
  visible: boolean;
  onClose: () => void;
  onSelected: (vals: string[]) => void;
  selected?: string[];
}

const ModalSelectCategories = (props: Props) => {
  const {visible, onClose, onSelected, selected} = props;
  const [category, setCategory] = useState<Category[]>([]);
  const [catsSelected, setCatsSelected] = useState<string[]>(selected ?? []);
  const modalizeRef = useRef<Modalize>();
  const auth = useSelector(authSelector);

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    if (visible) {
      modalizeRef.current?.open();
    } else {
      modalizeRef.current?.close();
    }
  }, [visible]);

  const getCategories = async () => {
    const api = `/get-categories`;
    try {
      const res: any = await eventAPI.HandleEvent(api);
      setCategory(res.data);
    } catch (error) {
      console.log('Get categories error:', error);
    }
  };

  const onSelectedCategory = async (id: string) => {
    const items = [...catsSelected];
    const index = items.findIndex(element => element === id);
    if (index !== -1) {
      items.splice(index, 1);
      setCatsSelected(items);
    } else {
      setCatsSelected([...items, id]);
    }
  };

  const handleUpdateInterest = async () => {
    const api = `/update-interests?uid=${auth.id}`;
    try {
      const res = await userAPI.HandleUser(api, catsSelected, 'post');
      onSelected(catsSelected);
    } catch (error) {
      console.log('Update interests error:', error);
    }
  };

  return (
    <Portal>
      <Modalize
        adjustToContentHeight
        handlePosition="inside"
        ref={modalizeRef}
        onClose={onClose}>
        <SectionComponent styles={{padding: 30}}>
          <RowComponent>
            {category &&
              category.length > 0 &&
              category.map(item => (
                <TouchableOpacity
                  onPress={() => onSelectedCategory(item._id)}
                  style={[
                    globalStyle.shadow,
                    globalStyle.center,
                    {
                      padding: 12,
                      marginRight: 8,
                      marginBottom: 8,
                      backgroundColor: appColors.white,
                      borderRadius: 12,
                      minWidth: 80,
                      borderWidth: 1,
                      borderColor: catsSelected?.includes(item._id)
                        ? appColors.primary
                        : appColors.white,
                    },
                  ]}
                  key={item._id}>
                  <TextComponent text={item.title} />
                </TouchableOpacity>
              ))}
          </RowComponent>
        </SectionComponent>
        <SectionComponent>
          <ButtonComponent
            text="Confirm"
            onPress={handleUpdateInterest}
            type="primary"
          />
        </SectionComponent>
      </Modalize>
    </Portal>
  );
};

export default ModalSelectCategories;
