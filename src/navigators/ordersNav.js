import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import React from 'react'
import AcademyOrders from '../screens/AcdOrders'
import ServiceOrders from '../screens/ServOrders'
import { StyleSheet ,} from 'react-native'

const Tab = createMaterialTopTabNavigator()
const OrdersNav=()=>{
    return(
        <Tab.Navigator sceneContainerStyle={styles.sceneContainer} style={{backgroundColor:'black'}}
        screenOptions={{
            tabBarStyle:{backgroundColor:'#00007545',margin:10,marginHorizontal:30,borderRadius:30},
            tabBarContentContainerStyle:{marginTop:10,padding:10},
            tabBarLabelStyle:{color:'#fff',fontSize:12},
            tabBarAllowFontScaling:false,
            tabBarIndicatorStyle:{width:50,marginLeft:60}}}
            >

            <Tab.Screen name='AcademyOrders' component={AcademyOrders} options={{tabBarLabel:'Course Orders'}}/>
            <Tab.Screen name='ServiceOrders' component={ServiceOrders} options={{tabBarLabel:'Service Orders'}}/>

        </Tab.Navigator>
    )
}
export default OrdersNav

const styles=StyleSheet.create({
    sceneContainer:{
backgroundColor:'black',
    }
})