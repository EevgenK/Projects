import PropTypes from 'prop-types';

import styles from './contact-filter.module.scss';

const ContactFilter = ({ handleChange, value }) => {
  return (
    <div className={styles.formGroup}>
      <label htmlFor="filterInp" className={styles.label}>
        Find contacts by name or phone number
      </label>
      <input
        id="filterInp"
        className={styles.input}
        name="filter"
        placeholder="Filter contacts"
        onChange={handleChange}
        value={value}
      />
    </div>
  );
};
export default ContactFilter;

ContactFilter.propTypes = {
  handleChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};
