import { SearchNormal1, Sort } from 'iconsax-react-native';
import React, { useEffect, useState } from 'react';
import { TextInput, View } from 'react-native';
import {
  CircleComponent,
  ContainerComponent,
  ListEventComponent,
  LoadingComponent,
  RowComponent,
  SectionComponent,
  TagComponent
} from '../../components';
import appColors from '../../constants/appColors';
import { EventModel } from '../../models/EventModel';
import { globalStyle } from '../../styles/GlobalStyle';

const SearchEvents = ({navigation, route}: any) => {
  const {events}: {events: EventModel[]} = route.params;
  const [searchKey, setSearchKey] = useState('');
  const [results, setResults] = useState<EventModel[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (!searchKey) {
      setResults(events);
    } else {
      // const handleChangeSearchValue = debounce(handleSearchEvent, 300);
      // handleChangeSearchValue();
      handleSearchEvent();
    }
  }, [searchKey, events]);

  const handleSearchEvent = async () => {
    if (!searchKey) return;
    setIsSearching(true);

    const items = await events.filter(element =>
      element.title.toLowerCase().includes(searchKey.toLocaleLowerCase()),
    );

    setResults(items);
    setIsSearching(false);
  };

  return (
    <>
      <ContainerComponent back title="Search">
        <SectionComponent>
          <RowComponent>
            <RowComponent styles={{flex: 1}} onPress={() => {}}>
              <SearchNormal1
                variant="TwoTone"
                color={appColors.primary}
                size={20}
              />
              <View
                style={{
                  width: 1,
                  height: 20,
                  backgroundColor: appColors.primary,
                  marginHorizontal: 10,
                }}
              />
              <TextInput
                placeholder="Search..."
                value={searchKey}
                onChangeText={val => setSearchKey(val)}
                style={[globalStyle.text, {flex: 1}]}
              />
            </RowComponent>
            <TagComponent
              onPress={() => {}}
              label="Filters"
              bgColor="#5D56F3"
              icon={
                <CircleComponent size={20} color={appColors.white}>
                  <Sort size={16} color={appColors.primary} />
                </CircleComponent>
              }
            />
          </RowComponent>
        </SectionComponent>
        {results.length > 0 ? (
          <ListEventComponent items={results} />
        ) : (
          <View style={[globalStyle.center, {flex: 1}]}>
            <LoadingComponent isLoading={isSearching} values={results.length} />
          </View>
        )}
      </ContainerComponent>
    </>
  );
};

export default SearchEvents;
