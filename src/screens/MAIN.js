import React,{useEffect} from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Academy from './academy';
import TabNavigator from '../navigators/tabNavigator';
import Service from './serviceDetails';
import ScheckPoint from './serviceCheckPoint';

import DrawerView from '../navigators/Drawer/DrawerView';
import AOrderDetails from './AorderDetails';
import SorderDetails from './SorderDetails';
// import * as Font from 'expo-font';

const stack = createNativeStackNavigator()
const Main=()=>{
// useEffect(() => {
//   async function loadFont() {
//     await Font.loadAsync({
//       'custom-font': require('./assets/fonts/Poppins-Black.ttf'),
//     });

//     Text.defaultProps.style.fontFamily = 'Poppins-Black';
//   }

//   loadFont();
// }, []);
  return (
 <>
<DrawerView>
    <stack.Navigator screenOptions={{headerShown:false}} initialRouteName='HomePage' >
      <stack.Screen name='HomePage' component={TabNavigator} options={{animation:'slide_from_bottom'}}/>
      <stack.Screen name='Academy' component={Academy} options={{animation:'slide_from_bottom'}}/>
      <stack.Screen name='service' component={Service} options={{animation:'slide_from_bottom'}}/>
      <stack.Screen name='Scart' component={ScheckPoint} options={{animation:'flip',}}/>
      <stack.Screen name='AorderDetails' component={AOrderDetails} options={{animation:'slide_from_bottom'}}/>
      <stack.Screen name='SorderDetails' component={SorderDetails} options={{animation:'slide_from_bottom'}}/>
    </stack.Navigator>
  </DrawerView>

 </>
  );
}

export default Main
