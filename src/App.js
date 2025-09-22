import React, { useState } from "react";
import './App.css';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from "react-leaflet";
import L from "leaflet";
import { feature } from "topojson-client";
import 'leaflet/dist/leaflet.css';
import usTopo from "./usa-states.json";

// Convert TopoJSON to GeoJSON
let usaStates = feature(usTopo, usTopo.objects.states);

// Keep only the 50 US states
const fiftyStatesNames = [
  "Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware",
  "Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana",
  "Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana",
  "Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota",
  "Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota","Tennessee",
  "Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming"
];

// Filter features to include only 50 states
usaStates = {
  ...usaStates,
  features: usaStates.features.filter(f => fiftyStatesNames.includes(f.properties.name))
};

// Population density data (people per square mile)
const populationDensity = {
  Alabama: 96, Alaska: 1.3, Arizona: 64, Arkansas: 58, California: 253, Colorado: 57,
  Connecticut: 741, Delaware: 500, Florida: 397, Georgia: 184, Hawaii: 214, Idaho: 22,
  Illinois: 231, Indiana: 184, Iowa: 56, Kansas: 36, Kentucky: 110, Louisiana: 108,
  Maine: 43, Maryland: 626, Massachusetts: 884, Michigan: 174, Minnesota: 71, Mississippi: 63,
  Missouri: 89, Montana: 6.86, Nebraska: 25, Nevada: 28, NewHampshire: 153, NewJersey: 1212,
  NewMexico: 17, NewYork: 417, NorthCarolina: 213, NorthDakota: 11, Ohio: 286, Oklahoma: 58,
  Oregon: 44, Pennsylvania: 286, RhodeIsland: 1021, SouthCarolina: 170, SouthDakota: 12,
  Tennessee: 169, Texas: 108, Utah: 39, Vermont: 68, Virginia: 216, Washington: 117,
  WestVirginia: 77, Wisconsin: 107, Wyoming: 6
};

// Function to get color based on density (orange shades)
const getColor = (d) => {
  return d > 500 ? "#7f2704" :
         d > 250 ? "#d94801" :
         d > 100 ? "#f16913" :
         d > 50  ? "#fd8d3c" :
         d > 20  ? "#fdae6b" :
                   "#fee6ce";
};

// Custom blue marker for Washington DC events
const blueMarker = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

function App() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedState, setSelectedState] = useState(null);

  // Washington DC event markers
  const events = [
    { id: 1, name: "Muhsinah", description: "Jazz-influenced hip hop artist Muhsinah...", lat: 38.917, lng: -77.032 },
    { id: 2, name: "Show 2", description: "Another event happening in Washington DC.", lat: 38.895, lng: -77.07 },
    { id: 3, name: "Show 3", description: "Live performance downtown.", lat: 38.89, lng: -77.02 },
  ];

  // Style function for US states based on density
  const stateStyle = (feature) => ({
    fillColor: getColor(populationDensity[feature.properties.name] || 0),
    weight: 2,
    opacity: 1,
    color: "white",
    dashArray: '3',
    fillOpacity: 0.7
  });

  // Event handlers for US states
  const onEachState = (state, layer) => {
    layer.on({
      mouseover: (e) => e.target.setStyle({ weight: 3, color: '#666', fillOpacity: 0.9 }),
      mouseout: (e) => e.target.setStyle(stateStyle(state)),
      click: () => setSelectedState(state.properties.name),
    });
  };

  return (
    <div className="App">
      {/* Header */}
      <header className="App-header">
        <a href="/" className="flex items-center">
          <img
            src="https://necessary-example-37c0245ed1.media.strapiapp.com/Group_2_1_1_ed1ea90e22_bdfc758cbd.svg"
            alt="logo"
            className="App-logo-desktop"
          />
          <img
            src="https://discover.talkinglands.com/static-assests/images/square_logo.svg"
            alt="logo"
            className="App-logo-mobile"
          />
        </a>
        <div className="App-search">
          <input type="text" placeholder="Enter location" />
        </div>
      </header>

      {/* Washington DC Map */}
      <div className="App-map-wrapper">
        <MapContainer center={[38.9072, -77.0369]} zoom={12} className="App-map">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          {events.map((ev) => (
            <Marker
              key={ev.id}
              position={[ev.lat, ev.lng]}
              icon={blueMarker}
              eventHandlers={{ click: () => setSelectedEvent(ev) }}
            />
          ))}
          {selectedEvent && (
            <Popup position={[selectedEvent.lat, selectedEvent.lng]} onClose={() => setSelectedEvent(null)}>
              <div style={{ maxWidth: "250px" }}>
                <h4 style={{ margin: "0 0 5px 0" }}>{selectedEvent.name}</h4>
                <p style={{ fontSize: "14px", margin: 0 }}>{selectedEvent.description}</p>
              </div>
            </Popup>
          )}
        </MapContainer>
      </div>

      {/* USA Map with 50 States */}
      <div className="App-map-wrapper">
        <MapContainer center={[37.8, -96]} zoom={4} className="App-map">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          <GeoJSON data={usaStates} style={stateStyle} onEachFeature={onEachState} />
          {selectedState && (
            <Popup position={[37.8, -96]} onClose={() => setSelectedState(null)}>
              <div style={{ lineHeight: "1.5" }}>
                <b>US population density</b><br/>
                <b>{selectedState}</b><br/>
                <b>{populationDensity[selectedState] ? populationDensity[selectedState].toLocaleString() : "N/A"}</b> people per square mile
              </div>
            </Popup>
          )}
        </MapContainer>
      </div>
    </div>
  );
}

export default App;
