import { Image, StyleSheet, ViewStyle } from 'react-native';
import React, { useEffect, useState } from 'react';

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: undefined,
  },
});

type Props = {
  url: string;
  style: ViewStyle;
};

const CustomImage: React.FC<Props> = (props) => {
  const [ratio, setRatio] = useState(1);

  const getRatio = () => {
    return { aspectRatio: ratio };
  };

  useEffect(() => {
    setRatio(
      Image.getSize(props.url, (width, height) => {
        setRatio(width / height);
      }),
    );
  }, [props.url]);
  return (
    <Image source={{ uri: props.url }} style={[styles.image, getRatio()]} />
  );
};

export default CustomImage;
