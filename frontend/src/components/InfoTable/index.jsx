import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.module.sass';

function InfoTable({infos, emptyErrorMessage}) {
  return (
    <div>
      {infos.length ? (
        <table className={styles.table}>
          <tbody>
            {infos.map((info) => (
              <tr key={info.key} className={styles.tableInfoRow}>
                <th className={styles.tableInfoName}>{info.name}</th>
                <td className={styles.tableInfoValue}>{info.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className={styles.errorMessage}>
          {emptyErrorMessage}
        </p>
      )}
    </div>
  );
}

InfoTable.propTypes = {
  infos: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
      }),
  ),
  emptyErrorMessage: PropTypes.string,
};

InfoTable.defaultProps = {
  items: [],
  emptyErrorMessage: 'The list is empty',
};

export default InfoTable;

