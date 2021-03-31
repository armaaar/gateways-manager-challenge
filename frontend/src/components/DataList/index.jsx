import React from 'react';
import PropTypes from 'prop-types';
import DataListItem from '../DataListItem';

import styles from './styles.module.sass';

function DataList({items, emptyErrorMessage}) {
  return (
    <div>
      {items.length ?
        items.map((item) => (
          <DataListItem key={item.id} item={item} />
        )) :
        (
        <p className={styles.errorMessage}>
          {emptyErrorMessage}
        </p>
      )}
    </div>
  );
}

DataList.propTypes = {
  items: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        info: PropTypes.arrayOf(
            PropTypes.shape({
              key: PropTypes.string.isRequired,
              name: PropTypes.string.isRequired,
              value: PropTypes.string.isRequired,
            }),
        ),
      }),
  ),
  emptyErrorMessage: PropTypes.string,
};

DataList.defaultProps = {
  items: [],
  emptyErrorMessage: 'The list is empty',
};

export default DataList;

