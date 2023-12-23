import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect,useState } from 'react'
import { View ,Text,Image, Pressable, TextInput, TouchableOpacity, ScrollView, Modal, Button, ActivityIndicator} from 'react-native'
import {Buffer} from 'buffer'
import { StyleSheet } from 'react-native'
import Toast from 'react-native-toast-message'

const rurl ="https://dronesapp.azurewebsites.net/user/updateUserProfile"
const url ="https://dronesapp.azurewebsites.net/user/getUser"
const ProfileData=(props)=>{
    const [name,setName]=useState('')
    const {image,setImage}=useState(null)
const [email,setEmail]=useState('')
const [id , setId] = useState('')
const [phone,setPhone]=useState('')
const [aadhaar,setAadhaar]=useState('')
const [dob,setDob]=useState('')
const[altph,setAltph]=useState('')
const[passport,setPassword]=useState('')
const[perAdd,setPerAdd]=useState('')
const[addres,setAddres]=useState('')
const[last,setLast]=useState('')
const[binary,setBinary]=useState('')
const[mName ,setMName]=useState('')
const [modal,setModal]=useState(false)
    useEffect(()=>{
idretr()
    },[])
    const idretr=async()=>{
      const  id2 =await AsyncStorage.getItem('Id')
        setId(id2)
        fetch(url,{
           method:'POST',
           headers:{
               "accept":"application/json",
               "Content-Type":"application/json"
           },
           body:JSON.stringify({
               "id":id2
           })
       }).then((res)=>res.json())
       .then((data)=>{
          
        setName(data.result[0].firstName)  
        setEmail(data.result[0].email)
        setPhone(data.result[0].phone)
        setAadhaar(data.result[0].aadhaar)
        setDob(data.result[0].DOB)
        setAltph(data.result[0].alternativePhone)
        setPassword(data.result[0].passport)
        setPerAdd(data.result[0].presentAddress)
        setAddres(data.result[0].permanentAddress)
        setLast(data.result[0].lastName) 
        setMName(data.result[0].middleName)
        if(data.result[0].profilePhoto.data.length <10){
            setBinary('')
           
          }
          else{
            const buffer5=Buffer.from(data.result[0].profilePhoto)
            setBinary(buffer5)
           props.imageData(buffer5)
          }
       })
      }

      const updateDetails=()=>{
          fetch(rurl,{
               method:'PUT',
               headers:{
                   "accept":"application/json",
                   "Content-Type":"application/json"
               },
               body:JSON.stringify({
                   "_id":id,
                   "fstName":name,
                   "Mname":mName,
                   "lstName":last,
                   "email":email,
                   "phone":phone,
                   "alternate":altph,
                   "DOB":dob,
                   "passport":passport,
                   "aadhaar":aadhaar,
                   "paddress":addres,
                   "preAddress":perAdd
       
               })
               }).then((res)=>res.json())
               .then((data)=>{
                    setModal(false)
                    if(data.auth===true){
                       
                    Toast.show({
                         type: 'tomatoToast',
                         text1: `Hello ${name}`,
                         text2: 'Updated successfully',
                      })
                    }
           }).catch((err)=>{
               setModal(false)
               Toast.show({
                    type: 'tomatoToast',
                    text1: `Hello ${name}`,
                    text2: 'An error occured please try again',
                 })
           })
       }
       

    return(
<>
<View style={{flex:1,alignItems:'center'}}>
    <Text style={{color:'#fff',fontSize:18,fontWeight:600}}>{name}</Text>
    <TouchableOpacity onPress={()=>{setModal(true)}}>
    <Image source={require('../../assets/edit.png')} tintColor={'#999999'} style={{width:30,height:30,justifyContent:'flex-end'}}/>
</TouchableOpacity>
</View>
<Modal animationType='slide' visible={modal} transparent={true}>
     <View style={{margin:20}}>
          <View style={{flexDirection:'row-reverse'}}>
               <TouchableOpacity onPress={()=>{setModal(false)}}>
<Image source={require('../../assets/close.png')} tintColor={'#999999'} style={{width:20,height:20}}/>
       </TouchableOpacity>
          </View>
          <ScrollView showsVerticalScrollIndicator={false} >
<Text style={{color:'#999999',padding:5}}>First Name</Text>
<TextInput value={name} onChangeText={(text)=>{setName(text)}} style={styles.inputBox}/>
<Text style={{color:'#999999',padding:5}}>Middle Name</Text>
<TextInput value={mName} onChangeText={(text)=>{setMName(text)}} style={styles.inputBox}/>
<Text style={{color:'#999999',padding:5}}>Last Name</Text>
<TextInput value={last} onChangeText={(text)=>{setLast(text)}} style={styles.inputBox}/>
<Text style={{color:'#999999',padding:5}}>Email</Text>
<TextInput value={email} onChangeText={(text)=>{setEmail(text)}} style={styles.inputBox}/>
<Text style={{color:'#999999',padding:5}}>DOB</Text>
<TextInput value={dob} onChangeText={(text)=>{setDob(text)}} style={styles.inputBox}/>
<Text style={{color:'#999999',padding:5}}>Phone</Text>
<TextInput value={phone} onChangeText={(text)=>{setPhone(text)}} keyboardType='numeric' style={styles.inputBox}/>
<Text style={{color:'#999999',padding:5}}>Alternative Phone</Text>
<TextInput value={altph} onChangeText={(text)=>{setAltph(text)}} keyboardType='numeric' style={styles.inputBox}/>
<Text style={{color:'#999999',padding:5}}>Parmanent Address</Text>
<TextInput value={addres} onChangeText={(text)=>{setAddres(text)}} style={styles.inputBox}/>
<Text style={{color:'#999999',padding:5}}>present Address</Text>
<TextInput value={perAdd} onChangeText={(text)=>{setPerAdd(text)}} style={styles.inputBox}/>
<Text style={{color:'#999999',padding:5}}>Aadhaar No.</Text>
<TextInput value={aadhaar} onChangeText={(text)=>{setAadhaar(text)}} keyboardType='numeric' style={styles.inputBox}/>
<Text style={{color:'#999999',padding:5}}>Passport No.</Text>
<TextInput value={passport} onChangeText={(text)=>{setPassword(text)}} style={styles.inputBox}/>
<View style={{marginVertical:20}}>
     <View style={{alignItems:'center'}}>
     <TouchableOpacity onPress={updateDetails}style={{backgroundColor:'#0d26fd',padding:10,paddingHorizontal:50,borderRadius:30}}>
<View >
     <Text style={{color:'#fff',fontSize:20}}>Submit</Text>
</View>
     </TouchableOpacity>
     </View>
</View>
</ScrollView>
</View>
</Modal>
{name &&
<View style={{margin:30}}>
<View style={styles.inform}>
     <Text style={{color:'#999999',width:'40%'}}>First Name</Text>
     <Text style={{color:'#fff'}}>{name}</Text>
</View>
<View style={styles.inform}>
     <Text style={{color:'#999999',width:'40%'}}>Middle Name</Text>
     <Text style={{color:'#fff'}}>{mName}</Text>
</View>
<View style={styles.inform}>
     <Text style={{color:'#999999',width:'40%'}}>Last Name</Text>
     <Text style={{color:'#fff'}}>{last}</Text>
</View>
<View style={styles.inform}>
     <Text style={{color:'#999999',width:'40%'}}>Email</Text>
     <Text style={{color:'#fff'}}>{email}</Text>
</View>
<View style={styles.inform}>
     <Text style={{color:'#999999',width:'40%'}}>DOB</Text>
     <Text style={{color:'#fff'}}>{dob}</Text>
</View>
<View style={styles.inform}>
     <Text style={{color:'#999999',width:'40%'}}>Phone</Text>
     <Text style={{color:'#fff'}}>{phone}</Text>
</View>
<View style={styles.inform}>
     <Text style={{color:'#999999',width:'40%'}}>Alternative Phone</Text>
     <Text style={{color:'#fff'}}>{altph}</Text>
</View>

<View style={styles.inform}>
     <Text style={{color:'#999999',width:'40%'}}>Parmanent Address</Text>
     <Text style={{color:'#fff'}}>{addres}</Text>
</View>
<View style={styles.inform}>
     <Text style={{color:'#999999',width:'40%'}}>Present Address</Text>
     <Text style={{color:'#fff'}}>{perAdd}</Text>
</View>
<View style={styles.inform}>
     <Text style={{color:'#999999',width:'40%'}}>Aadhaar No.</Text>
     <Text style={{color:'#fff'}}>{aadhaar}</Text>
</View>
<View style={styles.inform}>
     <Text style={{color:'#999999',width:'40%'}}>Passport No.</Text>
     <Text style={{color:'#fff'}}>{passport}</Text>
</View>
</View>
}
{!name &&
<View style={{flex:1,justifyContent:'center'}}>
<ActivityIndicator size={'large'}/>
</View>
}
</>
    )
}
export default ProfileData

const styles=StyleSheet.create({
    inform:{
        flexDirection:'row',
        gap:40,
        margin:20,
        
    },
    inputBox:{
     backgroundColor:'rgb(41, 45, 62)',
padding:10,
borderRadius:20,
paddingLeft:30,
color:'rgb(191, 199, 213)',
fontSize:17,
flex:1,
marginBottom:5
    }
})