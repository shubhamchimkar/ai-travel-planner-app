import { View, Text, TouchableOpacity } from "react-native";
import React, { useContext, useEffect } from "react";
import { useNavigation, useRouter } from "expo-router";
import { Colors } from "../../constants/Colors";
import { CreateTripContext } from "../../context/CreateTripContext";
import moment from "moment";

export default function ReviewTrip() {
  const navigation = useNavigation();
  const { tripData } = useContext(CreateTripContext);
  const router=useRouter();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: "",
    });
  }, []);

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 25,
        paddingTop: 80,
        backgroundColor: Colors.WHITE,
      }}
    >
      {/* Title */}
      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 36,
          color: Colors.PRIMARY,
        }}
      >
        Review Trip
      </Text>

      {/* Subtitle */}
      <Text
        style={{
          fontFamily: "outfit-medium",
          fontSize: 18,
          marginTop: 10,
          color: Colors.GRAY,
        }}
      >
        Before generating your trip, please review your selection.
      </Text>

      {/* Trip Details */}
      <View style={{ marginTop: 40 }}>
        {/* Destination */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 35,
          }}
        >
          <Text style={{ fontSize: 32 }}>📍</Text>
          <View style={{ marginLeft: 20 }}>
            <Text style={{ fontFamily: "outfit-bold", fontSize: 18, color: Colors.GRAY }}>
              Destination
            </Text>
            <Text style={{ fontFamily: "outfit-medium", fontSize: 22 }}>
              {tripData?.locationInfo?.name}
            </Text>
          </View>
        </View>

        {/* Travel Date */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 35,
          }}
        >
          <Text style={{ fontSize: 32 }}>🗓️</Text>
          <View style={{ marginLeft: 20 }}>
            <Text style={{ fontFamily: "outfit-bold", fontSize: 18, color: Colors.GRAY }}>
              Travel Date
            </Text>
            <Text style={{ fontFamily: "outfit-medium", fontSize: 22 }}>
              {moment(tripData?.startDate).format("DD MMM")} -{" "}
              {moment(tripData?.endDate).format("DD MMM")} ({tripData?.totalNoOfDays} days)
            </Text>
          </View>
        </View>

        {/* Travelers */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 35,
          }}
        >
          <Text style={{ fontSize: 32 }}>🚌</Text>
          <View style={{ marginLeft: 20 }}>
            <Text style={{ fontFamily: "outfit-bold", fontSize: 18, color: Colors.GRAY }}>
              Who is Travelling
            </Text>
            <Text style={{ fontFamily: "outfit-medium", fontSize: 22 }}>
              {tripData?.traveler?.title}
            </Text>
          </View>
        </View>

        {/* Budget */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 35,
          }}
        >
          <Text style={{ fontSize: 32 }}>💰</Text>
          <View style={{ marginLeft: 20 }}>
            <Text style={{ fontFamily: "outfit-bold", fontSize: 18, color: Colors.GRAY }}>
              Budget
            </Text>
            <Text style={{ fontFamily: "outfit-medium", fontSize: 22 }}>
              {tripData?.budget}
            </Text>
          </View>
        </View>
      </View>

      {/* Button */}
      <TouchableOpacity
      onPress={()=>router.push('/create-trip/generate-trip')}
        style={{
          paddingVertical: 18,
          borderRadius: 15,
          backgroundColor: Colors.PRIMARY,
          alignItems: "center",
          marginTop: 80,
          shadowColor: Colors.PRIMARY,
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 0.4,
          shadowRadius: 6,
          elevation: 6, // For Android shadow
        }}
      >
        <Text
          style={{
            fontSize: 22,
            fontFamily: "outfit-bold",
            color: Colors.WHITE,
          }}
        >
          Build My Trip
        </Text>
      </TouchableOpacity>
    </View>
  );
}
