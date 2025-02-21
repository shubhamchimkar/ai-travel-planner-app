import { View, Text, FlatList, Image } from 'react-native';
import React, { useEffect } from 'react';
import { Colors } from '../../constants/Colors';
import HotelCard from './HotelCard';

export default function HotelList({ hotelList }) {  // Accepting hotelList as a prop
  
  
  return (
    <View style={{ marginTop: 20 }}>
      <Text style={{ fontFamily: 'outfit-bold', fontSize: 20 }}>
        🏨 Hotel Recommendation
      </Text>
      <FlatList
        data={hotelList}
        keyExtractor={(item, index) => index.toString()}  // Add a unique key
        style={{ marginTop: 8 }}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        renderItem={({item,index}) => (
          <HotelCard item={item}/>
        )}
      />
    </View>
  );
}
