import PropertyCard from "./PropertyCard.jsx";

export default function PropertyList({ properties, onAddFavourite }) {
  return (
    <div className="cards">
      {properties.map((p) => (
        <PropertyCard key={p.id} property={p} onAddFavourite={onAddFavourite} />
      ))}
    </div>
  );
}
