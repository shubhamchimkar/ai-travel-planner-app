import { View, Text, TouchableOpacity, Linking } from 'react-native';
import React from 'react';
import { Colors } from '../../constants/Colors';

export default function FlightInfo({ flightData }) {
  
  // Function to handle redirection
  const handleBookingPress = () => {
    if (flightData?.bookingUrl) {
      Linking.openURL(flightData.bookingUrl).catch((err) => 
        console.error("Failed to open URL:", err)
      );
    } else {
      alert("Booking URL not available");
    }
  };

  return (
    <View style={{
      marginTop: 20,
      borderWidth: 1,
      borderColor: Colors.LIGHT_GRAY,
      padding: 10,
      borderRadius: 15
    }}>
      <View style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Text style={{
          fontFamily: 'outfit-bold',
          fontSize: 20
        }}>
          ✈ Flights
        </Text>
        <TouchableOpacity 
          style={{
            backgroundColor: Colors.PRIMARY,
            padding: 5,
            width: 100,
            borderRadius: 7,
            marginTop: 7,
          }}
          onPress={handleBookingPress} // Corrected onPress event
        >
          <Text style={{
            color: Colors.WHITE,
            textAlign: 'center',
            fontFamily: 'outfit'
          }}>Book Here</Text>
        </TouchableOpacity>
      </View>
      
      <Text style={{
        fontFamily: 'outfit',
        fontSize: 17,
        marginTop: 7
      }}>Airline: {flightData?.airline}</Text>
      
      <Text style={{
        fontFamily: 'outfit',
        fontSize: 17
      }}>Estimated Price: ₹ {flightData?.estimatedPrice} </Text>
    </View>
  );
}
