import React,{useState,useContext} from "react";
import { StyleSheet} from "react-native";
import { Button, TextInput ,View, Text, TouchableOpacity, Image} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LottieView from 'lottie-react-native'
import { useWindowDimensions } from "react-native";
import { ScrollView } from "react-native";
import Toast from "react-native-toast-message";
import { ActivityIndicator } from "react-native";
import GoogleReg from "./googleReg";

const rurl='https://dronesapp.azurewebsites.net/android/emailVerfication'


const Register=({navigation})=>{
    const {width,height}=useWindowDimensions()
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [secure,setSecure]=useState(true)
    const[eye,setEye]=useState(true)
    const [confirm,setConfirm]=useState('')
    const [name,setName]=useState('')
const [loading,setLoading]=useState(false)
const iconPress=()=>{
if(secure===true){
    setSecure(false)
    setEye(false)
}
else{
    setSecure(true)
    setEye(true)
}
      
}

const registerRender=()=>{
  if(password!==confirm){
    Toast.show({
      type: 'tomatoToast',
      text1: 'Hello user!',
      text2: 'Password doest not match ❌'
    });
  }
  else{
    if(password.match( /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/)){
      console.log('running')
      setLoading(true)
      fetch(rurl,{
				method:'POST',
				 headers:{
					"accept":"application/json",
					"Content-Type":"application/json"
				 },
				 body:JSON.stringify({
					"Name":name,
					"Email":email,
					"Password":password
				 })
				}).then((res)=>res.json())
				 .then((value)=>{
						if(value.auth===true){
              Toast.show({
                type: 'tomatoToast',
                text1: 'Hello user!',
                text2: 'We have sent a email click on verify to complete you registration'
              });
              setLoading(false)
            }
            else{
              Toast.show({
                type: 'tomatoToast',
                text1: 'Hello user!',
                text2: 'email already exictes please try to login'
              });
              setLoading(false)
            }

          })
    }
    else{
      Toast.show({
        type: 'tomatoToast',
        text1: 'Hello user!',
        text2: 'password must contain special charaters',
      });
    }
  }
}
    return(
        
        <>
         <View style={{backgroundColor:'#AA2512',flex:1}}>
          
      <SafeAreaView  style={{marginBottom:20,}}>
        <View style={{flex:1}}>
    <TouchableOpacity onPress={()=> navigation.goBack()} 
         style={{alignContent:'center',flexDirection:'row',padding:20}}>
        
            <Image source={require('../../../assets/back.png')} tintColor={'orange'} style={{width:15,height:15,padding:10}} resizeMode="contain"/>

          </TouchableOpacity>
        </View>
        <View  style={{flexDirection:'row',justifyContent:'center',marginTop:30}}>
        <LottieView source={require('../../../assets/animations/Animation - 1701713431270.json')} style={{width:width*0.6}} autoPlay loop />
        </View>  
      </SafeAreaView>
      <View 
        style={styles.seccontent} 
        >
         
              <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{paddingHorizontal:10}}>
          <Text style={{fontSize:15,color:'black',fontWeight:400,margin:10,marginBottom:5}}>Name</Text>
            <TextInput placeholder="Email" value={name} onChangeText={text=>{setName(text)}} 
        style={styles.textInput}  />
            <Text style={{fontSize:15,color:'black',fontWeight:400,margin:10,marginBottom:5}}>Email Address</Text>
            <TextInput placeholder="Email" value={email} onChangeText={text=>{setEmail(text)}} keyboardType="email-address"
        style={styles.textInput}  />
            <Text style={{fontSize:15,color:'black',fontWeight:400,margin:10,marginBottom:5,marginTop:20}}>Password</Text>
       
            <TextInput 
              style={[styles.textInput]} 
              placeholder="Password" value={password} onChangeText={text=>{setPassword(text)}} secureTextEntry={true}
            />
            <Text style={{fontSize:8,paddingLeft:10,color:'grey'}}>password must be atleast six letters long</Text>
             <Text style={{fontSize:15,color:'black',fontWeight:400,margin:10,marginBottom:5,marginTop:20}}>Confirm Password</Text>
       
            <View style={{flexDirection:'row',alignItems:'center'}}>
            <TextInput 
              style={[styles.textInput,{flex:1}]} 
              placeholder="Confirm Password" value={confirm} onChangeText={text=>{setConfirm(text)}} secureTextEntry={secure}
            />
            <TouchableOpacity style={{padding:10}} onPress={iconPress}>
                {eye===true &&
                <Image source={require('../../../assets/eye.png')}style={{width:27,height:27}} tintColor={'#9492D0'}/>
                }
                {eye===false &&
                 <Image source={require('../../../assets/hidden.png')}style={{width:27,height:25}} tintColor={'#9492D0'}/>
                }
                </TouchableOpacity>
            </View>
            
            <View >
            <TouchableOpacity style={{alignContent:'center',flexDirection:'row-reverse',padding:10}}>
              <Text style={{color:'grey',fontSize:14,fontWeight:500}}>Forgot Password?</Text>
            </TouchableOpacity>
            </View>
            <View style={{marginHorizontal:40,marginVertical:20}}>
           {loading===true ?
           <View style={{backgroundColor:'#EF6531',borderRadius:10}}>
            <ActivityIndicator size={"small"} color="#fff" style={{padding:10}}/>
            </View>
:
            <TouchableOpacity 
             style={styles.signupB}
             onPress={registerRender}
                 >
                 <Text style={{justifyContent:'center',color:'#fff',alignItems:'center',fontWeight:800,fontSize:16}}>
                        Sign up
                </Text>
             </TouchableOpacity>
}
            </View>
          </View>
          <View style={{justifyContent:'center',alignContent:'center',flexDirection:'row'}}>
          <Text style={{color:'grey',fontWeight:600,}}>Or</Text>
         </View>
         <GoogleReg/>
          <View style={{justifyContent:'center',flexDirection:'row',margin:10}}>
              <Text style={{color:'grey',fontWeight:500,fontSize:12}}>
                Already had an account?
              </Text>
              <TouchableOpacity onPress={()=> navigation.navigate('login')}>
                  <Text style={{color:'orange',fontSize:13}}> Login</Text>
              </TouchableOpacity>
          </View>
          </ScrollView>
      </View>
     
    </View>
    </>
        
    )
}
export default Register

const styles=StyleSheet.create({
    textInput:{
        borderRadius:15,
        padding:10,
        paddingLeft:20,
        paddingRight:40,
        backgroundColor:'#E0E0E0',
        color:'black',
        fontSize:15,

    },
    signupB:{
        borderRadius:10,
        backgroundColor:'#EF6531',
        padding:10,
        justifyContent:'center',
        alignItems:'center'
    },
    seccontent:{
        flex:1,
        backgroundColor:'#fff',
        padding:30,
        borderTopLeftRadius:50,
        borderTopRightRadius:50,
        paddingBottom:0
    }
})