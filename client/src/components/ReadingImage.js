import React, { useState } from "react";

const ReadingImage = ({ src, alt }) => {
  const [loading, setLoading] = useState(true);

  return (
    <div className="w-full mx-auto relative min-h-[200px]">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70 z-10">
          <span className="animate-spin rounded-full h-8 w-8 border-t-2 border-primary"></span>
          <span className="ml-2 text-primary font-semibold">Memuat gambar...</span>
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={`w-full mx-auto transition-opacity duration-300 ${loading ? "opacity-0" : "opacity-100"}`}
        onLoad={() => setLoading(false)}
        onError={() => setLoading(false)}
      />
    </div>
  );
};

export default ReadingImage;
