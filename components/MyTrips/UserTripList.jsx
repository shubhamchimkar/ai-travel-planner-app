import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import moment from "moment";
import { Colors } from "../../constants/Colors";
import UserTripCard from "./UserTripCard";
import { useRouter } from "expo-router";

export default function UserTripList({ userTrips = [] }) {
  if (!userTrips.length) {
    return <Text style={{ textAlign: "center", marginTop: 20 }}>No trips available</Text>;
  }

  const router = useRouter();

  // Function to navigate to trip details
  const handleTripPress = (trip) => {
    router.push({
      pathname: "/trip_details",
      params: { trip: JSON.stringify(trip) },
    });
  };

  // Get the latest trip (last element in the array)
  const latestIndex = userTrips.length - 1;
  const latestTrip = userTrips[latestIndex];
  const latestTripData = typeof latestTrip?.tripData === "string" ? JSON.parse(latestTrip.tripData) : latestTrip?.tripData || {};

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 50 }} showsVerticalScrollIndicator={false}>
      <View style={{ marginTop: 20 }}>
        {/* Show image if photoRef exists */}
        {latestTripData?.locationInfo?.photoRef && (
          <Image
            source={{
              uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${latestTripData.locationInfo.photoRef}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}`,
            }}
            style={{
              width: "100%",
              height: 240,
              resizeMode: "cover",
              borderRadius: 15,
            }}
          />
        )}
      </View>

      <View style={{ marginTop: 10 }}>
        <Text style={{ fontFamily: "outfit-medium", fontSize: 20 }}>
          {latestTrip?.tripPlan?.tripDetails?.location || "Unknown Location"}
        </Text>

        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 5 }}>
          <Text style={{ fontFamily: "outfit", fontSize: 17, color: Colors.GRAY }}>
            {moment(latestTripData.startDate).format("DD MMM YYYY")}
          </Text>
          <Text style={{ fontFamily: "outfit", fontSize: 17, color: Colors.GRAY }}>
            🚌 {latestTripData?.traveler?.title}
          </Text>
        </View>

        {/* "See Your Plan" Button for latest trip */}
        <TouchableOpacity
          onPress={() => handleTripPress(latestTrip)}
          style={{
            backgroundColor: Colors.PRIMARY,
            padding: 15,
            borderRadius: 15,
            marginTop: 10,
          }}
        >
          <Text
            style={{
              color: Colors.WHITE,
              textAlign: "center",
              fontFamily: "outfit-medium",
              fontSize: 15,
            }}
          >
            See Your Plan
          </Text>
        </TouchableOpacity>

        {/* Other trips (clickable cards) */}
        {userTrips.slice(0, latestIndex).map((trip, index) => (
          <TouchableOpacity key={index} onPress={() => handleTripPress(trip)} activeOpacity={0.8}>
            <UserTripCard trip={trip} />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}
