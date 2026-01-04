import { Link } from "react-router-dom";

export default function FavouritesPanel({
  favourites,
  onAddFavourite,
  onRemoveFavourite,
  onClear,
  onStartDragFavourite
}) {
  // Allow dropping property cards into favourites (copy)
  function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  }

  function handleDrop(e) {
    e.preventDefault();
    const id = e.dataTransfer.getData("text/property-id");
    if (id) onAddFavourite(id);
  }

  return (
    <section className="panel sticky" onDragOver={handleDragOver} onDrop={handleDrop} aria-label="Favourites">
      <div className="resultsHeader">
        <h2 className="panelTitle">Favourites</h2>
        <div className="favHeaderRight">
          <span className="badge">{favourites.length}</span>
          <button className="btnDanger" type="button" onClick={onClear} disabled={favourites.length === 0}>
            Clear
          </button>
        </div>
      </div>

      <p className="hint">Tip: Drag a property card into this panel to add. Drag a favourite out to remove.</p>

      {favourites.length === 0 ? (
        <div className="empty">No favourites yet.</div>
      ) : (
        <div className="favList" role="list" aria-label="Favourite properties">
          {favourites.map((p) => (
            <FavItem
              key={p.id}
              p={p}
              onRemoveFavourite={onRemoveFavourite}
              onStartDragFavourite={onStartDragFavourite}
            />
          ))}
        </div>
      )}
    </section>
  );
}

function FavItem({ p, onRemoveFavourite, onStartDragFavourite }) {
  function handleDragStart(e) {
    // Mark this as a favourite being dragged (for drag-out removal)
    e.dataTransfer.setData("text/favourite-id", String(p.id));
    e.dataTransfer.effectAllowed = "move";
    onStartDragFavourite(p.id);
  }

  function onRemove() {
    onRemoveFavourite(p.id);
  }

  return (
    <div className="favItem" role="listitem" draggable onDragStart={handleDragStart}>
      <img className="favThumb" src={p.images?.[0]} alt="" />
      <div className="favInfo">
        <Link className="favLink" to={`/property/${p.id}`}>
          £{p.price.toLocaleString()} • {p.bedrooms} bed • {p.postcode}
        </Link>
        <span className="favSub">{p.shortDescription}</span>
      </div>
      <button className="iconBtn" type="button" onClick={onRemove} aria-label="Remove favourite">
        ✕
      </button>
    </div>
  );
}
