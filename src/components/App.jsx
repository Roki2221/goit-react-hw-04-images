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
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState('');
  const [photosData, setPhotosData] = useState([]);
  const [maxPage, setMaxPage] = useState(null);
  const [isShowModal, setIsShowModal] = useState(false);
  const [openedImageSrc, setOpenedImageSrc] = useState(null);

  useEffect(() => {
    if (query.trim().length !== 0) {
      fetchPhotos();
    }
  }, [query]);
  useEffect(() => {
    if (page !== 1) {
      console.log('page', page);
      loadMorePhotos();
    }
  }, [page]);

  const fetchPhotos = async () => {
    console.log('fetchPhotos');
    setPage(1);
    setPhotosData([]);
    setIsLoading(true);
    setError('');
    const photosData = await servicePhotos(query, 1);
    const countPages = Math.ceil(photosData.data.totalHits / 12);
    if (photosData.data.hits.length < 1) {
      setError('Sorry, nothing found.');
    }

    setPhotosData(photosData.data.hits);
    setIsLoading(false);
    setMaxPage(countPages);
  };

  const loadMorePhotos = async () => {
    console.log('loadMorePhotos');
    setLoadingMore(true);
    const newPhotosData = await servicePhotos(query, page);
    console.log(photosData);
    console.log(newPhotosData.data.hits);
    setPhotosData([...photosData, ...newPhotosData.data.hits]);
    setLoadingMore(false);
  };

  const handleSubmit = data => {
    setQuery(data);
  };

  const handleLoad = () => {
    setPage(page + 1);
  };

  const modalOpen = photoSrc => {
    const selectedPhoto = photosData.find(
      photo => photo.webformatURL === photoSrc
    );
    setOpenedImageSrc(selectedPhoto.largeImageURL);
    setIsShowModal(true);
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
