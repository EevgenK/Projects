import PropTypes from 'prop-types';
import css from './statistics.module.css';

export const Statistics = props => {
  const items = Object.keys(props).map(el => (
    <li key={el} className={css.item}>
      {el}: {props[el]}
    </li>
  ));
  return <ul className={css.list}>{items}</ul>;
};
Statistics.propTypes = {
  props: PropTypes.shape({
    good: PropTypes.number.isRequired,
    neutral: PropTypes.number.isRequired,
    bad: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    positiveFeedback: PropTypes.string.isRequired,
  }),
};
