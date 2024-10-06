import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import styles from './image-gallery.module.scss';

const ImageGallery = ({ images, onOpenModal }) => {
  const [hits, setHits] = useState([]);

  useEffect(() => {
    setHits([...images]);
  }, [images]);

  return (
    <ul className={styles.gallery}>
      <ImageGalleryItem items={hits} onOpenModal={onOpenModal} />
    </ul>
  );
};
// ******************************CLASSES******************************************
// import { Component } from 'react';

// class ImageGallery extends Component {
//   state = {
//     hits: [],
//   };

//   componentDidUpdate(prevProps) {
//     const { images: prevImages } = prevProps;
//     const { images: currentImages } = this.props;

//     if (prevImages.length !== currentImages.length) {
//       this.updateSerch();
//     }
//   }
//   updateSerch = () => {
//     this.setState({ hits: [...this.props.images] });
//   };

//   render() {
//     const { hits } = this.state;

//     return (
//       <ul className={styles.gallery}>
//         <ImageGalleryItem items={hits} onOpenModal={this.props.onOpenModal} />
//       </ul>
//     );
//   }
// }

export default ImageGallery;
ImageGallery.defaultProps = {
  images: [],
};
ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.number.isRequired })
  ),
  onOpenModal: PropTypes.func.isRequired,
};
