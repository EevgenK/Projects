import PropTypes from 'prop-types';
import { MagnifyingGlass } from 'react-loader-spinner';
import styles from './loader.module.scss';
const Loader = ({ message }) => {
  return (
    <div className={styles.glass}>
      <h3 className={styles.message}>{message}</h3>
      <MagnifyingGlass
        visible={true}
        height="200"
        width="200"
        ariaLabel="magnifying-glass-loading"
        wrapperStyle={{}}
        wrapperClass="magnifying-glass-wrapper"
        glassColor="#c0efff"
        color="#3f51b5"
      />
    </div>
  );
};
export default Loader;
Loader.propTypes = {
  message: PropTypes.string.isRequired,
};
