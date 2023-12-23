import React from "react";
import { StyleSheet,View,Text ,Image} from "react-native";
import Home from "../screens/home";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Services from "../screens/services";
import Courses from "./courses";
import OrdersNav from "./ordersNav";

const Tab = createBottomTabNavigator()
const TabNavigator=()=>{
    return(
        <>
        
<Tab.Navigator initialRouteName="home"  screenOptions={{ tabBarHideOnKeyboard:true, headerShown:false, tabBarShowLabel:false,tabBarStyle: styles.tabBarStyle,}}>

    <Tab.Screen name='home' component={Home} options={{
        tabBarIcon: ({focused,color})=>(
            <Image  source={require('../../assets/home.png')}
            style={{width: 23, height: 23,}}  tintColor={focused?'tomato':'grey'}/>
        )
    }}/>
    <Tab.Screen name="Favorite" component={Courses} options={{
        tabBarIcon: ({focused,color})=>(
            <Image  source={require('../../assets/course2.png')}
            style={{width: 28, height: 28,}} tintColor={focused?'tomato':'grey'}/>
        )
    }}/>
    <Tab.Screen name="courses" component={Services} options={{
       tabBarIcon: ({focused,color})=>(
        <Image  source={require('../../assets/serve.png')}
        style={{width: 28, height: 28,}} tintColor={focused?'tomato':'grey'} />
    )
    }}/>
     <Tab.Screen name="orders" component={OrdersNav} options={{
      tabBarIcon: ({focused,color})=>(
        <Image  source={require('../../assets/shopping-bag.png')}
        style={{width: 28, height: 28,}} tintColor={focused?'tomato':'grey'} />
    )
    }}/>
   
</Tab.Navigator>

</>
    )
}
export default TabNavigator
const styles = StyleSheet.create({
    tabBarStyle:{
        height:70,
        position:'absolute',
        backgroundColor:'#00007545',
        backfaceVisibility:'hidden',
        borderTopWidth:0,
        elevation:0,
        borderTopColor:'transparent',
        margin:50,
        borderRadius:30,
        marginBottom:20
    },
    BlurViewStyles:{
        position:'absolute',
        top:0,
        bottom:0,
        left:0,
        right:0
    }
})
