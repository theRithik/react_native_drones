import React,{useEffect,useState} from "react";
import { Text,View,StyleSheet,Image, StatusBar, ScrollView, ImageBackground, TouchableOpacity, ActivityIndicator, TouchableWithoutFeedback, Pressable, Linking, Button, Modal,TextInput} from "react-native";
import { Buffer } from "buffer";
import PhonePePaymentSDK from 'react-native-phonepe-pg' 
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

const url = "https://dronesapp.azurewebsites.net/user/courseDetails"
const udetail = "https://dronesapp.azurewebsites.net/android/basicDetail"
const adv = "https://dronesapp.azurewebsites.net/user/advanceFee"
const num = "https://dronesapp.azurewebsites.net/android/PhoneAdd"
const post = "https://dronesapp.azurewebsites.net/phonepe/adpay"
const order = "https://dronesapp.azurewebsites.net/user/courseOrder"
const Academy=({route,navigation})=>{
  
    const [details,setDetails]=useState('')
    const [on,setOn]=useState('')
    const [discountP,setDiscountp]=useState('')
    const [total,setTotal]=useState('')
    const [enviroment,setEnvironment]=useState('PRODUCTION')
    const [merchantId,setMerchantID]=useState('DRONESAPPONLINE')
    const [appId,setAppId]=useState('13455362')
    const [enablelog,setEnablelog]=useState(true)
    const {itemId}=route.params
    const[name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [phone,setPhone]=useState('')
    const [id,setId]=useState('')
    const [modal,setModal]=useState('')
const [advance,setAdvance]=useState('')
const [loading,setLoading]=useState('')
const [traId,setTraId]=useState('')
const [gst,setGst]=useState('')
const [paying,setPaying]=useState('')
    const init=async()=>{
const id = await AsyncStorage.getItem('Id')
setId(id)
    }
useEffect(()=>{
  init()
setDetails(itemId)
if(itemId.discount!==''){
    const dis = Number(itemId.discount)
    const pri = Number(itemId.fees)
    const total = pri - dis
    setDiscountp(itemId.fees)
    setTotal(total)
  }
 else{
  setTotal(itemId.fees)
 }
 fetch(adv,{method:'GET'})
 .then((res)=>res.json())
 .then((data)=>{
   setAdvance(data[0].fee)
   const ad= Number(data[0].fee)
   const gst = ad*18/100
   const total = ad+gst
   console.log(total)
   setGst(gst)
   setPaying(total)
   

 })
 fetch(udetail,{
  method:'POST',
  headers:{
    "accept":"application/json",
    "Content-Type":"application/json"
},
body:JSON.stringify({
  id:id
})
 }).then((res)=>res.json())
 .then((data)=>{
  const name = data.result[0].firstName
  const name2 = data.result[0].lastName
  const name3 = data.result[0].middleName
  const dtn = name + name2 + name3
  setName(dtn)
  setEmail(data.email)
  setPhone(data.phone)
 })

},[])
const bannerImg=(data)=>{
    if(data){  
      return [data].map((item)=>{
        const buffer = Buffer.from(item.display_image.data);
        let name = item.institute_name;
      name = name.replace(/\s+/g, '-')
      let cs =item.course
      cs = cs.replace(/\s+/g, '-')  
        return(
       <View key={item.id}>
        <ImageBackground  source={{ uri :`data:image/png;base64,${buffer}`}} style={styles.itemBackgroundImg} >
            <View style={styles.ImageBarheader}>
                <TouchableOpacity onPress={()=>{navigation.goBack()}} activeOpacity={0} >
                    <View style={{padding:10,justifyContent:'flex-start',backgroundColor:'black',borderRadius:10}}>
                    <Image source={require('../../assets/back.png')} tintColor={'#52555A'} style={{width:15,height:15}} resizeMode="contain"/>
                </View>
                </TouchableOpacity>
                <TouchableWithoutFeedback onPress={()=>{if(on!==true){
                    return setOn(true)
                }
                else{
                    return setOn(false)
                }
                }} style={{justifyContent:'flex-end'}} >
 <View style={{padding:10,backgroundColor:'black',borderRadius:10}}>
                   
                        <Image source={require('../../assets/favourite.png')} style={{width:15,height:15}} tintColor={on?'red':'#52555A'} resizeMode="contain"/>
</View>
                </TouchableWithoutFeedback>
            </View>
            <View style={styles.ImageInfoOuter}>
                <View style={styles.ImageInfoInner}>
                    <View style={styles.InfoContainerRow}>
                <View style={styles.ItemPropertiesContainer1}>
                    <Text style={styles.ItemTitleText}>{item.course}</Text>
                    <Text style={styles.ItemSubtitle}>{item.institute_name}</Text>
                </View>
                <View style={styles.ItemPropertiesContainer}>
                    <View style={styles.ProperFirst}>
                        <Image source={require('../../assets/time.png')} style={{width:25,height:25}}  tintColor={'tomato'} />
                        <Text style={[styles.PropertyTextFirst]}>{item.startDate}</Text>
                    </View>
                    <View style={styles.ProperFirst}>
                        <Image source={require('../../assets/location.png')} style={{width:25,height:25}} tintColor={'tomato'}/>
                        <Text style={styles.PropertyTextLast}>{item.state}</Text>
                    </View>
                </View>
                    </View>
                    <View style={styles.InfoContainerRow}>
                        <View style={styles.RatingContainer}>
                            <Image source={require('../../assets/star.png')} style={{width:18,height:18}}/>
                            <Text style={styles.RatingText}>4.5</Text>
                            <Text style={styles.RatingCountText}>(100)</Text>
                        </View>
                        <View style={styles.RoastedContainer}>
                            <Text style={styles.RoastedText}>{item.courseDuration}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </ImageBackground>
        <View>
<Text style={{color:'grey',fontSize:20,margin:20,marginBottom:10}}>Description</Text>
<ScrollView showsVerticalScrollIndicator={false} style={{height:110,}}>
<View style={{marginHorizontal:20}}>
    <Text style={{color:'#fff',fontSize:16,lineHeight:20,}}>{item.description}</Text>
</View>
</ScrollView>
    </View>
<View style={{flexDirection:'row',gap:20,margin:20}}>
    <View style={{backgroundColor:'#141921',padding:10,borderRadius:10}}>
        <Text style={{fontSize:15,color:'#AEAEAE'}}>Beginners</Text>
    </View>
    <View style={{backgroundColor:'#141921',padding:10,borderRadius:10}}>
        <Text style={{fontSize:15,color:'#AEAEAE'}}>{item.droneType}</Text>
    </View>
    <View style={{backgroundColor:'#141921',padding:10,borderRadius:10}}>
        <Text style={{fontSize:15,color:'#AEAEAE'}}>{item.droneCategory}</Text>
    </View>

</View>
    <View>
        <Text style={{color:'#fff'}}>Want to know more about this course</Text>
    <Pressable onPress={()=>{Linking.openURL(`https://www.dronesapp.in/academy/${name}/${cs}/${itemId.courseID}`)}}><Text style={{color:'tomato'}}>Click on this</Text></Pressable>
    </View>
       </View>
      )
      })

    }
    else{
        return(
            <View style={{flex:1,justifyContent:'center'}}>
                  <ActivityIndicator size="large" color="#0000ff" />
            </View>
        )
    }
}
const priceRender=(data)=>{
if(data){
    return [data].map((item)=>{
        return(
            <View key={item.id} style={styles.PriceFooter}>
      <View style={styles.PriceContainer}>
        <Text style={styles.PriceTitle}>Price</Text>
        <Text style={styles.PriceText}>
        ₹ <Text style={styles.Price}>{total}</Text>
        </Text>
                <Text style={{color:'#fff',fontSize:14,textDecorationLine:'line-through',textDecorationColor:'grey'}}>{discountP}</Text>
      </View>
      <TouchableOpacity
        style={styles.PayButton}
        onPress={buttonPress}>
        <Text style={styles.ButtonText}>Book</Text>
        <Text style={{fontSize:10,color:'#fff'}}>for ₹ {paying}</Text>
      </TouchableOpacity>
    </View>
        )
    })
}
}

const buttonPress=()=>{
  if(phone!==''){
    const tid = 'MT'+Math.floor(Date.now()*Math.random())
    setTraId(tid)
  fetch(post,{
    method:'POST',
    headers:{
      "accept":"application/json",
      "Content-Type":"application/json"
  },
  body:JSON.stringify({
    mTransId:'MT'+Math.floor(Date.now()*Math.random()),
    id:id,
    amount:paying,
    phone:phone
  })
  }).then((res)=>res.json())
  .then((data)=>{
    PhonePePaymentSDK.init(
      enviroment,
      merchantId,
      appId,
      enablelog
    ).then(result=>{
      console.log(result)
      const body= data.payload
      const checksum =data.check
      const apiEnd = '/pg/v1/pay'
      const headers =data.header
    const packagename='Dronesapp.apk'
    const callback = "Dronesapp.apk://"
  
  PhonePePaymentSDK.startPGTransaction(
  body,
  checksum,
  apiEnd,
  headers,
  callback,
  packagename
  ).then((a)=>{
    console.log(a)
    if(a.status==='SUCCESS'){
      console.log('payment successfuly')
      orderAcd(details)
    }
    else{
      console.log(a,'fail')
    }
  }).catch(err =>{
    console.log(err)
  })
  })
})
  }
  else{
    Toast.show({
      type: 'tomatoToast',
      text1: `Hello ${name}`,
      text2: 'Please enter your mobile number to continue',
    });
    return setModal(true)
  }
}

const orderAcd=(data)=>{
  fetch(order,{
    method:'POST',
    headers:{
      'accept':'application/json',
      'Content-Type':'application/json'
    },
    body:JSON.stringify({
      paymentID:traId,
      institute_id:data[0].institute_id,
      instituteName:data[0].institute_name,
      courseID:data[0].courseID,
      course:data[0].course,
      advance:advance,
      totalPaid:paying,
      gst:gst,
      price:total,
      type:'course',
      state:data[0].state,
      city:data[0].city,
      address:data[0].address,
      userId:id,
      startDate:data[0].startDate,
      name:name,
      email:email,
      phone:phone,
      lat:data[0].latitude,
      lng:data[0].longitude,
      courseDuration:data[0].courseDuration,
      dicount:data[0].dicount
    })
  }).then((res)=>res.json())
  .then((data)=>{
navigation.navigate('AcademyOrders')
  })
}


const saveNumber=()=>{
  setLoading(true)
  fetch(num,{
    method:'POST',
    headers:{
      "accept":"application/json",
      "Content-Type":"application/json"
  },
body:JSON.stringify({
id:id,
phone:phone
  })
  }).then((res)=>res.json())
  .then((data)=>{
    setLoading(false)
    setModal(false)
  })
}
    return(
        
        <View style={styles.ScreenContainer}>
            <StatusBar backgroundColor={'#0C0F14'}/>
            <ScrollView showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollViewFlex}>
 {bannerImg(details)}
 <Modal visible={modal} animationType="slide" transparent={true}>
  <View style={{margin:20,marginTop:'50%',backgroundColor:'#050577e6',padding:20,borderRadius:20}}>
  <View style={{flexDirection:'row-reverse'}}>
               <TouchableOpacity onPress={()=>{setModal(false)}}>
<Image source={require('../../assets/close.png')} tintColor={'#999999'} style={{width:20,height:20}}/>
       </TouchableOpacity>
          </View>
    <View style={{alignItems:'center'}}>
<Text style={{color:'#fff',fontSize:20}}>Phone Number</Text>
<TextInput onChangeText={(text)=>{setPhone(text)}} style={styles.inputBoxM}/>
<TouchableOpacity style={{backgroundColor:'#D17842',borderRadius:10,padding:10,paddingHorizontal:50,margin:10}} onPress={saveNumber}>
  <View>
    {loading &&
    <ActivityIndicator size={"large"}/>
    }
    <Text style={{color:'#fff'}}>Save</Text>
  </View>
</TouchableOpacity>
    </View>
  </View>
 </Modal>
</ScrollView>
{priceRender(details)}
        </View>
      
        
    )
}
export default Academy

const styles = StyleSheet.create({
    ScreenContainer:{
        flex:1,
        backgroundColor:'black',
    },
    scrollViewFlex:{
        flexGrow:1,
    },
    itemBackgroundImg:{
        width:'100%',
        aspectRatio:20/23,
    },

    ImageBarheader:{
    padding:30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between'
    },

    ImageInfoOuter: {
        paddingVertical:24,
        paddingHorizontal: 25,
        backgroundColor: 'rgba(12,15,20,0.5)',
        borderTopLeftRadius: 20 * 2,
        borderTopRightRadius: 20 * 2,
        width:'100%',
        position:'absolute',
        bottom:0
      },
      ImageInfoInner: {
        justifyContent: 'space-between',
        gap:15,
      },
      InfoContainerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      ItemTitleText: {
        // fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: 20,
        color: '#FFFFFF',
      },
      ItemSubtitle: {
        // fontFamily: FONTFAMILY.poppins_medium,
        fontSize: 13,
        color:'#FFFFFF',
      },
      ItemPropertiesContainer1:{
        justifyContent:'flex-start',
        width:'60%'
      } ,
      ItemPropertiesContainer: {
        flexDirection: 'row',
        gap:20,
      },
      ProperFirst: {
        height: 70,
        width: 70,
        borderRadius:15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0C0F14',
      },
      PropertyTextFirst: {
        // fontFamily: FONTFAMILY.poppins_medium,
        fontSize:12,
        color:'#FFFFFF',
        marginTop:10
      },
      PropertyTextLast: {
        // fontFamily: FONTFAMILY.poppins_medium,
        fontSize:12,
        color:'#FFFFFF',
        marginTop:2 + 4,
      },
      RatingContainer: {
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center',
      },
      RatingText: {
        // fontFamily: FONTFAMILY.poppins_semibold,
        fontSize:15,
        color: '#FFFFFF',
      },
      RatingCountText: {
        // fontFamily: FONTFAMILY.poppins_regular,
        fontSize:11,
        color: '#FFFFFF',
      },
      RoastedContainer: {
        height: 55,
        width: 55 * 2 + 20,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#0C0F14',
      },
      RoastedText: {
        // fontFamily: FONTFAMILY.poppins_regular,
        fontSize: 15,
        color: '#FFFFFF',
      },
      PriceFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
        padding: 20,
        paddingBottom:5,
        paddingTop:5,
      },
      PriceContainer: {
        alignItems: 'center',
        width: 100,
      },
      PriceTitle: {
        // fontFamily: FONTFAMILY.poppins_medium,
        fontSize: 14,
        color:'#AEAEAE',
      },
      PriceText: {
        // fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: 20,
        color:  '#D17842',
      },
      Price: {
        color:'#FFFFFF',
      },
      PayButton: {
        backgroundColor:'#D17842',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 30 * 2,
        borderRadius: 20,
      },
      ButtonText: {
        // fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: 18,
        color: '#FFFFFF',
      },
      inputBoxM:{
        backgroundColor:'#fff',
        width:'90%',
        padding:10,
        borderRadius:20,
        paddingHorizontal:30
       }

})