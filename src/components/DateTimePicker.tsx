import {View, Text} from 'react-native';
import React from 'react';
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import RowComponent from './RowComponent';
import {globalStyle} from '../styles/GlobalStyle';
import appColors from '../constants/appColors';
import {ArrowDown2, Calendar, Clock, Timer1} from 'iconsax-react-native';
import TextComponent from './TextComponent';
import {fontFamily} from '../constants/fontFamily';

interface Props {
  type: 'date' | 'time';
  selected?: Date;
  onSelect: (val: Date) => void;
  title?: string;
}

const DateTimePicker = (props: Props) => {
  const {type, selected, onSelect, title} = props;

  const showCalendar = () => {
    DateTimePickerAndroid.open({
      mode: type ?? 'date',
      value: selected ?? new Date(),
      onChange: (_, date?: Date) => onSelect(date || new Date()),
    });
  };

  const valueSelect = (type?: 'date' | 'time', selected?: Date): string => {
    if (!selected) return '';
    switch (type) {
      case 'date':
        return `${selected.getDate()}/${
          selected.getMonth() + 1
        }/${selected.getFullYear()}`;
      case 'time':
        return `${selected.getHours()}:${selected.getMinutes()}`;
      default:
        return '';
    }
  };

  return (
    <>
      <View style={{marginBottom: 16}}>
        {title && (
          <TextComponent size={15} font={fontFamily.medium} text={title} />
        )}
        <RowComponent
          onPress={showCalendar}
          styles={[
            globalStyle.inputContainer,
            {
              paddingHorizontal: 10,
              borderColor: appColors.gray3,
              marginTop: title ? 8 : 0,
            },
          ]}>
          <TextComponent
            flex={1}
            styles={{textAlign:'center'}}
            text={selected ? valueSelect(type, selected) : ''}
            color={selected ? appColors.text : '#676767'}
          />
          {type === 'date' ? (
            <Calendar size={18} color={appColors.gray} />
          ) : (
            <Clock size={18} color={appColors.gray} />
          )}
        </RowComponent>
      </View>
    </>
  );
};

export default DateTimePicker;
