import { DropdownList, NumberPicker, DatePicker } from "react-widgets";
import "react-widgets/styles.css";

export default function SearchForm({ filters, onChange }) {
  const typeOptions = ["any", "House", "Flat"];

  function update(patch) {
    onChange({ ...filters, ...patch });
  }

  return (
    <form className="formGrid" onSubmit={(e) => e.preventDefault()}>
      <div className="field">
        <label htmlFor="type">Type</label>
        <DropdownList
          id="type"
          data={typeOptions}
          value={filters.type}
          onChange={(v) => update({ type: v })}
        />
      </div>

      <div className="field">
        <label>Min price</label>
        <NumberPicker
          value={filters.minPrice === "" ? null : Number(filters.minPrice)}
          min={0}
          step={5000}
          placeholder="Any"
          onChange={(v) => update({ minPrice: v === null ? "" : String(v) })}
        />
      </div>

      <div className="field">
        <label>Max price</label>
        <NumberPicker
          value={filters.maxPrice === "" ? null : Number(filters.maxPrice)}
          min={0}
          step={5000}
          placeholder="Any"
          onChange={(v) => update({ maxPrice: v === null ? "" : String(v) })}
        />
      </div>

      <div className="field">
        <label>Min beds</label>
        <NumberPicker
          value={filters.minBeds === "" ? null : Number(filters.minBeds)}
          min={0}
          step={1}
          placeholder="Any"
          onChange={(v) => update({ minBeds: v === null ? "" : String(v) })}
        />
      </div>

      <div className="field">
        <label>Max beds</label>
        <NumberPicker
          value={filters.maxBeds === "" ? null : Number(filters.maxBeds)}
          min={0}
          step={1}
          placeholder="Any"
          onChange={(v) => update({ maxBeds: v === null ? "" : String(v) })}
        />
      </div>

      <div className="field">
        <label>Date from</label>
        <DatePicker
          value={filters.dateFrom ? new Date(filters.dateFrom) : null}
          onChange={(v) =>
            update({ dateFrom: v ? new Date(v).toISOString().slice(0, 10) : "" })
          }
          placeholder="Any"
        />
      </div>

      <div className="field">
        <label>Date to</label>
        <DatePicker
          value={filters.dateTo ? new Date(filters.dateTo) : null}
          onChange={(v) =>
            update({ dateTo: v ? new Date(v).toISOString().slice(0, 10) : "" })
          }
          placeholder="Any"
        />
      </div>

      <div className="field">
        <label htmlFor="postcode">Postcode</label>
        <input
          id="postcode"
          className="textInput"
          type="text"
          value={filters.postcode}
          placeholder="e.g. BR1"
          onChange={(e) => update({ postcode: e.target.value })}
        />
      </div>

      <div className="actions">
        <button className="btn" type="button" onClick={() => onChange({
          type: "any",
          minPrice: "",
          maxPrice: "",
          minBeds: "",
          maxBeds: "",
          dateFrom: "",
          dateTo: "",
          postcode: ""
        })}>
          Clear filters
        </button>
      </div>
    </form>
  );
}
