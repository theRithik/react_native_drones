import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FirstPage from "./firstPage";
import Login from "./login";
import OnboardingScreen from "./firstPage";
import WelcomeScreen from "./getStartted";
import Register from "./userRegister";

const stack = createNativeStackNavigator()
const Auth=()=>{
return(

    <stack.Navigator screenOptions={{headerShown:false,}}>
<stack.Screen name="first" component={OnboardingScreen} options={{animation:'slide_from_bottom'}}/>
<stack.Screen name="welcome" component={WelcomeScreen} options={{animation:'slide_from_right'}}/>
<stack.Screen name="login" component={Login} options={{animation:'slide_from_right'}}/>
<stack.Screen name="register" component={Register} options={{animation:'slide_from_right'}}/>
    </stack.Navigator>

)
}
export default Auth