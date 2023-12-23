import React from "react";
import { StyleSheet, View ,Image, Touchable} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const GradientBGicon=()=>{
    return(

        <View style={styles.container}>
            <LinearGradient 
            start={{x:0,y:0}}
            end={{x:1,y:1}}
            colors={['#252A32','#0C0F14']}
            style={styles.LinearGradientBG}>
                <Image source={require('../../assets/menu.png')} tintColor={'grey'} style={{width:30,height:30}}/>
            </LinearGradient>
        </View>
    
    )
}
const styles= StyleSheet.create({
    container:{
        borderWidth:2,
        borderColor:'#21262E',
        borderRadius:10,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#21262E',
        overflow:'hidden'
    },
    LinearGradientBG:{
        height:36,
        width:36,
        alignItems:'center',
        justifyContent:'center'
    }
})
export default GradientBGicon