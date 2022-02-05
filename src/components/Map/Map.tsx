import L from 'leaflet';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon from 'assets/images/icon-location.svg';
import { coordinatesType } from 'shared/interfaces/data.interface';
import ChangeView from './ChangeView';
import 'styles/Map/Map.scss';

const markerIconL = L.icon({
  iconUrl: markerIcon,
  iconAnchor: [23, 56],
});
L.Marker.prototype.options.icon = markerIconL;

type Props = {
  coordinates: coordinatesType;
};

const Map = ({ coordinates }: Props) => {
  const { latitude, longitude } = coordinates;
  const areCoordinates = !!latitude && !!longitude;
  const center: [number, number] = [latitude || 0, longitude || 0];
  const zoom = !areCoordinates ? 2 : 13;

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      scrollWheelZoom={true}
      zoomControl={false}
    >
      <ChangeView center={center} zoom={zoom} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {areCoordinates && <Marker position={center}></Marker>}
    </MapContainer>
  );
};

export default Map;
