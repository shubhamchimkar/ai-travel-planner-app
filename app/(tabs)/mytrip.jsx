import { View, Text } from "react-native";
import React, { useEffect, useInsertionEffect, useState } from "react";
import { Colors } from "./../../constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import StartNewTripCard from "../../components/MyTrips/StartNewTripCard";
import { auth, db } from "./../../configs/FirebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { ActivityIndicator } from "react-native";
import UserTripList from "../../components/MyTrips/UserTripList";


export default function MyTrip() {
  const [userTrip, setUserTrip] = useState([]);
  const user = auth.currentUser;
  const [loading,setLoading]=useState(false);

  useEffect(() => {
    user && GetMyTrips();
  }, [user]);

  const GetMyTrips = async () => {
    setLoading(true);
    setUserTrip([]);
    const q = query(
      collection(db, "UserTrips"),
      where("userEmail", "==", user?.email)
    );
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      setUserTrip(prev=>[...prev,doc.data()])
    });
    setLoading(false);
  };

  return (
    <View
      style={{
        padding: 25,
        paddingTop: 55,
        backgroundColor: Colors.WHITE,
        height: "100%",
      }}>
        
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignContent: "center",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            fontFamily: "outfit-bold",
            fontSize: 30,
          }}
        >
          My Trip
        </Text>
        <Ionicons name="add-circle" size={35} color="black" />
      </View>
      {loading&&<ActivityIndicator size={'large'} color={Colors.PRIMARY}/>}

      {userTrip?.length == 0? 
      <StartNewTripCard/>
       : 
       <UserTripList userTrips={userTrip}/>
       }
    </View>
  );
}
