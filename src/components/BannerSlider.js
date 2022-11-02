import React from 'react';
import {View, Image} from 'react-native';

export default function BannerSlider({data}) {
  return (
    <View>
      <Image
        source={data.image}
        style={{height: 180, width: 330, borderRadius: 10, alignSelf: 'center'}}
      />
    </View>
  );
}
