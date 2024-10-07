import PropTypes from 'prop-types';
import css from './notification.module.scss';
export const Notification = ({ message }) => (
  <p className={css.notification}>{message}</p>
);
Notification.propTypes = {
  message: PropTypes.string.isRequired,
};
