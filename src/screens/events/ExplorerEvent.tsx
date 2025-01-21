import { ArrowRight, SearchNormal1 } from 'iconsax-react-native';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import eventAPI from '../../api/eventApi';
import { Calendar } from '../../assets/svgs';
import {
  ButtonComponent,
  ContainerComponent,
  ListEventComponent,
  PaginationComponent,
  RowComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import appColors from '../../constants/appColors';
import { LoadingModal } from '../../modals';
import { EventModel } from '../../models/EventModel';
import { PaginatonModel } from '../../models/PaginationModel';
import { globalStyle } from '../../styles/GlobalStyle';

const ExplorerEvent = ({navigation, route}: any) => {
  const {filter, currentLocation, authId, category} = route.params;
  const [events, setEvents] = useState<EventModel[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [pagination, setPagination] = useState<PaginatonModel>({
    currentPage: 1,
    hasNext: false,
    hasPrev: false,
    nextPage: 0,
    prevPage: 0,
    totalPages: 1,
    totalRecords: 0,
  });

  useEffect(() => {
    if (filter) {
      getEvents();
    }
  }, [filter, currentLocation]);

  const handlePageChange = async (newPage: number) => {
    setPagination(prev => ({
      ...prev,
      currentPage: newPage,
    }));
  
    await getEvents(newPage);
  };
  
  const getEvents = async (page = pagination.currentPage) => {
    setIsLoading(true);
    let api = '';
    try {
      const limit = 5;
      switch (filter) {
        case 'upcoming':
          api = `/get-events?date=${new Date().getTime()}&page=${page}&limit=${limit}`;
          setTitle('Upcoming Events');
          break;
        case 'nearby':
          if (currentLocation) {
            api = `/get-events?lat=${currentLocation.position.lat}&long=${currentLocation.position.lng}&distance=5&page=${page}&limit=${limit}`;
            setTitle('Nearby Events');
          } else {
            throw new Error('Missing location data');
          }
          break;
        case category:
          api = `/get-events?authId=${authId}&category=${category}&page=${page}&limit=${limit}`;
          setTitle(category);
          break;
        default:
          api = `/get-events?page=${page}&limit=${limit}`;
          setTitle('Events');
          break;
      }
      const res: any = await eventAPI.HandleEvent(api);
      if (res?.data) {
        setEvents(res.data);
        setPagination(res.pagination);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <>
      <ContainerComponent
        back
        title={title}
        right={
          events &&
          events.length > 0 && (
            <RowComponent>
              <ButtonComponent
                onPress={() =>
                  navigation.navigate('SearchEvents', {
                    events,
                  })
                }
                icon={<SearchNormal1 size={20} color={appColors.text} />}
              />
              <SpaceComponent width={16} />
              <ButtonComponent
                icon={
                  <MaterialIcons
                    name="more-vert"
                    size={20}
                    color={appColors.text}
                  />
                }
              />
            </RowComponent>
          )
        }>
        {events.length > 0 ? (
          <>
            <ListEventComponent items={events} />
            {pagination && (
              <PaginationComponent
                pagination={pagination}
                onPageChange={handlePageChange}
              />
            )}
          </>
        ) : (
          <View style={[globalStyle.center, {flex: 1}]}>
            <View style={[globalStyle.center, {flex: 1}]}>
              <Calendar />
              <SpaceComponent height={20} />
              <TextComponent title text="No Event" />
            </View>
            <RowComponent>
              <ButtonComponent
                text="Explore Events "
                type="primary"
                icon={<ArrowRight size={20} color={appColors.white} />}
                iconFlex="right"
                onPress={() =>
                  navigation.navigate('ExplorerEvent', {
                    filter: 'all',
                  })
                }
              />
            </RowComponent>
          </View>
        )}
      </ContainerComponent>
      <LoadingModal visible={isLoading} />
    </>
  );
};

export default ExplorerEvent;
