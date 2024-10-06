import PropTypes from 'prop-types';

import styles from '../contact-list.module.scss';
const ContactItem = ({ items, remove }) => {
  return items.map(el => {
    return (
      <li key={el.id} className={styles.item}>
        {el.name}: {el.number}
        <button
          className={styles.btn}
          type="button"
          onClick={() => remove(el.id)}
        >
          x
        </button>
      </li>
    );
  });
};
export default ContactItem;
ContactItem.defaultProps = {
  items: [],
};

ContactItem.propTypes = {
  remove: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
};
