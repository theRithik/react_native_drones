import React,{useState,useContext,useEffect} from "react";
import { StyleSheet} from "react-native";
import { Button, TextInput ,View, Text, TouchableOpacity, Image} from "react-native";
import { AuthContext } from "./AuthControl";
import { SafeAreaView } from "react-native-safe-area-context";
import LottieView from 'lottie-react-native'
import { useWindowDimensions } from "react-native";
import { ScrollView } from "react-native";
import Toast from "react-native-toast-message";
import { ActivityIndicator } from "react-native";
import GoogleLogin from "./googleLogin";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login=({navigation})=>{
const {login}=useContext(AuthContext)
const {loginRender}=useContext(AuthContext)
    const {width,height}=useWindowDimensions()
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')

    return(
        <>
         <View style={{backgroundColor:'#9492D0',flex:1}}>
          
      <SafeAreaView  style={{marginBottom:30,}}>
        <View >
    <TouchableOpacity onPress={()=> navigation.goBack()} 
         style={{alignContent:'center',flexDirection:'row',padding:20}}>
        
            <Image source={require('../../../assets/back.png')} tintColor={'orange'} style={{width:15,height:15,padding:10}} resizeMode="contain"/>

          </TouchableOpacity>
        </View>
        <View  style={{flexDirection:'row',justifyContent:'center',marginTop:0}}>
        <LottieView source={require('../../../assets/animations/Animation - 1701651831498.json')} style={{width:width*1,}} autoPlay loop />
        </View>  
      </SafeAreaView>
      <View 
        style={styles.seccontent} 
        >
              <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{padding:10}}>
            <Text style={{fontSize:15,color:'black',fontWeight:400,margin:10,marginBottom:5}}>Email Address</Text>
            <TextInput placeholder="Email" value={email} onChangeText={text=>{setEmail(text)}} keyboardType="email-address"
        style={styles.textInput}  />
            <Text style={{fontSize:15,color:'black',fontWeight:400,margin:10,marginBottom:5,marginTop:20}}>Password</Text>
       
            <TextInput 
              style={[styles.textInput]} 
              placeholder="Password" value={password} onChangeText={text=>{setPassword(text)}} secureTextEntry={true}
            />
            
            <View >
            <TouchableOpacity style={{alignContent:'center',flexDirection:'row-reverse',padding:10}}>
              <Text style={{color:'grey',fontSize:14,fontWeight:500}}>Forgot Password?</Text>
            </TouchableOpacity>
            </View>
            <View style={{marginHorizontal:40,marginVertical:20}}>
            {login===true ?
           <View style={{backgroundColor:'#F9A826',borderRadius:10}}>
            <ActivityIndicator size={"small"} color="#fff" style={{padding:10}}/>
            </View>
:
            <TouchableOpacity 
             style={styles.signupB}
                 onPress={()=>loginRender(email,password)}>
                 <Text style={{justifyContent:'center',color:'#fff',alignItems:'center',fontWeight:800,fontSize:16}}>
                        Login
                </Text>
             </TouchableOpacity>
}
            </View>
          </View>
          <View style={{justifyContent:'center',alignContent:'center',flexDirection:'row'}}>
          <Text style={{color:'grey',fontWeight:600,}}>Or</Text>
         </View>
         <GoogleLogin/>
          <View style={{justifyContent:'center',flexDirection:'row',marginTop:10}}>
              <Text style={{color:'grey',fontWeight:500,fontSize:12}}>
                  Don't have an account?
              </Text>
              <TouchableOpacity onPress={()=> navigation.navigate('register')}>
                  <Text style={{color:'orange',fontSize:13}}> Sign Up</Text>
              </TouchableOpacity>
          </View>
          </ScrollView>
      </View>
     
    </View>
        </>
    )
}
export default Login

const styles=StyleSheet.create({
    textInput:{
        borderRadius:15,
        padding:10,
        paddingLeft:20,
        paddingRight:40,
        backgroundColor:'#E0E0E0',
        color:'black',
        fontSize:15,

    },
    signupB:{
        borderRadius:10,
        backgroundColor:'#F9A826',
        padding:10,
        justifyContent:'center',
        alignItems:'center'
    },
    seccontent:{
        flex:1,
        backgroundColor:'#fff',
        padding:30,
        borderTopLeftRadius:50,
        borderTopRightRadius:50,
        paddingBottom:0
    }
})