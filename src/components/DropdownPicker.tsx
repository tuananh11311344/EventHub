import {
  View,
  Text,
  StyleSheet,
  Button,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {SelectModel} from '../models/SelectModel';
import TextComponent from './TextComponent';
import {fontFamily} from '../constants/fontFamily';
import RowComponent from './RowComponent';
import {ArrowDown2, SearchNormal1} from 'iconsax-react-native';
import appColors from '../constants/appColors';
import {globalStyle} from '../styles/GlobalStyle';
import {Modalize} from 'react-native-modalize';
import {Portal} from 'react-native-portalize';
import {appInfo} from '../constants/appInfo';
import InputComponent from './InputComponent';
import ButtonComponent from './ButtonComponent';
import SpaceComponent from './SpaceComponent';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

interface Props {
  label?: string;
  values: SelectModel[];
  selected?: string | string[];
  onSelect: (val: string | string[]) => void;
  multiple?: boolean;
  errorMessage?: string;
}

const DropdownPicker = (props: Props) => {
  const {label, values, selected, onSelect, multiple, errorMessage} = props;
  const [isVisibleModalize, setIsVisibleModalize] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string[]>([]);
  const [searchKey, setSearchKey] = useState('');
  const modalizeRef = useRef<Modalize>();
  const [result, setResult] = useState<SelectModel[]>([]);

  useEffect(() => {
    if (isVisibleModalize) {
      modalizeRef.current?.open();
    } else {
      modalizeRef.current?.close();
    }
  }, [isVisibleModalize]);

  useEffect(() => {
    if (!searchKey) {
      setResult([]);
    } else {
      const data = values.filter(element =>
        element.label.toLowerCase().includes(searchKey.toLowerCase()),
      );
      setResult(data);
    }
  }, [searchKey]);

  useEffect(() => {
    if (isVisibleModalize && selected && selected?.length > 0 && multiple) {
      setSelectedItem(selected as string[]);
    }
  }, [isVisibleModalize, selected]);

  const handleCloseModal = () => {
    setSearchKey('');
    modalizeRef.current?.close();
  };

  const handleSelectItem = (id: string) => {
    if (selectedItem.includes(id)) {
      const data = [...selectedItem];
      const index = selectedItem.findIndex(item => item === id);

      if (index !== -1) {
        data.splice(index, 1);
      }
      setSelectedItem(data);
    } else {
      setSelectedItem([...selectedItem, id]);
    }
  };

  const renderSelectedItem = (id: string) => {
    const item = values.find(val => val.value === id);
    return item ? (
      <RowComponent
        styles={[localStyle.selectedItem]}
        key={id}
        justify="space-between">
        <TextComponent text={item.label} color={appColors.primary} />
        <TouchableOpacity>
          <AntDesign
            name="close"
            onPress={() => {
              const updatedItems = selectedItem.filter(item => item !== id);
              setSelectedItem(updatedItems);
              onSelect(updatedItems);
            }}
            size={16}
            color={appColors.gray4}
          />
        </TouchableOpacity>
      </RowComponent>
    ) : (
      <></>
    );
  };

  const renderSelectItem = (item: SelectModel) => {
    return (
      <RowComponent
        onPress={
          multiple
            ? () => handleSelectItem(item.value)
            : () => {
                onSelect(item.value);
                handleCloseModal();
              }
        }
        key={item.value}
        styles={localStyle.listItem}>
        <TextComponent
          text={item.label}
          flex={1}
          font={
            selectedItem?.includes(item.value)
              ? fontFamily.medium
              : fontFamily.regular
          }
          color={
            selectedItem?.includes(item.value)
              ? appColors.primary
              : appColors.text
          }
        />
        {selectedItem?.includes(item.value) && (
          <MaterialCommunityIcons
            name="checkbox-marked-circle-outline"
            size={22}
            color={appColors.primary}
          />
        )}
      </RowComponent>
    );
  };
  return (
    <View style={{marginBottom: 19}}>
      {label && (
        <TextComponent size={15} font={fontFamily.medium} text={label} />
      )}
      <RowComponent
        styles={[
          globalStyle.inputContainer,
          {
            borderColor: errorMessage ? appColors.danger : appColors.gray2,
            marginTop: label ? 8 : 0,
            alignItems: 'flex-start',
          },
        ]}
        onPress={() => setIsVisibleModalize(true)}>
        <RowComponent styles={{flex: 1, flexWrap: 'wrap'}}>
          {selected ? (
            selectedItem.length > 0 ? (
              selectedItem.map(element => renderSelectedItem(element))
            ) : (
              <TextComponent
                text={
                  values.find(element => element.value === selected)?.label ??
                  ''
                }
              />
            )
          ) : (
            <TextComponent text="Select" />
          )}
        </RowComponent>
        <ArrowDown2 size={18} color={appColors.gray} />
      </RowComponent>
      {errorMessage && (
        <Text style={globalStyle.errorMessage}>{errorMessage}</Text>
      )}
      <Portal>
        <Modalize
          handlePosition="inside"
          modalHeight={appInfo.sizes.HEIGHT - 10}
          ref={modalizeRef}
          onClose={() => setIsVisibleModalize(false)}
          scrollViewProps={{showsVerticalScrollIndicator: false}}
          FooterComponent={
            multiple && (
              <View style={{paddingHorizontal: 20, paddingBottom: 20}}>
                <ButtonComponent
                  type="primary"
                  text="Invite"
                  onPress={() => {
                    onSelect(selectedItem);
                    modalizeRef.current?.close();
                  }}
                />
              </View>
            )
          }
          HeaderComponent={
            <RowComponent
              styles={{marginBottom: 12, paddingHorizontal: 20, marginTop: 30}}>
              <View style={{flex: 1}}>
                <InputComponent
                  styles={{marginBottom: -15}}
                  placeholder="Search..."
                  value={searchKey}
                  onChange={val => setSearchKey(val)}
                  allowClear
                  affix={<SearchNormal1 size={20} color={appColors.gray4} />}
                />
              </View>
              <SpaceComponent width={15} />
              <ButtonComponent
                type="link"
                text="Cancel"
                onPress={handleCloseModal}
              />
            </RowComponent>
          }>
          <View style={{paddingHorizontal: 20, paddingVertical: 30}}>
            {result.length > 0
              ? result.map(item => renderSelectItem(item))
              : values && values.map(item => renderSelectItem(item))}
          </View>
        </Modalize>
      </Portal>
    </View>
  );
};

export default DropdownPicker;

const localStyle = StyleSheet.create({
  listItem: {
    marginBottom: 15,
  },
  selectedItem: {
    borderWidth: 1,
    borderColor: appColors.gray3,

    padding: 4,
    marginBottom: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    minWidth: 250,
  },
});
