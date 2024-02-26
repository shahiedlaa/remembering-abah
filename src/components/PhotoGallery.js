import React from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { useUser } from "@supabase/auth-helpers-react";

const PhotoGallery = ({ images }) => {
  const user = useUser();
  const CDNURL =
    "https://istpqtthueulgfbeutoq.supabase.co/storage/v1/object/public/images/";
  return (
    <ResponsiveMasonry columnsCountBreakPoints={{ 350: 2, 750: 2, 900: 4 }}>
      <Masonry gutter="16px">
        {images.map((image, i) => (
          <>
            <img
              key={i}
              src={CDNURL + user.id + "/" + image.name}
              style={{ width: "100%", display: "block", borderRadius: "16px" }}
              alt=""
            />
            <p style={{ fontSize: "16px" }}>{image.name}</p>
          </>
        ))}
      </Masonry>
    </ResponsiveMasonry>
  );
};

export default PhotoGallery;
