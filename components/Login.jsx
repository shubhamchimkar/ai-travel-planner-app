import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { Colors } from './../constants/Colors';
import { useRouter } from 'expo-router';

export default function Login() {
    const router = useRouter();

    return (
        <View style={{ flex: 1 }}>
            <Image 
                source={require('./../assets/images/login.jpg')}
                style={styles.image}
            />
            <View style={styles.container}>
                <Text style={styles.title}>AI Travel Planner</Text>
                <Text style={styles.description}>
                    Discover your next adventure effortlessly. Personalized itineraries at your fingertips. Travel smarter with AI-driven insights.
                </Text>
                <TouchableOpacity 
                    style={styles.button}
                    onPress={() => router.push('auth/sign-in')}
                >
                    <Text style={styles.buttonText}>Get Started</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 520,
    },
    container: {
        backgroundColor: Colors.WHITE,
        marginTop: -20,
        flex: 1, // Use flex instead of height: '100%'
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 25,
        alignItems: 'center', // Center content horizontally
    },
    title: {
        fontSize: 30,
        fontFamily: 'outfit-bold',
        textAlign: 'center',
        marginTop: 10,
    },
    description: {
        fontFamily: 'outfit',
        fontSize: 17,
        textAlign: 'center',
        color: Colors.GRAY || '#808080', // Fallback to gray if undefined
        marginTop: 20,
    },
    button: {
        padding: 15,
        backgroundColor: Colors.PRIMARY,
        borderRadius: 99,
        marginTop: '25%',
        width: '80%',
    },
    buttonText: {
        color: Colors.WHITE,
        textAlign: 'center',
        fontFamily: 'outfit',
        fontSize: 17,
    },
});
