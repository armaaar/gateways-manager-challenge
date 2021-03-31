import React from 'react';
import Loader from '../Loader';

import styles from './styles.module.sass';

export default function PageLoading() {
  return (
    <div className={styles.pageLoading}>
      <Loader />
    </div>
  );
}
