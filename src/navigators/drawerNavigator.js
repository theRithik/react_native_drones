import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDraw from "./customDraw";

import { StyleSheet } from "react-native";
import Home from "../screens/home";
import { Image } from "react-native";

import Main from "../screens/MAIN";

import About from "../screens/about";
import Contact from "../screens/contact";
import Profile from "../screens/profile";

const Drawer=createDrawerNavigator()
const DrawerNav=(props)=>{
    return(
        <>
        <Drawer.Navigator  screenOptions={{
            headerShown:false,
            drawerActiveBackgroundColor:'#637aff',
            drawerActiveTintColor:'#333',
            drawerType:'slide',
            overlayColor:'transparent',
            drawerInactiveTintColor:'#999999',
            sceneContainerStyle:styles.scenestyle,
            drawerHideStatusBarOnOpen:true,
            drawerInactiveBackgroundColor:'transparent',
          drawerStyle:styles.drstyle,
          drawerItemStyle:styles.menu,
          drawerLabelStyle:styles.label,
        }} drawerContent={(props)=><CustomDraw {...props}/>} initialRouteName="Main">
       <Drawer.Screen name="Home" component={Main}options={{
        drawerIcon:()=>(
          <Image source ={require('../../assets/home.png')} tintColor={'#333'} style={{width:18,height:18}}/>
        )
       }} /> 
      
       <Drawer.Screen name="Profile" component={Profile} options={{
        drawerIcon:()=>(
          <Image source ={require('../../assets/user.png')} tintColor={'#333'} style={{width:23,height:23}}/>
        )
       }}/> 
       <Drawer.Screen name="About" component={About} options={{
        drawerIcon:()=>(
          <Image source ={require('../../assets/favourite.png')} tintColor={'#333'} style={{width:23,height:23}}/>
        )
       }} />
       <Drawer.Screen name="Contact us"  component={Contact}options={{
        drawerIcon:()=>(
          <Image source ={require('../../assets/handshake.png')} tintColor={'#333'} style={{width:28,height:28,}}/>
        ),headerTitle:'My service'
       }} /> 
       
             {/* <Drawer.Screen name="Academy" component={Academy} options={{drawerItemStyle:{display:'none'}}}/>
             <Drawer.Screen name="service" component={Service} options={{drawerItemStyle:{display:'none'}}}/>
             <Drawer.Screen name="Schart" component={ScheckPoint} options={{drawerItemStyle:{display:'none'}}}/> */}
        </Drawer.Navigator> 
        </>
    )
}
export default DrawerNav

const styles = StyleSheet.create({
    scenestyle:{
        backgroundColor:'black',
    },
    drstyle:{
      backgroundColor:'black',
    },
    menu:{
      padding:10,
      borderRadius:20,
      gap:30, 
      paddingLeft:30,
      marginHorizontal:20,
      opacity:1
    },
    label:{
      fontSize:13,
      fontWeight:400,
      backgroundColor:'transparent'
    }
})