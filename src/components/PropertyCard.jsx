import { Link } from "react-router-dom";

export default function PropertyCard({ property, onAddFavourite }) {
  function handleDragStart(e) {
    e.dataTransfer.setData("text/property-id", property.id);
    e.dataTransfer.effectAllowed = "copy";
  }

  
  return (
    <article className="card" draggable onDragStart={handleDragStart}>
      <div className="cardMedia">
        <img
          src={property.images?.[0]}
          alt={`${property.type} in ${property.postcode}`}
          loading="lazy"
        />
        <span className="pill">{property.type}</span>
      </div>

      <div className="cardBody">
        <div className="priceRow">
          <h3 className="price">£{property.price.toLocaleString()}</h3>
          <span className="meta">{property.bedrooms} bed</span>
        </div>

        <p className="short">{property.shortDescription}</p>
        <p className="location">{property.location}</p>

        <div className="cardActions">
          <Link className="btn" to={`/property/${property.id}`}>View</Link>
          <button className="btnGhost" type="button" onClick={() => onAddFavourite(property.id)}>
            ☆ Favourite
          </button>
        </div>
      </div>
    </article>
  );
}
