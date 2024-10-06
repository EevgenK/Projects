import PropTypes from 'prop-types';
import styles from '../image-gallery.module.scss';

const ImageGalleryItem = ({ items, onOpenModal }) => {
  return items.map(({ id, webformatURL, largeImageURL, tags }) => {
    return (
      <li
        key={id}
        className={styles.item}
        onClick={() => onOpenModal(largeImageURL, tags)}
      >
        <img className={styles.image} src={webformatURL} alt={tags} />
      </li>
    );
  });
};
export default ImageGalleryItem;
ImageGalleryItem.defaultProps = {
  items: [],
};
ImageGalleryItem.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
  onOpenModal: PropTypes.func.isRequired,
};
