import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import cn from 'classnames';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import InfoTable from '../InfoTable';
import Button from '../Button';
import Modal from '../Modal';
import FormCreator, {formFieldsPropTypes} from '../FormCreator';

import styles from './styles.module.sass';

function DataListItem({
  item,
  formFields,
  onEdit,
  onDelete,
}) {
  const [isInfoShown, seIsInfoShown] = useState(false);
  const [isEditFormShown, setIsEditFormShown] = useState(false);
  const [isRemoveFormShown, setIsRemoveFormShown] = useState(false);

  const editFormFields = formFields.map((formField) => ({
    ...formField,
    initValue: item.info.find((info) => info.key === formField.key)?.value || formField.initValue,
  }));

  function showEditModal() {
    setIsEditFormShown(true);
  }

  function closeEditModal() {
    setIsEditFormShown(false);
  }

  function showRemoveModal() {
    setIsRemoveFormShown(true);
  }

  function closeRemoveModal() {
    setIsRemoveFormShown(false);
  }

  function toggleInfo() {
    seIsInfoShown(!isInfoShown);
  }

  return (
    <div className={styles.dataListItem}>
      <div className={styles.itemHeader}>
        <h3>{item.name}</h3>
        <div className={styles.optionsContainer}>
          <Button onClick={toggleInfo} className={styles.optionButton}>
            <FontAwesomeIcon icon={['fas', 'eye']} />
          </Button>
          <Button onClick={showEditModal} className={styles.optionButton}>
            <FontAwesomeIcon icon={['fas', 'edit']} />
          </Button>
          <Button onClick={showRemoveModal} className={styles.optionButton}>
            <FontAwesomeIcon icon={['fas', 'trash']} />
          </Button>
        </div>
      </div>
      <div className={cn(
          styles.itemInfoContainer,
          {[styles.itemInfoContainer_shown]: isInfoShown},
      )}>
        {item.info && (
          <>
            <InfoTable infos={item.info} />
            {item.link && (<Link className={styles.link} to={item.link}>{item.linkText}</Link>)}
          </>
        )}
      </div>
      <Modal isShown={isEditFormShown} onClose={closeEditModal}>
        <FormCreator
          referenceKey={item.id}
          resetFlag={isEditFormShown}
          title="Edit"
          fields={editFormFields}
          onSubmit={onEdit}
          onSuccess={closeEditModal}
        />
      </Modal>
      <Modal isShown={isRemoveFormShown} onClose={closeRemoveModal}>
        <FormCreator
          referenceKey={item.id}
          resetFlag={isRemoveFormShown}
          title="Are you sure?"
          fields={[]}
          onSubmit={onDelete}
          onSuccess={closeEditModal}
        />
      </Modal>
    </div>
  );
}

export const itemPropTypes = PropTypes.shape({
  id: PropTypes.any.isRequired,
  name: PropTypes.string.isRequired,
  link: PropTypes.string,
  linkText: PropTypes.string,
  info: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
      }),
  ),
});

DataListItem.propTypes = {
  item: itemPropTypes.isRequired,
  formFields: formFieldsPropTypes,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};

DataListItem.defaultProps = {
  onEdit: () => {},
  onDelete: () => {},
};

export default DataListItem;

