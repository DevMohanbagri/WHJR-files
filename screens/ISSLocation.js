import React, {Component} from 'react';
import { ImageBackground, StyleSheet, Text, View,Platform, StatusBar,SafeAreaView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import axios from "axios";
export default class ISSLocation extends Component{
    constructor(props){
        super(props)
        this.state={
            location: {}
        }
    }

    getIssLocation=()=>{
        axios 
            .get("https://api.wheretheiss.at/v1/satellites/25544")
            .then(response=>{
                this.setState ({
                    location: response.data
                })
            })
            .catch(error => {
                alert(error.message)
            })
    }

    componentDidMount(){
        this.getIssLocation()
    }

    render(){
        if (Object.keys(this.state.location).length === 0) {
            return (
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                    <Text>Loading</Text>
                </View>
            )
        } else {
    
        return(
            <View style = {styles.container}>
                <SafeAreaView/>
                <ImageBackground source={require('../assets/iss_bg.jpg')} style = {styles.backgroundImage}>
                <View style ={styles.titleConatiner}>
                <Text style ={styles.titleText}>
                    ISS Location
                </Text>
                </View>
                
                <View style = {styles.mapContainer}>
                <MapView style={styles.map} 
                  region = {{
                    latitude : this.state.location.latitude,
                    longitude: this.state.location.longitude,
                    latitudeDelta: 100,
                    longitudeDelta:100 
                }}>
                   
                    <Marker coordinate={{ latitude: this.state.location.latitude, longitude: this.state.location.longitude }}>
                      <Image source={require('../assets/iss_icon.png')} style={{ height: 50, width: 50 }} />
                    </Marker> 
                </MapView>

                
                </View>

                <View style = {styles.infoContainer}>
                    <Text style = {styles.infoText}>Latitude: {this.state.location.latitude}</Text>
                    <Text style={styles.infoText}>Longitude: {this.state.location.longitude}</Text>
                    <Text style={styles.infoText}>Altitude (KM): {this.state.location.altitude}</Text>
                    <Text style={styles.infoText}>Velocity (KM/H): {this.state.location.velocity}</Text>
                </View>
                </ImageBackground>
                
                
            </View>
        )
    }
}
}

const styles = StyleSheet.create({
    container: {
      flex: 1,    
    }, 
    drawoidSafeArea:{
        marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0  ,
    },
    titleBar: {
        flex: 0.15,
        justifyContent: "center",
        alignItems: "center"
    },

    titleText:{
        fontWeight: 'bold',
        fontSize: 40,
        color: 'white'

        
    },
    routeCard: {
        flex: 0.25,
        marginLeft: '25%',
        marginRight: '25%',
        marginTop: 50,
        borderRadius: 30,
        backgroundColor: 'white',
      
    },
    routeText:{
        fontSize: 35,
        fontWeight: "bold",
        color: "black",
        marginTop: 75,
        paddingLeft: 30
    },
    
    backgroundImage:{
        flex : 1,  
        resizeMode: 'cover',
    },
    iconImage: {
        position: "absolute",
        height: 200,
        width: 200,
        resizeMode: "contain",
        right: 20,
        top: -40,

    },
    textContainer:{
        flex: 0.1,
        justifyContent:'center',
        alignItems: 'center'
    },
    
    mapContainer: {
        flex: 0.7
    },
    map: {
        width: "100%",
        height: "100%"
    },
    infoContainer: {
        flex: 0.2,
        backgroundColor: 'white',
        marginTop: -10,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 30
    },
    infoText: {
        fontSize: 15,
        color: "black",
        fontWeight: "bold"
    } 
  });
  