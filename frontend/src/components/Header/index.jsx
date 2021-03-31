import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {DEFAULT_TITLE} from '../../utils/constants';

import styles from './styles.module.sass';

function Header({title}) {
  return (
    <header className={styles.header}>
      <Link to="/">
        <h1 className={styles.title}>
          {title}
        </h1>
      </Link>
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string,
};

Header.defaultProps = {
  title: DEFAULT_TITLE,
};

export default Header;
