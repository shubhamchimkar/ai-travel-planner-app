import { View, Text, Image } from 'react-native'
import React from 'react'
import moment from 'moment'

export default function UserTripCard({trip}) {
    const formatData=(data)=>{
        return JSON.parse(data);

    }
  return (
    <View style={{
        marginTop:15
    }}>
    <Image source={require('./../../assets/images/placeholder.jpg')}
    style={{
        width:100,
        height:100
    }}
    />
    <View>
        <Text>{trip.tripPlan?.tripDetails?.location}</Text>
        <Text>{moment(formatData(trip.tripData).startDate).format('DD MMM YYYY')}</Text>
    </View>
    </View>
  )
}