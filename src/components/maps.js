import React,{useState,useEffect} from 'react'
import { StyleSheet, Text, View } from "react-native";
import MapView from "react-native-maps";
import { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from 'expo-location'
import { PermissionsAndroid } from 'react-native';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

const url = 'https://dronesapp.azurewebsites.net/android/distance'
const trav = 'https://dronesapp.azurewebsites.net/android/getTcharge'
const Maps=(props)=>{

    const [mark,setMark]=useState({})
const[show,setShow]=useState('')
const [userName,setUserName]=useState('')
// useEffect(()=>{

//   const requestLocationPermission = async () => {
//     try {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//         {
//           title: 'Geolocation Permission',
//           message: 'Can we access your location?',
//           buttonNeutral: 'Ask Me Later',
//           buttonNegative: 'Cancel',
//           buttonPositive: 'OK',
//         },
//       );
//       console.log('granted', granted);
//       if (granted === 'granted') {
//         console.log('You can use Geolocation');
       
//         getGeo()
//       } else {
//         console.log('You cannot use Geolocation');
      
//       }
//     } catch (err) {
//       console.log(err)
//     }
//   };
// requestLocationPermission()
//   },[])
  // const getGeo=async()=>{
  //   let status= await Location.getForegroundPermissionsAsync()
  //   if(status.granted === true){
  //     getLocation()
  //   }
  // }
//   const getLocation =async () => {
//    let current= await Location.getCurrentPositionAsync({})
// console.log('location',current)
// if(current.latitude){
//   setLocation({
//     latitude:current.latitude,
//     longitude:current.longitude,
//     latitudeDelta:0.429,
//     longitudeDelta:0.024
//   })
// }
//   };

useEffect(()=>{
initize()
},[])

const initize=async()=>{
  const data = await AsyncStorage.getItem('name')
  setUserName(data)
}
    const handleView=(e)=>{
      const lat = e.nativeEvent.coordinate.latitude
      const lng = e.nativeEvent.coordinate.longitude

        setShow(true)
        console.log('Maap',)
setMark({
    latitude:lat,
    longitude:lng,
    latitudeDelta:0.01,
    longitudeDelta:0.01
})
console.log(lat,lng,props.msg1[0].latitude,props.msg1[0].longitude)
let totalT;
fetch(url,{
  method:'POST',
  headers:{
    'accept':'application/json',
    'Content-Type':'application/json'
  },
  body:JSON.stringify({
    ulat:lat,
    ulng:lng,
    Slat:props.msg1[0].latitude,
    Slng:props.msg1[0].longitude
  })
}).then((res)=>res.json())
.then((data)=>{
  console.log('map2')
  if(data){
    
  const dist = data.data.split('k')[0]
  const matter = props.msg1[0].serviceRadius
  const radius =matter.slice(0,-2)
  console.log(dist,radius,(Number(radius)>Number(dist)))
  if(Number(radius)>=Number(dist)){
    const distance = dist
  fetch(trav,{
    method:'GET',
  }).then((res)=>res.json())
  .then((data)=>{
    const filt = data.filter((item)=>{ 
      return Number(item.distanceB) >= Number(distance) && Number(distance)>=Number(item.distanceA)
    })
    totalT = filt[0].price
    const totalVAl={
      ulat:lat,
      ulng:lng,
      tdist:dist,
      distPrice:totalT
    }
    props.handledist(totalVAl)
  })
  }
  else{
    Toast.show({
      type: 'tomatoToast',
      text1: `Hello ${userName}!`,
      text2: 'the service provider is not avaliable for your location distance',
    });
  }
}else{
  Toast.show({
    type: 'tomatoToast',
    text1: `Hello ${userName}!`,
    text2: 'An error occured please try again',
  });
}
})

    }
    return(
        <>
  <View style={styles.container}>
    {/*Render our MapView*/}
      <MapView
        style={styles.map}
        //specify our coordinates.
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude:17.085787,
          longitude: 76.7578124,
          latitudeDelta: 10,
          longitudeDelta: 10,
        }}
        onPress={handleView}
        showsUserLocation={true}
      >
     {(show===true) &&
        <Marker coordinate={mark}/>
}
      </MapView>
    </View>
        </>
    )
}
export default Maps

const styles = StyleSheet.create({
    container:{
        justifyContent:'center',
        height:400,
        width:'98%',
        borderRadius:20,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
        borderRadius:20,
        backgroundColor:'#fff'
      },
})