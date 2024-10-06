import PropTypes from 'prop-types';
import ContactItem from './ContactItem/ContactItem';
import { Notification } from '../../../shared/Notification/Notification';
import styles from './contact-list.module.scss';

const ContactList = ({ contacts, handleRemove }) => {
  return (
    <ul className={styles.list}>
      {contacts.length === 0 ? (
        <Notification message="No any contacts were found!" />
      ) : (
        <ContactItem items={contacts} remove={handleRemove} />
      )}
    </ul>
  );
};

export default ContactList;
ContactList.defaultProps = {
  contacts: [],
};
ContactList.propTypes = {
  handleRemove: PropTypes.func.isRequired,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
};
