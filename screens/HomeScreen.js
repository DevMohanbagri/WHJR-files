import React, {Component} from 'react';
import { StyleSheet, Text, View, Header, Platform, SafeAreaView, TouchableOpacity, ImageBackground, Image } from 'react-native';
import {StatusBar} from  'expo-status-bar';


export default class HomeScreen extends Component{
    render(){
        return(
            <View style = {styles.container}>
                <SafeAreaView style ={styles.drawoidSafeArea}/>
                
                <ImageBackground source={require('../assets/bg_image.png')} 
                style={styles.backgroundImage}>

                <View style={styles.titleBar}>
                    <Text style =  {styles.titleText}>ISS tracker App</Text>
                </View>
                
                <TouchableOpacity style = {styles.routeCard} 
                onPress={()=>{
                    this.props.navigation.navigate("ISSLocation")
                }}>
                    <Text style = {styles.routeText}>ISS Location</Text>
                    <Image source = {require('../assets/iss_icon.png')} style ={styles.iconImage} />
                </TouchableOpacity>

                <TouchableOpacity style ={styles.routeCard}
                 onPress={()=>{
                    this.props.navigation.navigate("MeteorsLocation")
                 }}>
                    <Text style = {styles.routeText}>Meteors Location</Text>
                    <Image source = {require('../assets/meteor_icon.png')} style ={styles.iconImage} />
                </TouchableOpacity>
                </ImageBackground>
            </View>


        )


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

    }
    
  });
  