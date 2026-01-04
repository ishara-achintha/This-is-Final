const KEY = "estateAgent.favourites.v1";

export function loadFavourites() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveFavourites(favs) {
  try {
    localStorage.setItem(KEY, JSON.stringify(favs));
  } catch {
    // ignore
  }
}
