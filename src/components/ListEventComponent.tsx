import {View, Text, FlatList} from 'react-native';
import React from 'react';
import {EventModel} from '../models/EventModel';
import EventItem from './EventItem';
import {appInfo} from '../constants/appInfo';

interface Props {
  items: EventModel[];
}

const ListEventComponent = (props: Props) => {
  const {items} = props;
  return (
    <FlatList
      data={items}
      renderItem={({item}) => (
        <EventItem
          item={item}
          type="list"
          key={item._id}
          styles={{flex: 1, width: undefined}}
        />
      )}
    />
  );
};

export default ListEventComponent;
