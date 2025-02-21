import { View, Text, Image, ScrollView, Dimensions } from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { Colors } from "../../constants/Colors";
import moment from "moment";
import FlightInfo from "../../components/TripDetails/FlightInfo";
import HotelList from "../../components/TripDetails/HotelList";
import PlannedTrip from "../../components/TripDetails/PlannedTrip";

const { width } = Dimensions.get("window");

export default function TripDetails() {
  const navigation = useNavigation();
  const { trip } = useLocalSearchParams();
  const [tripDetails, setTripDetails] = useState(null);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: "",
    });

    try {
      setTripDetails(trip ? JSON.parse(trip) : {});
    } catch (error) {
      console.error("Error parsing trip data:", error);
      setTripDetails({});
    }
  }, [trip]);

  const tripData = tripDetails?.tripData
    ? typeof tripDetails.tripData === "string"
      ? JSON.parse(tripDetails.tripData)
      : tripDetails.tripData
    : {};

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Trip Image */}
      {tripData?.locationInfo?.photoRef && (
        <Image
          source={{
            uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${tripData.locationInfo.photoRef}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}`,
          }}
          style={{
            width: "100%",
            height: 330,
            resizeMode: "cover",
          }}
        />
      )}

      {/* Trip Details Container */}
      <View
        style={{
          padding: 20,
          backgroundColor: Colors.WHITE,
          flex: 1,
          marginTop: -30,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 6,
          elevation: 5,
        }}
      >
        {/* Trip Location */}
        <Text
          style={{
            fontSize: 26,
            fontFamily: "outfit-bold",
            color: Colors.PRIMARY,
            textAlign: "center",
          }}
        >
          {tripDetails?.tripPlan?.tripDetails?.location || "Unknown Location"}
        </Text>

        {/* Trip Dates & Traveler Info */}
        <View style={{ alignItems: "center", marginTop: 10 }}>
          <Text
            style={{ fontFamily: "outfit", fontSize: 18, color: Colors.GRAY }}
          >
            {moment(tripData.startDate).format("DD MMM YYYY")} -{" "}
            {moment(tripData.endDate).format("DD MMM YYYY")}
          </Text>
          <Text
            style={{
              fontFamily: "outfit",
              fontSize: 17,
              color: Colors.GRAY,
              marginTop: 5,
            }}
          >
            🚌 {tripData.traveler?.title || "Unknown Traveler"}
          </Text>
        </View>

        {/* Flight Information */}
        {tripDetails?.tripPlan?.flights?.arrival && (
          <View style={{ marginTop: 20 }}>
            <FlightInfo flightData={tripDetails.tripPlan.flights.arrival} />
          </View>
        )}

        {/* Hotel List */}
        {tripDetails?.tripPlan?.hotels &&
          tripDetails.tripPlan.hotels.length > 0 && (
            <View style={{ marginTop: 20 }}>
              <HotelList hotelList={tripDetails?.tripPlan?.hotels} />
            </View>
          )}
        {/* Trip Day Planner Info */}
        {tripDetails?.tripPlan?.dailyItinerary &&
        Object.keys(tripDetails.tripPlan.dailyItinerary).length > 0 ? (
          <PlannedTrip details={tripDetails.tripPlan.dailyItinerary} />
        ) : (
          <Text
            style={{
              textAlign: "center",
              marginTop: 20,
              fontSize: 16,
              color: Colors.GRAY,
            }}
          >
            No itinerary available.
          </Text>
        )}
      </View>
    </ScrollView>
  );
}
