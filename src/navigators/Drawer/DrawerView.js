import { useDrawerProgress } from "@react-navigation/drawer";
import React from "react";
import { StyleSheet } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { interpolate, useDerivedValue, withSpring, withTiming } from 'react-native-reanimated'
const DrawerView=({children,style})=>{
    const drawerProgress=useDrawerProgress()

    const viewStyles =useAnimatedStyle(()=>{
        const scale=interpolate(
            drawerProgress.value,
            [0, 1],
            [1, 0.8]
            )
            const borderRadius= interpolate(
                drawerProgress.value,
                [0, 1],
                [0, 40],
            )
            return {
              transform: [{ scale }],borderRadius,
            }
    })
   
return(
   
    <Animated.View style={[styles.container,viewStyles]}>
        {children}
    </Animated.View>
  
)
}
export default DrawerView

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'black',
    }
})