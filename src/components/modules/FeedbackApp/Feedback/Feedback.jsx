import PropTypes from 'prop-types';
import css from './feedback.module.scss';

export const FeedbackOptions = ({ options, onLeaveFeedback }) => {
  const items = options.map(el => (
    <li key={el} className={css.item}>
      <button className={css.btn} onClick={onLeaveFeedback}>
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
};
