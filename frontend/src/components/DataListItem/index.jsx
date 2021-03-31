import React, {useState} from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import InfoTable from '../InfoTable';

import styles from './styles.module.sass';

function DataListItem({item}) {
  const [isInfoShown, seIsInfoShown] = useState(false);

  function toggleInfo() {
    seIsInfoShown(!isInfoShown);
  }

  return (
    <div className={styles.dataListItem}>
      <div className={styles.itemHeader}>
        <h3>{item.name}</h3>
        <div className={styles.optionsContainer}>
          <button onClick={toggleInfo} className={styles.optionButton}>
            <FontAwesomeIcon icon={['fas', 'eye']} />
          </button>
          <button className={styles.optionButton}>
            <FontAwesomeIcon icon={['fas', 'edit']} />
          </button>
          <button className={styles.optionButton}>
            <FontAwesomeIcon icon={['fas', 'trash']} />
          </button>
        </div>
      </div>
      <div className={cn(
          styles.itemInfoContainer,
          {[styles.itemInfoContainer_shown]: isInfoShown},
      )}>
        {item.info && (
          <InfoTable infos={item.info} />
        )}
      </div>
    </div>
  );
}

DataListItem.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    info: PropTypes.arrayOf(
        PropTypes.shape({
          key: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
          value: PropTypes.string.isRequired,
        }),
    ),
  }).isRequired,
};

DataListItem.defaultProps = {};

export default DataListItem;

