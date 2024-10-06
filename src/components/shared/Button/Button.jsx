import PropTypes from 'prop-types';

import styles from './button.module.scss';
const Button = ({ children, onClick }) => {
  return (
    <button onClick={onClick} type="button" className={styles.button}>
      {children}
    </button>
  );
};
export default Button;
Button.propTypes = {
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};
