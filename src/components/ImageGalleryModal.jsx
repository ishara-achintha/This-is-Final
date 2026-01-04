import { useEffect, useState } from "react";

export default function ImageGalleryModal({ images, onClose }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setIndex((i) => Math.min(i + 1, images.length - 1));
      if (e.key === "ArrowLeft") setIndex((i) => Math.max(i - 1, 0));
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [images.length, onClose]);

  if (!images || images.length === 0) return null;

  return (
    <div className="modalOverlay" role="dialog" aria-modal="true">
      <div className="modal">
        <div className="modalTop">
          <button className="iconBtn" onClick={onClose} aria-label="Close gallery">✕</button>
          <div className="modalTitle">Photo {index + 1} / {images.length}</div>
          <div />
        </div>

        <div className="modalBody">
          <button className="navBtn" onClick={() => setIndex((i) => Math.max(i - 1, 0))} disabled={index === 0}>
            ‹
          </button>
          <img className="modalImg" src={images[index]} alt="" />
          <button className="navBtn" onClick={() => setIndex((i) => Math.min(i + 1, images.length - 1))} disabled={index === images.length - 1}>
            ›
          </button>
        </div>

        <div className="modalThumbs">
          {images.map((src, i) => (
            <button
              key={src}
              className={"thumbBtn " + (i === index ? "thumbActive" : "")}
              onClick={() => setIndex(i)}
              aria-label={"View photo " + (i + 1)}
            >
              <img src={src} alt="" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
