import "../App/App.css";
import Modal from "react-modal";
import SearchBar from "../SearchBar/SearchBar";
import Loader from "../Loader/Loader";
import ImageGallery from "../ImageGallery/ImageGallery";
import { useState } from "react";
import { fetchImages } from "../../api-unsplash";

export default function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [images, setImages] = useState([]);

  const handleSearch = async (values, actions) => {
    try {
      setLoading(true);
      setImages([]);
      setError(false);
      const fetchedImages = await fetchImages(values.searchRequest);
      setImages(fetchedImages.results);
      actions.resetForm();
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      {images.length > 0 && <ImageGallery values={images} />}
      {loading && <Loader />}
      {error && <b>Error</b>}
    </div>
  );
}
