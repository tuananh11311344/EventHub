import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import RNFetchBlob from 'rn-fetch-blob';
import userAPI from '../api/userApi';
import {
  ButtonComponent,
  ButtonImagePicker,
  ChoiceLocation,
  ContainerComponent,
  DateTimePicker,
  DropdownPicker,
  InputComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
} from '../components';
import {SelectModel} from '../models/SelectModel';
import {authSelector} from '../redux/reducers/authReducer';
import {Image} from 'react-native';
import {Validate} from '../utils/validate';
import {EventModel} from '../models/EventModel';
import eventAPI from '../api/eventApi';

const initValue = {
  title: '',
  photoUrl: '',
  description: '',
  titleAddress: '',
  location: {
    address: '',
    lat: 0,
    long: 0,
  },
  users: [],
  authorId: '',
  category: '',
  startAt: Date.now(),
  endAt: Date.now(),
  date: Date.now(),
  price: '',
};

const AddNewScreen = ({navigation}: any) => {
  const auth = useSelector(authSelector);
  const [eventData, setEventData] = useState<EventModel>({
    ...initValue,
    authorId: auth.id,
  });
  const [usersSelect, setUsersSelect] = useState<SelectModel[]>([]);
  const [errorMes, setErrorMes] = useState<{[key: string]: string}>({});

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
    const errors = Validate.EventValidation(eventData);
    if (Object.keys(errors).length > 0) {
      setErrorMes(errors);
      return;
    }

    const api = '/add-new';
    try {
      const res = await eventAPI.HandleEvent(api, eventData, 'post');
      if(res){
        navigation.goBack()
        setEventData(initValue);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const convertUrlToBase64 = async (url: string) => {
    try {
      const response = await RNFetchBlob.fetch('GET', url);
      const base64Data = response.base64();
      const mime = response.respInfo.headers['Content-Type'] || 'image/jpeg';
      const base64Name = `data:${mime};base64,${base64Data}`;
      handleChangeValue('photoUrl', base64Name);
    } catch (error) {
      console.error('Lỗi khi chuyển URL thành base64:', error);
      return null;
    }
  };
  return (
    <ContainerComponent isScroll back onBack={()=> setEventData(initValue)} title="Add New Event">
      <SectionComponent>
        <ButtonImagePicker
          onSelect={val => {
            val.type === 'url'
              ? convertUrlToBase64(val.value as string)
              : handleChangeValue('photoUrl', val.value);
          }}
          errorMessage={errorMes.photoUrl}
        />
        {eventData.photoUrl && (
          <Image
            source={{uri: eventData.photoUrl}}
            style={{width: '100%', height: 250, marginBottom: 20}}
            resizeMode="cover"
          />
        )}
        <InputComponent
          title="Title"
          placeholder="Enter a event title"
          value={eventData.title}
          onChange={val => handleChangeValue('title', val)}
          allowClear
          errorMessage={errorMes.title}
        />
        <InputComponent
          title="Description"
          placeholder="Enter a event description"
          value={eventData.description}
          onChange={val => handleChangeValue('description', val)}
          multiline
          numberOfLine={3}
          allowClear
          errorMessage={errorMes.description}
        />

        <DropdownPicker
          label="Category"
          selected={eventData.category}
          values={[
            {
              label: 'Sports',
              value: 'sports',
            },
            {
              label: 'Food',
              value: 'food',
            },
            {
              label: 'Art',
              value: 'art',
            },
            {
              label: 'Music',
              value: 'music',
            },
          ]}
          onSelect={val => handleChangeValue('category', val)}
          errorMessage={errorMes.category}
        />

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
        <InputComponent
          title="Price"
          placeholder="Enter a event price"
          value={eventData.price}
          onChange={val => handleChangeValue('price', val)}
          allowClear
          type="number-pad"
          errorMessage={errorMes.price}
        />
        <InputComponent
          title="Title dddress"
          placeholder="Enter a title address"
          allowClear
          value={eventData.titleAddress}
          onChange={val => handleChangeValue('titleAddress', val)}
          errorMessage={errorMes.titleAddress}
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
          errorMessage={errorMes.location}
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
