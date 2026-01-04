import { useEffect, useMemo, useRef, useState } from "react";
import properties from "../data/properties.json";
import { filterProperties } from "../utils/filterProperties.js";
import { loadFavourites, saveFavourites } from "../utils/storage.js";
import SearchForm from "./SearchForm.jsx";
import PropertyList from "./PropertyList.jsx";
import FavouritesPanel from "./FavouritesPanel.jsx";

export default function SearchPage() {
  const [filters, setFilters] = useState({
    type: "any",
    minPrice: "",
    maxPrice: "",
    minBeds: "",
    maxBeds: "",
    dateFrom: "",
    dateTo: "",
    postcode: ""
  });

  const [favouriteIds, setFavouriteIds] = useState(() => loadFavourites());
  const draggingFavIdRef = useRef(null);
  const favPanelRef = useRef(null);

  useEffect(() => {
    saveFavourites(favouriteIds);
  }, [favouriteIds]);

    // Remove favourite if user drops it OUTSIDE the favourites panel
  useEffect(() => {
    function onDocumentDragOver(e) {
      // Without preventing default on dragover, many browsers won't fire "drop"
      if (draggingFavIdRef.current) e.preventDefault();
    }

    function onDocumentDrop(e) {
      const id = draggingFavIdRef.current;
      if (!id) return;

      const panelEl = favPanelRef.current;

      // More reliable than just e.target for nested elements / SVGs
      const path = typeof e.composedPath === "function" ? e.composedPath() : [];
      const droppedInsidePanel =
        (panelEl && panelEl.contains(e.target)) || (panelEl && path.includes(panelEl));

      if (!droppedInsidePanel) {
        setFavouriteIds((prev) => prev.filter((x) => x !== id));
      }

      draggingFavIdRef.current = null;
    }

    function onDocumentDragEnd() {
      draggingFavIdRef.current = null;
    }

    document.addEventListener("dragover", onDocumentDragOver);
    document.addEventListener("drop", onDocumentDrop);
    document.addEventListener("dragend", onDocumentDragEnd);

    return () => {
      document.removeEventListener("dragover", onDocumentDragOver);
      document.removeEventListener("drop", onDocumentDrop);
      document.removeEventListener("dragend", onDocumentDragEnd);
    };
  }, []);


  const results = useMemo(() => filterProperties(properties, filters), [filters]);

  const favourites = useMemo(() => {
    const map = new Map(properties.map((p) => [p.id, p]));
    return favouriteIds.map((id) => map.get(id)).filter(Boolean);
  }, [favouriteIds]);

  function addFavouriteById(id) {
    setFavouriteIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }

  function removeFavouriteById(id) {
    setFavouriteIds((prev) => prev.filter((x) => x !== id));
  }

  function clearFavourites() {
    setFavouriteIds([]);
  }

  return (
    <div className="page container">
      <div className="panel">
        <h2 className="panelTitle">Search</h2>
        <SearchForm filters={filters} onChange={setFilters} />
      </div>

      <div className="layout">
        <section className="mainCol">
          <div className="panel">
            <div className="resultsHeader">
              <h2 className="panelTitle">Results</h2>
              <span className="badge">{results.length} found</span>
            </div>

            <PropertyList properties={results} onAddFavourite={(id) => addFavouriteById(id)} />
          </div>
        </section>

        <aside className="sideCol">
          <div ref={favPanelRef}>
            <FavouritesPanel
              favourites={favourites}
              onAddFavourite={(id) => addFavouriteById(id)}
              onRemoveFavourite={(id) => removeFavouriteById(id)}
              onClear={clearFavourites}
              onStartDragFavourite={(id) => (draggingFavIdRef.current = id)}
            />
          </div>
        </aside>
      </div>
    </div>
  );
}
