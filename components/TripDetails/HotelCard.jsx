import { View, Text, Image } from "react-native";
import { GetPhotoRef } from "../../services/GooglePlaceApi";
import { useEffect, useState } from "react";

export default function HotelCard({ item }) {
    const [photoRef, setPhotoRef] = useState(null);

    useEffect(() => {
        if (item?.hotelName) {
            GetGooglePhotoRef();
        }
    }, [item.hotelName]);

    const GetGooglePhotoRef = async () => {
        const result = await GetPhotoRef(item.hotelName);

        if (result?.results?.length > 0) {
            const photoReference = result.results[0]?.photos?.[0]?.photo_reference;
            if (photoReference) {
                setPhotoRef(photoReference);
            }
        }
    };

    return (
        <View style={{ marginRight: 20 }}>
            {photoRef ? (
                <Image 
                    source={{
                        uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photoRef}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}`,
                    }}
                    style={{
                        width: 180,
                        height: 120,
                        borderRadius: 15,
                    }}
                />
            ) : (
                <Image 
                    source={require("../../assets/images/placeholder.jpg")} // Fallback image
                    style={{
                        width: 180,
                        height: 120,
                        borderRadius: 15,
                    }}
                />
            )}
            <View style={{ padding: 5 }}>
                <Text style={{ fontFamily: "outfit-medium", fontSize: 17 }}>
                    {item.hotelName || "Unknown Hotel"}
                </Text>
                <View
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                    }}
                >
                    <Text style={{ fontFamily: "outfit" }}>⭐{item.rating}</Text>
                    <Text style={{ fontFamily: "outfit" }}>💰 ₹{item.pricePerNight}/night</Text>
                </View>
            </View>
        </View>
    );
}
