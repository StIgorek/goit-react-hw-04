import ImageCard from "../ImageCard/ImageCard.jsx";
import css from "../ImageGallery/ImageGallery.module.css";

export default function ImageGallery({ values }) {
  return (
    <ul className={css.list}>
      {values.map((value) => {
        return (
          <li key={value.id}>
            <ImageCard image={value} />
          </li>
        );
      })}
    </ul>
  );
}
