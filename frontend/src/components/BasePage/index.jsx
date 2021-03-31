import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Header';

import styles from './styles.module.sass';

function BasePage({title, children}) {
  return (
    <main>
      <Header title={title} />
      <section className={styles.container}>
        {children}
      </section>
    </main>
  );
}

BasePage.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
};

Header.defaultProps = {
  title: Header.defaultProps.title,
};

export default BasePage;
