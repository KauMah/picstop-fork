import { Location } from '../../../types';
import MapboxGL from '@react-native-mapbox-gl/maps';
import React from 'react';
import RoundedSquareIcon from './component';

interface Props {
  new?: boolean;
  location: Location;
  onPress?: () => void;
}

const MapThumbnail1 = (props: Props) => {
  return (
    <MapboxGL.MarkerView
      id={props.location._id}
      coordinate={props.location.geoLocation.coordinates}>
      <RoundedSquareIcon
        onTouchEndCapture={props.onPress}
        iconUrl={props.location.images}
        numPhotos={3}
        new={props.new}
      />
    </MapboxGL.MarkerView>
  );
};

export default MapThumbnail1;
