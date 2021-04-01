import React from 'react';
import PropTypes from 'prop-types';
import DataListItem, {itemPropTypes} from '../DataListItem';
import {formFieldsPropTypes} from '../FormCreator';

import styles from './styles.module.sass';

function DataList({
  items,
  emptyErrorMessage,
  formFields,
  onEdit,
  onDelete,
}) {
  return (
    <div>
      {items.length ?
        items.map((item) => (
          <DataListItem
            key={item.id}
            item={item}
            formFields={formFields}
            onEdit={onEdit}
            onDelete={onDelete}
          />
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
  items: PropTypes.arrayOf(itemPropTypes),
  formFields: formFieldsPropTypes,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  emptyErrorMessage: PropTypes.string,
};

DataList.defaultProps = {
  items: [],
  onEdit: () => {},
  onDelete: () => {},
  emptyErrorMessage: 'The list is empty',
};

export default DataList;

