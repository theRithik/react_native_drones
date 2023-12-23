import { GoogleSignin, GoogleSigninButton,statusCodes } from "@react-native-google-signin/google-signin";
import React from "react";
import { View,Text,Image,TouchableOpacity } from "react-native";

const GoogleLogin=()=>{

        // isSignedIn()

const signIn = async()=>{
  GoogleSignin.configure({
    clientId:'113050404249-9qni24q105sckdqq7au64n5ccakurrq3.apps.googleusercontent.com',
    webClientId:'113050404249-9qni24q105sckdqq7au64n5ccakurrq3.apps.googleusercontent.com',
    androidClientId:'113050404249-6skkd28m2su77omuaislvsvebe7qr9o6.apps.googleusercontent.com',
   })
        try{
            await GoogleSignin.hasPlayServices();
            const userInfo=await GoogleSignin.signIn()
            console.log('due....',userInfo)
        }catch(error){
            console.log('err Msg.....',error)
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                console.log('user cancelled the login flow')
              } else if (error.code === statusCodes.IN_PROGRESS) {
                console.log('operation (e.g. sign in) is in progress already')
              } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                console.log('play services not available or outdated')
              } else {
                console.log('some error happend try agian after sme time')
              }
    
        }
    }

// const getCurrentUserInfo=async()=>{
//     try{
//         constuserInfo = await GoogleSignin.signInSilently();
//         console.log('edit__',user);
//     }catch (error) {
//         if (error.code === statusCodes.SIGN_IN_REQUIRED) {
//           console.log('user has not signed in yet')
//           alert('user has not signed in yet')
//         } else {
//           console.log('some other error')
//           alert('Something error occured')
//         }
//       }
// }

// const signOut=async()=>{
//     try{
//         await GoogleSignin.revokeAccess();
//         await GoogleSignin.signOut();

//     }catch(error){
//         console.log(error)
//     }
// }

    return(
        <>
      <View style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
            <TouchableOpacity style={{padding:10,borderRadius:10,backgroundColor:'#EAEAEC'}}  onPress={signIn}>
              <Image source={require('../../../assets/google.png')} style={{width:30,height:30}} />
            </TouchableOpacity>
            </View>
           {/* <GoogleSigninButton
  size={GoogleSigninButton.Size.Wide}
  color={GoogleSigninButton.Color.Dark}
  onPress={signIn} 
  
/> */}
        </>
    )
}
export default GoogleLogin