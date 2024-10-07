import PropTypes from 'prop-types';
import extra from '../../modules/FeedbackApp/Feedback/feedback.module.scss';
import styles from './button.module.scss';
const Button = ({ children, onClick, isVoted }) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className={isVoted ? extra.btn : styles.button}
    >
      {children}
    </button>
  );
};
export default Button;
Button.propTypes = {
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  isVoted: PropTypes.bool,
};
