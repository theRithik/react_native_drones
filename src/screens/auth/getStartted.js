import { View, Text, Image, TouchableOpacity ,StyleSheet} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import LottieView from 'lottie-react-native'
import { useWindowDimensions } from 'react-native'

 const  WelcomeScreen=()=>{
    const navigation = useNavigation();
    const {width,height} = useWindowDimensions()
  return (
    <SafeAreaView  style={{flex:1,margin:20}}>
        <View style={{justifyContent:'center',alignItems:'center'}}>
            <Text style={{color:'black',fontWeight:700,fontSize:40,  justifyContent: 'center',alignItems: 'center',}}>
                Let's Get Started!
            </Text>
            <View style={{ flexDirection:'row', justifyContent: 'center',}}>
            <LottieView source={require('../../../assets/animations/Animation - 1701689453729.json')} style={{width:width*1,}} autoPlay loop />
            </View>
            <View style={{ flexDirection:'row', justifyContent: 'center',marginBottom:height*0.2}}>
            <LottieView source={require('../../../assets/animations/Animation - 1701689481807.json')} style={{width:width*0.7,}} autoPlay loop />
            </View>
            <View style={{padding:20}}>
                <TouchableOpacity
                    onPress={()=> navigation.navigate('register')}
                    style={[{width:width*0.7},styles.signupB]}>
                        <Text 
                           style={{justifyContent:'center',alignItems:'center',fontWeight:800,fontSize:16}}
                        >
                            Sign Up
                        </Text>
                </TouchableOpacity>
                <View style={{flexDirection:'row',justifyContent:'center',marginTop:20}}>
                    <Text style={{fontSize:14,fontWeight:400}}>Already have an account?</Text>
                    <TouchableOpacity onPress={()=> navigation.navigate('login')}>
                        <Text style={{color:'orange',fontSize:15,fontWeight:700}}> Log In</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </SafeAreaView>
  )
}
export default WelcomeScreen

const styles=StyleSheet.create({
    signupB:{
        borderRadius:10,
        backgroundColor:'yellow',
        padding:10,
        justifyContent:'center',
        alignItems:'center'
    }
})