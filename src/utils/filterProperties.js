/**
 * Filters property data by up to 5 criteria:
 * type, price range, bedrooms range, date added range, postcode area
 *
 * Notes (security + robustness):
 * - Treat empty inputs as "no filter"
 * - Normalise strings (trim + uppercase for postcode)
 */
export function filterProperties(properties, filters) {
  const {
    type = "any",
    minPrice = "",
    maxPrice = "",
    minBeds = "",
    maxBeds = "",
    dateFrom = "",
    dateTo = "",
    postcode = ""
  } = filters || {};

  const minP = minPrice === "" ? null : Number(minPrice);
  const maxP = maxPrice === "" ? null : Number(maxPrice);
  const minB = minBeds === "" ? null : Number(minBeds);
  const maxB = maxBeds === "" ? null : Number(maxBeds);

  const from = dateFrom ? new Date(dateFrom) : null;
  const to = dateTo ? new Date(dateTo) : null;

  const pc = String(postcode || "").trim().toUpperCase();

  return properties.filter((p) => {
    if (type !== "any" && p.type !== type) return false;

    if (minP !== null && p.price < minP) return false;
    if (maxP !== null && p.price > maxP) return false;

    if (minB !== null && p.bedrooms < minB) return false;
    if (maxB !== null && p.bedrooms > maxB) return false;

    if (from || to) {
      const added = new Date(p.added);
      if (from && added < from) return false;
      if (to && added > to) return false;
    }

    if (pc) {
      const propPc = String(p.postcode || "").trim().toUpperCase();
      if (!propPc.startsWith(pc)) return false;
    }

    return true;
  });
}
