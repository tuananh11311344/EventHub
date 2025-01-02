import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {
  ButtonComponent,
  ChoiceLocation,
  ContainerComponent,
  InputComponent,
  SectionComponent,
  TextComponent,
} from '../components';
import {useSelector} from 'react-redux';
import {authSelector} from '../redux/reducers/authReducer';

const initValue = {
  title: '',
  imageUrl: '',
  description: '',
  location: {
    title: '',
    address: '',
  },
  users: [''],
  authorId: '',
  startAt: Date.now(),
  endAt: Date.now(),
  date: Date.now(),
};

const AddNewScreen = () => {
  const auth = useSelector(authSelector);
  const [eventData, setEventData] = useState({...initValue, authorId: auth.id});

  const handleChangeValue = (key: string, value: string) => {
    const items: any = {...eventData};

    items[`${key}`] = value;
    setEventData(items);
  };
  const handleAddEvent = async () => {
    console.log(eventData);
  };
  return (
    <ContainerComponent isScroll>
      <SectionComponent>
        <TextComponent text="Add new event" title />
      </SectionComponent>
      <SectionComponent>
        <InputComponent
          placeholder="Title"
          value={eventData.title}
          onChange={val => handleChangeValue('title', val)}
          allowClear
        />
        <InputComponent
          placeholder="Description"
          value={eventData.description}
          onChange={val => handleChangeValue('description', val)}
          multiline
          numberOfLine={5}
          allowClear
        />
        <InputComponent
          placeholder="Title Address"
          multiline
          numberOfLine={3}
          allowClear
          value={eventData.location.title}
          onChange={val =>
            handleChangeValue('location', {...eventData.location, title: val})
          }
        />
        <ChoiceLocation />
      </SectionComponent>
      <SectionComponent>
        <ButtonComponent
          text="Add New"
          type="primary"
          onPress={handleAddEvent}
        />
      </SectionComponent>
    </ContainerComponent>
  );
};

export default AddNewScreen;
