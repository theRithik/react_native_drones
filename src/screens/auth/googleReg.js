import { GoogleSignin } from "@react-native-google-signin/google-signin";
import React from "react";
import { View,Text,Image,TouchableOpacity } from "react-native";
const GoogleReg=()=>{
  GoogleSignin.configure({
    webClientId:'113050404249-9qni24q105sckdqq7au64n5ccakurrq3.apps.googleusercontent.com',
    offlineAccess:true,
  })

  const register=async()=>{
try{
GoogleSignin.hasPlayServices()
const userInfo = await GoogleSignin.signIn()
console.log(userInfo,'njnjn')
}catch(error){
console.log(error)
}
  }
    return(
        <>
        <View style={{justifyContent:'center',flexDirection:'row',margin:10}}>
            <TouchableOpacity onPress={register} style={{padding:10,borderRadius:10,backgroundColor:'#EAEAEC'}}>
              <Image source={require('../../../assets/google.png')} style={{width:30,height:30}} />
            </TouchableOpacity>
          </View>
        </>
    )
}
export default GoogleReg