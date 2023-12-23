import React from "react";
import { StyleSheet, View,Text,Image, TouchableOpacity} from "react-native";
import GradientBGicon from "./GradientBGicon";
import ProfilePic from "./profilepic";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DrawerActions } from "@react-navigation/native";

const HeaderComponent=(props)=>{
  const handleRender=()=>{
    props.data.dispatch(DrawerActions.toggleDrawer())
  }
return(
    <View style={styles.headerContainer}>
        <TouchableOpacity onPress={handleRender}>
        <GradientBGicon name='menu' color={'#52555A'} size={16} />
        </TouchableOpacity>
        {/* <Text style={{color:'#a9acb0',fontSize:15}}>Hello Rithik!</Text> */}

<Image source={require('../../assets/title.png')} style={{width:100,height:100,position:'absolute',left:'45%',top:'10%'}}/>

<ProfilePic/>
    </View>
)
}
const styles = StyleSheet.create({
    headerContainer:{
        padding:30,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    headerText:{
        // fontFamily:'poppins',
        fontSize:20,
        color:'#fff'
    }
})
export default HeaderComponent