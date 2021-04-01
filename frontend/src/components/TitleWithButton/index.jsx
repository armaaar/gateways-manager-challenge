import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Header';
import Button from '../Button';

import styles from './styles.module.sass';

function TitleWithButton({title, onButtonClick, children}) {
  return (
    <div className={styles.header}>
      <h2>{title}</h2>
      <Button onClick={onButtonClick}>
        {children}
      </Button>
    </div>
  );
}

TitleWithButton.propTypes = {
  title: PropTypes.string.isRequired,
  onButtonClick: PropTypes.func,
  children: PropTypes.node.isRequired,
};

Header.defaultProps = {
  onButtonClick: () => {},
};

export default TitleWithButton;
