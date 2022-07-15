import styles from 'components/ContactList/contactList.module.scss';
import PropTypes from 'prop-types';
import { ContactItem } from 'components/ContactItem/contactItem';
export const ContactList = ({ contacts, onDeleteBtnClick }) => {
  return (
    <ul className={styles.contactList}>
      {contacts.map(({ id, name, number }) => {
        return (
          <ContactItem
            key={id}
            name={name}
            number={number}
            onDeleteBtnClick={() => onDeleteBtnClick(id)}
          />
        );
      })}
    </ul>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    })
  ),
};
