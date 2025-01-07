import {View, Text} from 'react-native';
import React from 'react';
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import RowComponent from './RowComponent';
import {globalStyle} from '../styles/GlobalStyle';
import appColors from '../constants/appColors';
import {ArrowDown2, Calendar, Clock} from 'iconsax-react-native';
import TextComponent from './TextComponent';
import {fontFamily} from '../constants/fontFamily';

interface Props {
  type: 'date' | 'time';
  selected?: number; // Sử dụng số timestamp thay vì Date
  onSelect: (val: number) => void; // Trả về số timestamp
  title?: string;
}

const DateTimePicker = (props: Props) => {
  const {type, selected, onSelect, title} = props;

  const showCalendar = () => {
    // Chuyển timestamp (number) thành Date để sử dụng trong picker
    DateTimePickerAndroid.open({
      mode: type ?? 'date',
      value: selected ? new Date(selected) : new Date(),
      onChange: (_, date?: Date) => {
        if (date) {
          onSelect(date.getTime()); // Trả về timestamp (number)
        }
      },
    });
  };

  const valueSelect = (type?: 'date' | 'time', selected?: number): string => {
    if (!selected) return '';
    const date = new Date(selected); // Chuyển timestamp thành Date để hiển thị
    switch (type) {
      case 'date':
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
      case 'time':
        return `${date.getHours()}:${date.getMinutes()}`;
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
            styles={{textAlign: 'center'}}
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
