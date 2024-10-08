import "../App/App.css";
import SearchBar from "../SearchBar/SearchBar";
import Loader from "../Loader/Loader";
import ImageGallery from "../ImageGallery/ImageGallery";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import ImageModal from "../ImageModal/ImageModal";
import { useState, useEffect } from "react";
import { fetchImages } from "../../api-unsplash";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";

export default function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [images, setImages] = useState([]);
  const [showBtn, setShowBtn] = useState(false);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(99);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (query === "") {
      return;
    }

    async function getImages() {
      try {
        setLoading(true);
        setError(false);
        setShowBtn(false);
        const res = await fetchImages(query, page);
        setImages((prevImages) => [...prevImages, ...res.results]);
        setTotalPages(res.total_pages);
        if (res.total_pages === 0) {
          toast.error("Перевірте правильність запиту");
          return;
        }
        setShowBtn(totalPages && totalPages !== page);
      } catch (error) {
        toast.error("Щось пішло не так. Спробуйте ще раз", error);
      } finally {
        setLoading(false);
      }
    }
    getImages();
  }, [query, page]);

  const handleSearch = (newQuery) => {
    setQuery(newQuery);
    setPage(1);
    setImages([]);
    setShowBtn(false);
    setError(false);
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  const openModal = (imageData) => {
    setSelectedImage(imageData);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      {images.length >= 1 && (
        <ImageGallery values={images} onImageClick={openModal} />
      )}
      {loading && <Loader />}
      {error && <ErrorMessage />}
      {showBtn && <LoadMoreBtn onClick={handleLoadMore} />}
      <ImageModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        imageData={selectedImage}
      />
      <Toaster />
    </div>
  );
}
