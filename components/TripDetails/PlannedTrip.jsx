import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";
import { GetPhotoRef } from "../../services/GooglePlaceApi"; // Function to fetch Google Place photo reference

export default function PlannedTrip({ details = [] }) {
  console.log("Trip Details:", details); // Debugging the received JSON

  return (
    <ScrollView style={{ marginTop: 20, paddingHorizontal: 15 }}>
      <Text style={{ fontFamily: "outfit-bold", fontSize: 22, marginBottom: 10 }}>
        🏡 Planned Itinerary
      </Text>

      {details.length === 0 ? (
        <Text style={{ fontSize: 16, color: "gray" }}>No itinerary available.</Text>
      ) : (
        details.map((dayPlan, index) => (
          <View
            key={index}
            style={{
              marginBottom: 20,
              padding: 15,
              backgroundColor: "#f9f9f9",
              borderRadius: 12,
              shadowColor: "#000",
              shadowOpacity: 0.1,
              shadowOffset: { width: 0, height: 2 },
              elevation: 3,
            }}
          >
            {/* Day Header */}
            <Text style={{ fontSize: 18, fontWeight: "bold", color: "#333", marginBottom: 10 }}>
              📅 Day {dayPlan?.day ?? index + 1} {/* Ensure day is not undefined */}
            </Text>

            {/* Activities */}
            {dayPlan.schedule?.length > 0 ? (
              dayPlan.schedule.map((activity, activityIndex) => (
                <ActivityCard key={activityIndex} activity={activity} />
              ))
            ) : (
              <Text style={{ fontSize: 14, color: "#999", marginTop: 5 }}>No activities planned.</Text>
            )}

            {/* Navigate Button */}
            <TouchableOpacity
              style={{
                backgroundColor: Colors.PRIMARY,
                padding: 5,
                borderRadius: 7,
                alignItems: "center",
              }}
            >
              <Ionicons name="navigate" size={24} color="white" />
            </TouchableOpacity>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const ActivityCard = ({ activity }) => {
  const [photoRef, setPhotoRef] = useState(null);

  useEffect(() => {
    if (activity.placeName) {
      fetchPlacePhoto();
    }
  }, [activity.placeName]);

  const fetchPlacePhoto = async () => {
    const result = await GetPhotoRef(activity.placeName);

    if (result?.results?.length > 0) {
      const photoReference = result.results[0]?.photos?.[0]?.photo_reference;
      if (photoReference) {
        setPhotoRef(photoReference);
      }
    }
  };

  return (
    <View style={{ marginBottom: 15 }}>
      {/* Activity Name */}
      <Text style={{ fontSize: 16, fontWeight: "bold", color: "#222" }}>📍 {activity.activity}</Text>

      {/* Location Name */}
      {activity.placeName && (
        <Text style={{ fontSize: 14, color: "#666", marginTop: 2 }}>📌 {activity.placeName}</Text>
      )}

      {/* Activity Image */}
      {photoRef ? (
        <Image
          source={{
            uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photoRef}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}`,
          }}
          style={{
            width: "100%",
            height: 150,
            borderRadius: 10,
            marginTop: 8,
            backgroundColor: "#ddd",
          }}
          resizeMode="cover"
        />
      ) : (
        <Text style={{ fontSize: 14, color: "#999", marginTop: 5 }}>📸 No Image Available</Text>
      )}

      {/* Activity Details */}
      {activity.details && (
        <Text style={{ fontSize: 14, color: "#444", marginTop: 5 }}>ℹ️ {activity.details}</Text>
      )}

      {/* Activity Time & Travel Time */}
      {activity.time && (
        <Text style={{ fontSize: 14, fontStyle: "italic", color: "#555", marginTop: 5 }}>
          ⏰ {activity.time} {activity.travelTime ? ` | 🚗 ${activity.travelTime} travel` : ""}
        </Text>
      )}

      {/* Ticket Price */}
      {activity.ticketPrice && (
        <Text style={{ fontSize: 14, fontWeight: "bold", color: "#008000", marginTop: 5 }}>
          🎟️ Ticket Price: {activity.ticketPrice}
        </Text>
      )}
    </View>
  );
};
