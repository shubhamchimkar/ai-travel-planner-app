import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import moment from "moment";
import { Colors } from "../../constants/Colors";
import UserTripCard from "./UserTripCard";

export default function UserTripList({ userTrips }) {
  if (!userTrips || userTrips.length === 0) {
    return <Text style={{ textAlign: "center", marginTop: 20 }}>No trips available</Text>;
  }

  const LatestTrip = JSON.parse(userTrips[0]?.tripData || "{}");

  return (
    <View>
      <View
        style={{
          marginTop: 20,
        }}
      >
        <Image
          source={require("./../../assets/images/placeholder.jpg")}
          style={{
            width: "100%",
            height: 240,
            resizeMode: "cover",
            borderRadius: 15,
          }}
        />
      </View>
      <View
        style={{
          marginTop: 10,
        }}
      >
        <Text
          style={{
            fontFamily: "outfit-medium",
            fontSize: 20,
          }}
        >
          {userTrips[0]?.tripPlan?.tripDetails?.location || "Unknown Location"}
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 5,
          }}
        >
          <Text
            style={{
              fontFamily: "outfit",
              fontSize: 17,
              color: Colors.GRAY,
            }}
          >
            {LatestTrip.startDate ? moment(LatestTrip.startDate).format("DD MMM YYYY") : "Unknown Date"}
          </Text>
          <Text
            style={{
              fontFamily: "outfit",
              fontSize: 17,
              color: Colors.GRAY,
            }}
          >
            🚌 {LatestTrip.traveler?.title || "Unknown Traveler"}
          </Text>
        </View>
        <TouchableOpacity
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
        {userTrips.map((trip, index) => (
          <UserTripCard trip={trip} key={index} />
        ))}
      </View>
    </View>
  );
}
