import React,{useState,useEffect} from "react";
import { View, useWindowDimensions ,ScrollView,StatusBar, StyleSheet,Image, Pressable, ActivityIndicator, ImageBackground} from "react-native";
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import * as FileSystem from 'expo-file-system';
import ProfileData from "./profileData";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Modal } from "react-native-paper";


const imgurl='https://dronesapp.azurewebsites.net/user/useraddImage'


const Profile=({navigation})=>{
    const {width}=useWindowDimensions()
const [image,setImage]=useState('')

let userName

const nameRe=async()=>{
userName=await AsyncStorage.getItem('name')
}
   useEffect(()=>{
nameRe()
   },[])
       
    // })


    const imagePress=async()=>{
            // No permissions request is necessary for launching the image library
            let result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.All,
              allowsEditing: true,
              quality: 1,
              allowsMultipleSelection:false, 
              exif:true

            });
        
       const id = await AsyncStorage.getItem('Id')
       console.log(id)
            if (!result.canceled) {
                const img = result.assets[0].uri
                const imageSize = await FileSystem.getInfoAsync(img);
                const sizeInMB = imageSize.size / (1024 * 1024); // Convert bytes to MB
if(sizeInMB<=1){

      userName = await AsyncStorage.getItem('name')
                const formData = new FormData()
                formData.append('image', {
                    uri: img,
                    type: 'image/jpeg', // Adjust the MIME type according to your file type
                    name: id, // Replace with your file name
                  });
                // if(data.size<=2000000){
                   
                     fetch(imgurl,{
                    method:'POST',
                    body:formData
                }).then((res)=>res.json())
                .then((data)=>{
console.log(data)
                }).catch((err)=>{
                    console.log(err)
                })
            }
            else{
                Toast.show({
                    type: 'tomatoToast',
                    text1: `Hello ${userName}`,
                    text2: 'Image size must be less than 1Mb',
                 })
            }
                // }
                // else{
                //     setMsg('size must be less then 5Mb')
                //     const toastLiveExample = document.getElementById('liveToast2')
                //     toastLiveExample.classList.add('show')
                //     setTimeout(()=>{
                //       toastLiveExample.classList.remove('show')
                //     },4000)
                // }
            }
        
    }

    const imgaeRender=(data)=>{
if(data){
    setImage(data)
}
    }
    return(
        <>
         <View style={styles.pageColor}>
            <StatusBar style={{backgroundColor:'black'}}/>
            <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollView}>
               <ImageBackground source={require('../../assets/Happy.png')} style={{backgroundColor:'#637aff',width:width,height:250,paddingTop:30}}>
              <View style={{justifyContent:'flex-start',alignItems:'flex-start'}}>
               <TouchableOpacity onPress={()=>{navigation.goBack()}} style={{backgroundColor:'black',marginLeft:20,padding:3,borderRadius:20}} >
              <View style={{padding:10,borderRadius:10}}>
              <Image source={require('../../assets/back.png')} tintColor={'#52555A'} style={{width:20,height:20}} resizeMode="contain"/>
          </View>
          </TouchableOpacity>
          </View>
               <View style={{alignItems:'center'}}>
                <TouchableOpacity onPress={imagePress} style={{marginTop:'15%'}}>
               <Image source={{ uri :`data:image/png;base64,${image}`}} style={{width:180,height:180,borderRadius:100,flexDirection:'column-reverse'}} resizeMode="contain"/>
               </TouchableOpacity>
               </View>
               </ImageBackground>
<View style={{marginTop:'15%'}}>
<ProfileData imageData={(data)=>{imgaeRender(data)}}/>

         </View>   
            </ScrollView>
            </View>

        </>
    )
}
export default Profile

const styles = StyleSheet.create({
    pageColor:{
        flex:1,
        backgroundColor:'black',
    },
     scrollView:{
        flexGrow:1,
    },
})