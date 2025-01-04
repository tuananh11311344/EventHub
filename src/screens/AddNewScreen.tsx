import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {
  ButtonComponent,
  ChoiceLocation,
  ContainerComponent,
  DateTimePicker,
  DropdownPicker,
  InputComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
} from '../components';
import {authSelector} from '../redux/reducers/authReducer';
import userAPI from '../api/userApi';
import {SelectModel} from '../models/SelectModel';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initValue = {
  title: '',
  imageUrl: '',
  description: '',
  location: {
    address: '',
    lat: 0,
    long: 0,
  },
  users: [],
  authorId: '',
  startAt: new Date(),
  endAt: new Date(),
  date: new Date(),
};

const AddNewScreen = () => {
  const auth = useSelector(authSelector);
  const [eventData, setEventData] = useState({...initValue, authorId: auth.id});
  const [usersSelect, setUsersSelect] = useState<SelectModel[]>([]);

  useEffect(() => {
    handleGetAllUsers();
  }, []);

  const handleGetAllUsers = async () => {
    const api = '/get-all';
    try {
      const res = await userAPI.HandleUser(api);
      if (res && res.data) {
        const items: SelectModel[] = [];
        res.data.map((item: any) => {
          if (item.email !== auth.email) {
            items.push({
              value: item.id,
              label: item.email,
            });
          }
        });
        setUsersSelect(items);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleChangeValue = (key: string, value: any) => {
    const items: any = {...eventData};

    items[`${key}`] = value;
    setEventData(items);
  };
  const handleAddEvent = async () => {
    // console.log(eventData);
    // console.log(usersSelect);
  };
  return (
    <ContainerComponent isScroll back title="Add New Event">
      <SectionComponent>
        <InputComponent
          title="Title"
          placeholder="Enter a event title"
          value={eventData.title}
          onChange={val => handleChangeValue('title', val)}
          allowClear
        />
        <InputComponent
          title="Description"
          placeholder="Enter a event description"
          value={eventData.description}
          onChange={val => handleChangeValue('description', val)}
          multiline
          numberOfLine={5}
          allowClear
        />
        {/* <InputComponent
          placeholder="Title Address"
          multiline
          numberOfLine={3}
          allowClear
          value={eventData.location.title}
          onChange={val =>
            handleChangeValue('location', {...eventData.location, title: val})
          }
        /> */}

        <DateTimePicker
          title="DateTime"
          selected={eventData.date}
          type="date"
          onSelect={val => handleChangeValue('date', val)}
        />

        <RowComponent styles={{marginHorizontal: 30}}>
          <DateTimePicker
            title="Start At"
            selected={eventData.startAt}
            type="time"
            onSelect={val => handleChangeValue('startAt', val)}
          />
          <SpaceComponent width={20} />
          <DateTimePicker
            title="End At"
            selected={eventData.endAt}
            type="time"
            onSelect={val => handleChangeValue('endAt', val)}
          />
        </RowComponent>
        <DropdownPicker
          values={usersSelect}
          selected={eventData.users}
          onSelect={val => handleChangeValue('users', val)}
          label="Invite users"
          multiple
        />
        <ChoiceLocation
          title="Location"
          onSelect={location =>
            handleChangeValue('location', {
              address: location.display_name,
              lat: location.lat,
              long: location.long,
            })
          }
        />
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
