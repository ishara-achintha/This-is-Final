# Estate Agent Client-side Web Application (React SPA)

## What this includes (mapped to rubric)
- JSON data: 7 properties in `src/data/properties.json`
- Search by:
  - type, price range, bedroom range, date-added range, postcode area
- React UI widgets: `react-widgets` (DropdownList, NumberPicker, DatePicker)
- Results page: responsive cards with image, price, short description
- Property details page:
  - large hero image + thumbnails
  - gallery modal (keyboard support: ESC, arrows)
  - tabs (Description, Floor Plan, Map)
- Favourites:
  - add via ☆ button OR drag card into favourites panel
  - duplicates prevented
  - remove via ✕ button OR drag favourite out onto “Drop here to remove”
  - clear all
  - favourites displayed on search page (right column)
- Security:
  - CSP in `index.html`
  - No `dangerouslySetInnerHTML` used (React JSX escaping)
- Tests: Jest tests in `src/tests/search.test.js` (5+ meaningful tests)
- Deployment-ready: Vite base set to `./` in `vite.config.js` for GitHub Pages

## Setup
```bash
npm install
npm run dev
```

## Tests
```bash
npm test
```

## Add images
Put images into:
`public/images/prop1/1.jpg` ... etc.

You can use any 6–8 images per property + a `floorplan.jpg` per property.
