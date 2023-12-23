
import React from "react";
import {  AuthProvider} from "./src/screens/auth/AuthControl";
import 'react-native-gesture-handler';
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
import { View,Text ,Image} from "react-native";
import IndexRoute from "./indexRoute";
const toastConfig = {
   /*
     Overwrite 'success' type,
     by modifying the existing `BaseToast` component
   */
   success: (props) => (
     <BaseToast
       {...props}
       style={{ borderLeftColor: 'pink' }}
       contentContainerStyle={{ paddingHorizontal: 15 }}
       text1Style={{
         fontSize: 15,
         fontWeight: '400'
       }}
       text2Style={{
         fontSize:18
       }}
     />
   ),
   /*
     Overwrite 'error' type,
     by modifying the existing `ErrorToast` component
   */
   error: (props) => (
     <ErrorToast
       {...props}
       text1Style={{
         fontSize: 15
       }}
       text2Style={{
         fontSize: 13
       }}
     />
   ),
   /*
     Or create a completely new type - `tomatoToast`,
     building the layout from scratch.
 
     I can consume any custom `props` I want.
     They will be passed when calling the `show` method (see below)
   */
   tomatoToast: ({ text1, text2 }) => (
     <View style={{ height: 'auto', width: '90%', backgroundColor: '#fff',borderRadius:20,overflow:'hidden',padding:2,shadowColor:'white',shadowOpacity:1,shadowOffset:{width:2,height:4},shadowRadius:6,elevation:14}}>
      <View style={{padding:20}}>
         <View style={{flexDirection:'row',gap:20,alignItems:'center',maxWidth:'93%'}}>
      <Image source={require('./assets/logo.png')} style={{width:40,height:40}}/>
      <View style={{flexDirection:'column'}}>
       <Text style={{fontWeight:600}}>{text1}</Text>
       <Text>{text2}</Text>

       </View>
       </View>
       </View>
     </View>
   )
 };

const App=()=>{

    
   return(
  <AuthProvider>
   <IndexRoute/>
   <Toast
   config={toastConfig}/>
</AuthProvider>
)
}
export default App