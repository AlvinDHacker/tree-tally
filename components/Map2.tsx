import { MapContainer, Marker, TileLayer, Tooltip, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
// import "leaflet-defaulticon-compatibility"
// import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"



export default function MyMap(props: any) {
  const { position, zoom } = props

  return (<MapContainer center={position} zoom={zoom} scrollWheelZoom={false} className="map">
    <TileLayer
  attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  url="https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
  maxZoom={20}
  subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
/>



    <Marker position={position}>
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker>
  </MapContainer>)
}