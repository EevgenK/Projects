import PropTypes from 'prop-types';
import css from './feedback.module.scss';

export const FeedbackOptions = ({ isVoted, options, onLeaveFeedback }) => {
  const items = options.map(el => (
    <li key={el} className={css.item}>
      <button
        className={isVoted ? css.clicked : css.btn}
        onClick={onLeaveFeedback}
      >
        {el}
      </button>
    </li>
  ));
  return <ul className={css.list}>{items}</ul>;
};

FeedbackOptions.defaultProps = {
  options: [],
};

FeedbackOptions.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  onLeaveFeedback: PropTypes.func.isRequired,
  isVoted: PropTypes.bool.isRequired,
};
