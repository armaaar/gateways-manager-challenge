import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import styles from './styles.module.sass';

export default function PageLoading() {
  return (
    <div className={styles.pageLoading}>
      <FontAwesomeIcon icon={['fas', 'circle-notch']} spin size="6x" />
    </div>
  );
}
