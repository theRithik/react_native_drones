import React from "react";
import { Text, useWindowDimensions ,StyleSheet,StatusBar,ScrollView} from "react-native";
import { View } from "react-native";
import LottieView from 'lottie-react-native'
import HeaderComponent from "../components/headerComponent";

const About=({navigation})=>{
    const {width}=useWindowDimensions()
    return(
        <>
      <View style={styles.pageColor}>
            <StatusBar style={{backgroundColor:'black'}}/>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollView}>
                <HeaderComponent data={navigation}/>
                <View style={{margin:20}}>
                    <View style={{flex:1,alignItems:'center'}}>
                    <Text style={{color:'#fff',fontSize:30}}>About Us</Text>
 </View>
 <View style={{flexDirection:'column'}}>
<View  style={{marginVertical:20}}>
    <View >
    <LottieView source={require('../../assets/animations/Animation - 1701713431270.json')} style={{width:width*0.9,}} autoPlay loop />
    </View>
    <View style={{alignItems:'center',marginVertical:20}} >
<Text style={{color:'#637aff',fontSize:25}}>Introduction</Text>
<Text style={{color:'#999999',fontSize:14,margin:10}}>The world of urban aviation to be easy without any hudles and economic. It needs to meet the basic needs.</Text>
    </View>
</View>
<View style={{marginVertical:20}}>
    <View >
    <LottieView source={require('../../assets/animations/Animation - 1701651936394.json')} style={{width:width*1.2,position:'relative',right:40}} autoPlay loop />
    </View>
    <View style={{alignItems:'center',marginVertical:20}}>
<Text style={{color:'#637aff',fontSize:25,justifyContent:'center',alignContent:'center'}}>Mission</Text>
<Text style={{color:'#999999',fontSize:14,margin:10}}>We are running towards bringing new technologies to the coming generations. We work towards learning, growing, and delivering in a timely.</Text>
    </View>
</View>
<View style={{marginVertical:20}}>
    <View >
    <LottieView source={require('../../assets/animations/Animation - 1701651831498.json')} style={{width:width*1.2}} autoPlay loop />
    </View>
    <View style={{alignItems:'center',marginVertical:20}}>
<Text style={{color:'#9517B9',fontSize:25,justifyContent:'center',alignContent:'center'}}>Vision</Text>
<Text style={{color:'#999999',fontSize:14,margin:10}}>The world of urban aviation to be easy without any hudles and economic. It needs to meet the basic needs.</Text>
    </View>
</View>
</View>
                </View>
          </ScrollView>
         
            </View></>
    )
}

export default About

const styles=StyleSheet.create({
    scrollView:{
        flexGrow:1,
    },
})