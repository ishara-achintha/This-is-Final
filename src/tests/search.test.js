import properties from "../data/properties.json";
import { filterProperties } from "../utils/filterProperties";

describe("filterProperties", () => {
  test("returns all properties when no filters (defaults)", () => {
    const res = filterProperties(properties, { type: "any" });
    expect(res.length).toBe(properties.length);
  });

  test("filters by type", () => {
    const res = filterProperties(properties, { type: "House" });
    expect(res.every(p => p.type === "House")).toBe(true);
  });

  test("filters by price range", () => {
    const res = filterProperties(properties, { type: "any", minPrice: "400000", maxPrice: "800000" });
    expect(res.every(p => p.price >= 400000 && p.price <= 800000)).toBe(true);
  });

  test("filters by bedrooms range", () => {
    const res = filterProperties(properties, { minBeds: "2", maxBeds: "3" });
    expect(res.every(p => p.bedrooms >= 2 && p.bedrooms <= 3)).toBe(true);
  });

  test("filters by postcode prefix (case-insensitive)", () => {
    const res = filterProperties(properties, { postcode: "br1" });
    expect(res.every(p => String(p.postcode).toUpperCase().startsWith("BR1"))).toBe(true);
  });

  test("filters by date range", () => {
    const res = filterProperties(properties, { dateFrom: "2023-01-01", dateTo: "2024-12-31" });
    expect(res.every(p => p.added >= "2023-01-01" && p.added <= "2024-12-31")).toBe(true);
  });

  test("supports combining multiple criteria", () => {
    const res = filterProperties(properties, {
      type: "Flat",
      minBeds: "2",
      maxPrice: "700000",
      postcode: "BR",
      dateFrom: "2022-01-01"
    });
    expect(res.every(p =>
      p.type === "Flat" &&
      p.bedrooms >= 2 &&
      p.price <= 700000 &&
      String(p.postcode).toUpperCase().startsWith("BR") &&
      p.added >= "2022-01-01"
    )).toBe(true);
  });
});
