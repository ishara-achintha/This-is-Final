import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import properties from "../data/properties.json";
import ImageGalleryModal from "./ImageGalleryModal.jsx";
import TabsSection from "./TabsSection.jsx";

export default function PropertyDetailsPage() {
  const { id } = useParams();
  const property = useMemo(() => properties.find((p) => p.id === id), [id]);
  const [open, setOpen] = useState(false);

  if (!property) {
    return (
      <div className="page">
        <h2>Property not found</h2>
        <Link className="btn" to="/">Back to search</Link>
      </div>
    );
  }

  return (
    <div className="page">
      <header className="detailsHeader">
        <Link className="btnGhost" to="/">← Back</Link>
        <div className="detailsTitle">
          <h1>£{property.price.toLocaleString()}</h1>
          <p className="detailsMeta">
            {property.type} • {property.bedrooms} bedrooms • {property.location} • {property.postcode}
          </p>
        </div>
        <button className="btn" onClick={() => setOpen(true)}>View Photos</button>
      </header>

      <div className="heroGrid">
        <img className="heroImg" src={property.images?.[0]} alt="Main property" />
        <div className="thumbGrid">
          {property.images?.slice(1, 5).map((src) => (
            <button key={src} className="thumbBtn" onClick={() => setOpen(true)} aria-label="Open gallery">
              <img src={src} alt="" />
            </button>
          ))}
        </div>
      </div>

      <TabsSection property={property} />

      {open && (
        <ImageGalleryModal
          images={property.images || []}
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  );
}
