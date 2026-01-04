import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

export default function TabsSection({ property }) {
  const mapSrc = `https://www.google.com/maps?q=${property.lat},${property.lng}&z=15&output=embed`;

  return (
    <div className="panel">
      <h2 className="panelTitle">Details</h2>
      <Tabs>
        <TabList>
          <Tab>Description</Tab>
          <Tab>Floor Plan</Tab>
          <Tab>Map</Tab>
        </TabList>

        <TabPanel>
          <div className="prose">
            <p><strong>Tenure:</strong> {property.tenure}</p>
            <p><strong>Date added:</strong> {property.added}</p>
            <p>{property.longDescription}</p>
          </div>
        </TabPanel>

        <TabPanel>
          <div className="floorWrap">
            <img className="floorImg" src={property.floorplan} alt="Floor plan" />
          </div>
        </TabPanel>

        <TabPanel>
          <div className="mapWrap">
            <iframe
              title="Google map"
              src={mapSrc}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
}
