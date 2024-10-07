import { useState, useEffect } from 'react';
import { Notify } from 'notiflix';

import ImageGallery from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';
import OnClickButton from '../../shared/OnClickButton/OnClickButton';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import ErrorCard from 'components/shared/ErrorCard/ErrorCard';
import { getGallery } from 'helpers/api/pixabay/getGallery';

import styles from './search-images.module.scss';

const SerchImages = ({ isFetched }) => {
  const [images, setImages] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [imgForModal, setImgForModal] = useState(null);

  const stateChange = search => {
    isFetched('true');
    setSearch(search);
    setImages([]);
    setPage(1);
  };
  useEffect(() => {
    if (!search) {
      return;
    }
    const fetchImages = async () => {
      try {
        setIsLoading(true);
        const { data, totalPages } = await getGallery(search, page);
        if (!data.totalHits) {
          if (isFetched) {
            isFetched();
          }
          return Notify.info(
            'Sorry, images are not found. Try another reqwest!'
          );
        }
        setImages(prevImages => [...prevImages, ...data.hits]);
        setTotalPages(totalPages);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchImages();
  }, [
    search,
    page,
    setIsLoading,
    setImages,
    setTotalPages,
    setError,
    isFetched,
  ]);

  const onOpenModal = (url, alt) => {
    setModalOpen(true);
    setImgForModal({ url, alt });
  };
  const onCloseModal = () => {
    setModalOpen(false);
    setImgForModal(null);
  };

  return (
    <div className={styles.container}>
      <Searchbar onSubmit={stateChange} isLoading={isLoading} />
      {error && <ErrorCard text={error} />}
      <ImageGallery images={images} onOpenModal={onOpenModal} />
      {isLoading && (
        <Loader
          message={
            'Please, wait a minute, we are looking for satisfying your needs...'
          }
        />
      )}
      {!images.length ||
        (totalPages >= page && (
          <OnClickButton
            text="Load more..."
            onClick={() => setPage(prevPage => prevPage + 1)}
          />
        ))}
      {modalOpen && (
        <Modal close={onCloseModal}>
          <img
            id="modal"
            className={styles.picture}
            src={imgForModal.url}
            alt={imgForModal.alt}
          />
        </Modal>
      )}
    </div>
  );
};

// ***************************CLASSES***************************
// import { Component } from 'react';
// class SerchImages extends Component {
//   state = {
//     images: [],
//     search: '',
//     page: 1,
//     isLoading: false,
//     error: null,
//     totalPages: null,
//     modalOpen: false,
//     imgForModal: null,
//   };
//   componentDidUpdate(_, prevState) {
//     const { search: prevSearch } = prevState;
//     const { page: prevPage } = prevState;
//     const { search: currentSearch, page: currentPage } = this.state;
//     if (prevSearch !== currentSearch || prevPage !== currentPage) {
//       this.fetchImages();
//     }
//   }
//   async fetchImages() {
//     try {
//       const { search: currentSearch, page: currentPage } = this.state;
//       this.setState({ isLoading: true });
//       const { data, totalPages } = await getGallery(currentSearch, currentPage);
//       if (!data.totalHits)
//         return Notify.info('Sorry, images are not found. Try another reqwest!');
//       this.setState(({ images }) => {
//         return {
//           totalPages,
//           images: [...images, ...data.hits],
//         };
//       });
//     } catch (error) {
//       this.setState({ error: error.message });
//     } finally {
//       this.setState({ isLoading: false });
//     }
//   }
//   stateChange = search => {
//     this.setState({ search, images: [], page: 1 });
//   };
//   addPage = () => {
//     this.setState(({ page }) => {
//       return { page: page + 1 };
//     });
//   };
//   onOpenModal = (url, alt) => {
//     this.setState({ modalOpen: true, imgForModal: { url, alt } });
//   };
//   onCloseModal = () => {
//     this.setState({ modalOpen: false, imgForModal: null });
//   };
//   render() {
//     const {
//       error,
//       modalOpen,
//       isLoading,
//       images,
//       totalPages,
//       page,
//       imgForModal,
//     } = this.state;
//     const { stateChange, addPage, onOpenModal, onCloseModal } = this;

//      return (
//       <div className={styles.container}>
//         <Searchbar onSubmit={stateChange} isLoading={isLoading} />
//         {error && <ErrorCard text={error} />}
//         <ImageGallery images={images} onOpenModal={onOpenModal} />
//         {isLoading && (
//           <Loader
//             message={
//               'Please, wait a minute, we are looking for satisfying your needs...'
//             }
//           />
//         )}
//         {!images.length ||
//           (totalPages >= page && (
//             <OnClickButton text="Load more..." onClick={addPage} />
//           ))}
//         {modalOpen && (
//           <Modal close={onCloseModal}>
//             <img
//               id="modal"
//               className={styles.modal}
//               src={imgForModal.url}
//               alt={imgForModal.alt}
//             />
//           </Modal>
//         )}
//       </div>
//     );
//   }
// }
export default SerchImages;
// 88 rows
// *****************STATE MACHINE*************************
// const STATUS = {
//   IDLE: 'idle',
//   PENDING: 'pending',
//   REJECTED: 'rejected',
//   RESOLVED: 'resolved',
// };
// class SerchImages extends Component {
//   state = {
//     images: [],
//     search: '',
//     page: 1,
//     isLoading: false,
//     error: null,
//     totalPages: null,
//     modalOpen: false,
//     imgForModal: null,
//     status: STATUS.IDLE,
//   };
//   componentDidUpdate(_, prevState) {
//     const { search: prevSearch } = prevState;
//     const { page: prevPage } = prevState;
//     const { search: currentSearch, page: currentPage } = this.state;
//     if (prevSearch !== currentSearch || prevPage !== currentPage) {
//       this.fetchImages();
//     }
//   }
//   async fetchImages() {
//     try {
//       const { search: currentSearch, page: currentPage } = this.state;
//       this.setState({ status: STATUS.PENDING });
//       const { data, totalPages } = await getGallery(currentSearch, currentPage);
//       if (!data.totalHits)
//         return Notify.info('Sorry, images are not found. Try another reqwest!');
//       this.setState(({ images }) => {
//         return {
//           totalPages,
//           images: [...images, ...data.hits],
//           status: STATUS.RESOLVED,
//         };
//       });
//     } catch (error) {
//       this.setState({ error: error.message, ststus: STATUS.REJECTED });
//     }
//   }
//   stateChange = search => {
//     this.setState({ search, images: [], page: 1 });
//   };
//   addPage = () => {
//     this.setState(({ page }) => {
//       return { page: page + 1 };
//     });
//   };
//   onOpenModal = (url, alt) => {
//     this.setState({ modalOpen: true, imgForModal: { url, alt } });
//   };
//   onCloseModal = () => {
//     this.setState({ modalOpen: false, imgForModal: null });
//   };
//   render() {
//     const {
//       status,
//       error,
//       modalOpen,
//       isLoading,
//       images,
//       totalPages,
//       page,
//       imgForModal,
//     } = this.state;
//     const { stateChange, addPage, onOpenModal, onCloseModal } = this;

//     return (
//       <div className={styles.container}>
//         <Searchbar onSubmit={stateChange} isLoading={isLoading} />
//       </div>
//     );
//     if (status === STATUS.PENDING)
//       return (
//         <Loader
//           message={
//             'Please, wait a minute, we are looking for satisfying your needs...'
//           }
//         />
//       );
//     if (status === STATUS.REJECTED) return <ErrorCard text={error} />;
//     if (status === STATUS.RESOLVED)
//       return (
//         <ImageGallery images={images} onOpenModal={onOpenModal} />
//         // {!images.length ||
//         //   (totalPages >= page && (
//         //     <OnClickButton text="Load more..." onClick={addPage} />
//         //   ))}
//       );
//     // {modalOpen && (
//     //   <Modal close={onCloseModal}>
//     //     <img src={imgForModal.url} alt={imgForModal.alt} />
//     //   </Modal>
//     // )}
//   }
// }
// export default SerchImages;
