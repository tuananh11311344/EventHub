import React, { useEffect, useRef, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { Portal } from 'react-native-portalize';
import { useSelector } from 'react-redux';
import userAPI from '../api/userApi';
import {
  ButtonComponent,
  RowComponent,
  SectionComponent,
  TextComponent,
} from '../components';
import appColors from '../constants/appColors';
import { Category } from '../models/CategoryModel';
import { authSelector } from '../redux/reducers/authReducer';
import { globalStyle } from '../styles/GlobalStyle';

interface Props {
  visible: boolean;
  onClose: () => void;
  onSelected: () => void;
  selected?: string[];
  category: Category[];
}

const ModalSelectCategories = (props: Props) => {
  const {visible, onClose, onSelected, selected, category} = props;
  const [catsSelected, setCatsSelected] = useState<string[]>(selected ?? []);
  const modalizeRef = useRef<Modalize>();
  const auth = useSelector(authSelector);  

  useEffect(() => {
    if (visible) {
      modalizeRef.current?.open();
    } else {
      modalizeRef.current?.close();
    }
  }, [visible]);

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
      await userAPI.HandleUser(api, catsSelected, 'post');
      onSelected();
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
