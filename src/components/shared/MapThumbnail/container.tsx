import MapboxGL from '@react-native-mapbox-gl/maps';
import React from 'react';
import RoundedSquareIcon from './component';

interface Props {
  iconUrl?: string;
  numPhotos: number;
  id: string;
  coordinate: Array<number>;
  new?: boolean;
  onPress?: () => void;
}

const MapThumbnail1 = (props: Props) => {
  return (
    <MapboxGL.MarkerView id={props.id} coordinate={props.coordinate}>
      <RoundedSquareIcon
        onTouchEndCapture={props.onPress}
        iconUrl={
          'https://www.kenblakemoreartdesign.com/wp-content/uploads/2017/07/fullsizeoutput_696.jpeg'
        }
        numPhotos={props.numPhotos}
        new={props.new}
      />
    </MapboxGL.MarkerView>
  );
};

export default MapThumbnail1;
