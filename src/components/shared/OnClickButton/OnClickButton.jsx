import styles from './onclick-button.module.scss';
import PropTypes from 'prop-types';
const OnClickButton = ({ text, onClick }) => {
  return (
    <button type="button" className={styles.butt} onClick={onClick}>
      {text}
    </button>
  );
};
export default OnClickButton;
OnClickButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
