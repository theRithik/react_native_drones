import React from "react";
import { Button, StatusBar, Text, useWindowDimensions,ScrollView ,Image, Linking} from "react-native";
import { View } from "react-native";
import LottieView from 'lottie-react-native'
import { TouchableOpacity } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import HeaderComponent from "../components/headerComponent";
const Contact=({navigation})=>{
    const {width}=useWindowDimensions()
const locationPress=()=>{
    Linking.openURL('https://www.google.com/maps/place/Agmay+Technologies+Pvt+Ltd/@17.405644,78.559802,16z/data=!4m6!3m5!1s0x3bcb995623b10441:0xa5c2ba63e9ba2161!8m2!3d17.405531!4d78.5595871!16s%2Fg%2F11s2h5hxfq?hl=en&entry=ttu')
}

    return(
        <>
           <View style={styles.pageColor}>
            <StatusBar style={{backgroundColor:'black'}}/>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollView}>
                <HeaderComponent data={navigation}/>
                <View style={{margin:20}}>
                    <View style={{flex:1,alignItems:'center'}}>
                    <Text style={{color:'#fff',fontSize:30}}>Contact Us</Text>
                    </View>
                    <View style={{margin:10,alignItems:'center'}}>
                        <LottieView source={require('../../assets/animations/Animation - 1702374478600.json')} style={{width:width*1}} autoPlay loop/>
                        <View style={{marginVertical:20}}>
                            <View style={{justifyContent:'center',alignItems:'center',margin:20}}>
                            <Text style={{color:'#637aff',fontSize:20,alignContent:'center'}}>Address</Text>
                            </View>
                            <View style={{flexDirection:'row',gap:40,margin:20}}>
                                <Image source={require('../../assets/phone.png')} tintColor={'red'} style={{width:20,height:20}}/>
                                <Text style={{color:'#fff',fontSize:20}}>+91 7989549956</Text>
                            </View>
                            <View style={{flexDirection:'row',gap:40,margin:20}}>
                                <Image source={require('../../assets/email.png')} tintColor={'orange'} style={{width:20,height:20}}/>
                                <Text style={{color:'#fff',fontSize:20}}>info@agmaytechnologies.com</Text>
                            </View>
                            <View style={{flexDirection:'row',gap:40,margin:20}}>
                                <Image source={require('../../assets/location.png')} tintColor={'blue'} style={{width:20,height:20}}/>
                                <Text style={{color:'#fff',fontSize:20}}> Telangana</Text>
                            </View>

                            <View style={{marginVertical:20,alignItems:'center'}}>
                                <TouchableOpacity onPress={locationPress} >
                                    <View style={{flexDirection:'row',borderRadius:30,backgroundColor:'#0d26fd',padding:10,alignItems:'center',paddingHorizontal:20}}>
                                    <Image source={require('../../assets/location.png')} tintColor={'#fff'} style={{width:20,height:20}}/>
                                    <Text style={{fontSize:20,color:'#fff'}}>Loaction</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    </View>
                    </ScrollView>
            </View></>
    )
}

export default Contact

const styles = StyleSheet.create({
    scrollView:{
        flexGrow:1
    }
})