import ImageCard from "../ImageCard/ImageCard.jsx";
import css from "../ImageGallery/ImageGallery.module.css";

export default function ImageGallery({ values, onImageClick }) {
  return (
    <ul className={css.list}>
      {values.map(
        ({
          id,
          urls: { regular, small },
          alt_description,
          description,
          likes,
          user: { instagram_username, name },
        }) => {
          return (
            <li key={id} className={css.wrap}>
              <ImageCard
                src={small}
                alt={alt_description}
                onClick={() =>
                  onImageClick({
                    regular,
                    alt_description,
                    description,
                    likes,
                    instagram_username,
                    name,
                  })
                }
              />
            </li>
          );
        }
      )}
    </ul>
  );
}
