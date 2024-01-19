import React from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import { servicePhotos } from '../photo-api';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import { useState, useEffect } from 'react';

const App = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState('');
  const [photosData, setPhotosData] = useState([]);
  const [maxPage, setMaxPage] = useState(null);
  const [isShowModal, setIsShowModal] = useState(false);
  const [openedImageSrc, setOpenedImageSrc] = useState(null);

  useEffect(() => {
    if (query.trim().length !== 0) {
      setPage(1);
      setPhotosData([]);

      servicePhotos();
    }
  }, [query]);

  const servicePhotos = async () => {
    setIsLoading(true);
    setError('');
    const photosData = await servicePhotos(query, page);
    const countPages = Math.ceil(photosData.data.totalHits / 12);
    if (photosData.data.hits.length < 1) {
      setError('Sorry, nothing found.');
    }

    setPhotosData(photosData.data.hits);
    setIsLoading(false);
    setMaxPage(countPages);
  };

  const loadMorePhotos = async () => {
    setLoadingMore(true);
    const photosData = await servicePhotos(query, page);
    setPhotosData(photosData.data.hits);
    setLoadingMore(false);
    // this.setState(prev => ({
    //   photosData: [...prev.photosData, ...photosData.data.hits],
    //   loadingMore: false,
    // }));
  };

  const handleSubmit = data => {
    setQuery(data);
  };

  const handleLoad = () => {
    setPage(page + 1);
    loadMorePhotos();
    // this.setState(
    //   prev => ({
    //     page: prev.page + 1,
    //   }),
    //   () => {
    //     this.loadMorePhotos();
    //   }
    // );
  };

  const modalOpen = photoSrc => {
    const selectedPhoto = photosData.find(
      photo => photo.webformatURL === photoSrc
    );
    setOpenedImageSrc(selectedPhoto.largeImageURL);
    setIsShowModal(true);
    // this.setState({
    //   openedImageSrc: selectedPhoto.largeImageURL,
    //   isShowModal: true,
    // });
  };
  const modalClose = () => {
    setIsShowModal(false);
  };

  return (
    <>
      <Searchbar onSubmit={handleSubmit}></Searchbar>
      {error && <h2 style={{ marginTop: '60px' }}>{error}</h2>}
      {photosData.length > 0 && !isLoading && (
        <ImageGallery photos={photosData} modalOpen={modalOpen}></ImageGallery>
      )}
      {(isLoading || loadingMore) && <Loader />}
      {maxPage > 1 && maxPage !== page && !isLoading && (
        <Button loadingMore={handleLoad} />
      )}
      {isShowModal && (
        <Modal close={modalClose} openedImage={openedImageSrc}></Modal>
      )}
    </>
  );
};

export default App;
