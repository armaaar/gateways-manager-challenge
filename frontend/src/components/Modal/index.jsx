import React, {useRef} from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import styles from './styles.module.sass';
function Modal({children, isShown, onClose}) {
  const contentRef = useRef(null);

  function onModalClick(ev) {
    if (!contentRef.current || !contentRef.current.contains(ev.target)) {
      onClose();
    }
  }

  return (
    <div
      className={cn(
          styles.modal,
          {[styles.modal_shown]: isShown},
      )}
      onClick={onModalClick}
    >
      <div className={styles.closeButton}>
        <FontAwesomeIcon icon={['fas', 'times']} />
      </div>
      <div className={styles.contentContainer} ref={contentRef}>
        {children}
      </div>
    </div>
  );
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  isShown: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
};

Modal.defaultProps = {
  onClose: () => {},
};

export default Modal;
