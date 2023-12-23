
import React,{useContext} from "react";
import { NavigationContainer } from "@react-navigation/native";
import { View,Image } from "react-native";
import { AuthContext, AuthProvider} from "./src/screens/auth/AuthControl";
import Auth from "./src/screens/auth/authnaviagtion";
import DrawerNav from "./src/navigators/drawerNavigator";



const IndexRoute=()=>{
    const {isLoading}=useContext(AuthContext)
    const {userToken} = useContext(AuthContext)
    console.log(userToken,'yours')
    if(isLoading){  
return(
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
       <Image source={require('./assets/frontLogo.gif')} width={200} height={200} resizeMode="contain"/>
    </View>
)
    }
    const config = {
        screens: {
            initialRouteName: 'first',
            first:{
            path:'first'
          },
          welcome:{
            path:'welcomeScreen'
          }
        },
      };
    const linking = {
        prefixes: ['Dronesapp.apk://', 'https://dronesapp.in','https://*.dronesapp.in'],
        config
      };
return(
  
    <NavigationContainer linking={linking} fallback={<View style={{justifyContent:'center',flex:1,alignItems:'center'}}><Image source={require('./assets/logoanim.gif')} style={{width:100,height:100}}/></View>}>
        {userToken !==null ? <DrawerNav/> : <Auth/> }
    </NavigationContainer>
)
}
export default IndexRoute