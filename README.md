# Talking Lands Assignment

## How to Clone the Project

Clone this repository to your local machine using the following command:

```bash
git clone https://github.com/GDheerajRedd/talkinglands.git
```

## How to Run the Project

1. **Install dependencies:**  
   Make sure you have [Node.js](https://nodejs.org/) installed. Then run:
   ```bash
   npm install
   ```

2. **Start the development server:**  
   ```bash
   npm start
   ```
   This will open the project in your default browser at [http://localhost:3000](http://localhost:3000).

## Packages Used

- **React**: Frontend UI library.
- **react-leaflet**: React components for interactive maps.
- **leaflet**: Core JS mapping library.
- **topojson-client**: Used to convert TopoJSON to GeoJSON for US states geometry.
- **leaflet/dist/leaflet.css**: Leaflet's CSS for map styling.

## Functionality Implemented

- **Displays two interactive maps**:
  - **Map container in UI and adds multiple Point data layers by placing Geo marker pins using sample data**: Shows custom blue markers for three events in Washington DC. Clicking a marker opens a popup with event info.
  - **USA Map container in UI and adds a polygon layer using sample data**: Shows all 50 US states colored by population density (orange shades). Hovering highlights a state; clicking shows a popup with its name and density.
- **Search Bar (UI only)**: An input field for searching locations (functionality not implemented).
- **Responsive Branding**: Different logos for desktop and mobile in the header.

## Deployment

This project is deployed to Netlify.  
Website is available at:  
[https://talkinglands.netlify.app/](https://talkinglands.netlify.app/)