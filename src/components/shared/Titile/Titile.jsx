import PropTypes from 'prop-types';

import styles from './title.module.scss';

const Title = ({ text }) => <h2 className={styles.title}>{text}</h2>;
export default Title;
Title.propTypes = {
  text: PropTypes.string.isRequired,
};
