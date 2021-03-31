import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import styles from './styles.module.sass';

export default function Loader() {
  return (
    <div className={styles.loader}>
      <FontAwesomeIcon icon={['fas', 'circle-notch']} spin size="6x" />
    </div>
  );
}
