import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './styles.module.sass';

function Button({className, onClick, children}) {
  return (
    <button onClick={onClick} className={cn(styles.button, className)}>
      {children}
    </button>
  );
}

Button.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
};

Button.defaultProps = {
  className: '',
  onClick: () => {},
};

export default Button;
