import React,{useContext, useRef, useState,useEffect} from "react";
import { StatusBar, StyleSheet ,View,Text,Image,TouchableOpacity} from "react-native";
import Animated from "react-native-reanimated";
import { interpolate, useAnimatedStyle, useDerivedValue, withSpring, withTiming } from 'react-native-reanimated'
// import DrawerItemList from "./dtaw";
import { DrawerItemList, useDrawerProgress } from '@react-navigation/drawer'
import { AuthContext } from "../screens/auth/AuthControl";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "react-native-paper";
const CustomDraw=(props)=>{
  const { state, descriptors, navigation } = props;
  const{logout}=useContext(AuthContext)
  const [name,setName]=useState('')
useEffect(()=>{
dataRen()
},[])
const dataRen=async()=>{
const nm = await AsyncStorage.getItem('name')
setName(nm)
}
  const[token,setToken]=useState(null)
    const scrollRef = useRef(null)
    const drawerProgress = useDrawerProgress();
    const viewStyles = useAnimatedStyle(() => {
        const translateX = interpolate(
          drawerProgress.value,
          [0, 1],
          [-200, 0],
        )
        return {
          transform: [{ translateX }]
        }
      })
    
    const viewStyles2 = (type) => useAnimatedStyle(() => {
        const val = type === 'top' ? -100 : 100;
        const translateY = interpolate(
          drawerProgress.value,
          [0, 1],
          [val, 0],
        )
        const opacity = interpolate(
          drawerProgress.value,
          [0, 1],
          [0, 1],
        )
        return {
          transform: [{ translateY }], opacity
        }
      })
    return(
        <>
        <View style={styles.container}>
<Animated.View style={[styles.startView,viewStyles2('top')]}>
<View style={styles.icoContainer}>
<Image source={require('../../assets/logo.png')} style={{width:30,height:30}}/>
</View>
<Text style={styles.headerTitle}>Hello 👋</Text>
</Animated.View>

<Animated.ScrollView ref={scrollRef} {...props}
showsVerticalScrollIndicator={false}
style={[styles.vertical,viewStyles]}>
    {/* <DrawerItemList {...props} styles={styles} /> */}
    <DrawerItemList {...props}/>

</Animated.ScrollView>

<TouchableOpacity onPress={()=>{logout(token)}}>
        <Animated.View
          style={[styles.row, styles.startView, styles.marginBottom, viewStyles2('bottom')]}>
          <Image style={styles.profile} source={require('../../assets/boy.png')} />
          <View style={styles.icoContainer}>
            <Text style={styles.headerTitle}>{name}</Text>
            <Text style={styles.text}>Software Engineer</Text>
          </View>
          <Image source={require('../../assets/exit.png')} style={{width:20,height:20}}/>
        </Animated.View>
      </TouchableOpacity>
        </View>
        </>
    )
}
export default CustomDraw
const styles = StyleSheet.create({
    container:{
flex:1,
backgroundColor:'black'
    },
    startView:{
        borderRadius:20,
        padding:10,
        marginTop:40,
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'#637aff',
        marginBottom:30,
        marginHorizontal:10
    },
    icoContainer:{
        padding:10,
        borderRadius:20,
      
    },
    marginBottom:{
        marginBottom:30
    },
    row:{
        flexDirection:'row',
        alignItems:'center',
        gap:20
    },
    headerTitle: {
        fontSize: 17,
        color: '#fff',
      },
      profile: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#EEEEEE',
      },
      text:{
        fontSize:10
      }

})