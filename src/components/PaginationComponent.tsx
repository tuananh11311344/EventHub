import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {PaginatonModel} from '../models/PaginationModel';
import appColors from '../constants/appColors';

interface Props {
  pagination: PaginatonModel;
  onPageChange: (page: number) => void;
}

const PaginationComponent = (props: Props) => {
  const {pagination, onPageChange} = props;
  const {currentPage, totalPages, hasNext, hasPrev, nextPage, prevPage} =
    pagination;

  const renderPageNumbers = () => {
    let pages = [];
    const maxVisiblePages = 3;
    const startPage = Math.max(
      1,
      Math.min(
        currentPage - Math.floor(maxVisiblePages / 2),
        totalPages - maxVisiblePages + 1,
      ),
    );
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <TouchableOpacity
          key={i}
          style={[
            styles.pageNumber,
            i === currentPage ? styles.activePage : styles.inactivePage,
          ]}
          onPress={() => onPageChange(i)}>
          <Text
            style={i === currentPage ? styles.activeText : styles.inactiveText}>
            {i}
          </Text>
        </TouchableOpacity>,
      );
    }

    if (startPage > 1) {
      pages.unshift(
        <Text key="start-ellipsis" style={styles.ellipsis}>
          ...
        </Text>,
      );
      pages.unshift(
        <TouchableOpacity
          key={1}
          style={[styles.pageNumber, styles.inactivePage]}
          onPress={() => onPageChange(1)}>
          <Text style={styles.inactiveText}>1</Text>
        </TouchableOpacity>,
      );
    }

    if (endPage < totalPages) {
      pages.push(
        <Text key="end-ellipsis" style={styles.ellipsis}>
          ...
        </Text>,
      );
      pages.push(
        <TouchableOpacity
          key={totalPages}
          style={[styles.pageNumber, styles.inactivePage]}
          onPress={() => onPageChange(totalPages)}>
          <Text style={styles.inactiveText}>{totalPages}</Text>
        </TouchableOpacity>,
      );
    }

    return pages;
  };

  return (
    <View style={styles.paginationContainer}>
      <TouchableOpacity
        style={[styles.navButton, hasPrev === false && styles.disabledButton]}
        onPress={() => hasPrev !== false && onPageChange(prevPage)}
        disabled={hasPrev === null}>
        <Text style={styles.navText}>Prev</Text>
      </TouchableOpacity>

      <View style={styles.pageNumbersContainer}>{renderPageNumbers()}</View>

      <TouchableOpacity
        style={[styles.navButton, hasNext === false && styles.disabledButton]}
        onPress={() => hasNext !== false && onPageChange(nextPage)}
        disabled={hasNext === false}>
        <Text style={styles.navText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  paginationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  navButton: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: appColors.primary,
    marginHorizontal: 5,
  },
  disabledButton: {
    backgroundColor: appColors.gray2
  },
  navText: {
    color: appColors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  pageNumbersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  pageNumber: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderRadius: 5,
    marginHorizontal: 3,
  },
  activePage: {
    backgroundColor: appColors.primary,
    borderColor: appColors.primary,
  },
  inactivePage: {
    borderColor: appColors.primary,
  },
  activeText: {
    color: appColors.white,
    fontWeight: 'bold',
  },
  inactiveText: {
    color: appColors.primary,
  },
  ellipsis: {
    color: appColors.text,
    fontSize: 16,
    marginHorizontal: 3,
  },
});

export default PaginationComponent;
