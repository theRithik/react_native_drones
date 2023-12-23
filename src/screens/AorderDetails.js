import React,{useEffect, useState} from 'react'
import { View,Text, Image, TouchableOpacity, ScrollView, ActivityIndicator, Linking } from 'react-native'

const url = "https://dronesapp.azurewebsites.net/user/getOrderDetails"
const AOrderDetails=({navigation,route})=>{
    const {itemId}=route.params
    const [course,setCourse]=useState('')
    const [locDms,setLocDms]=useState('')
    useEffect(()=>{
            fetch(url,{
                method:'POST',
                    headers:{
                        'accept':'application/json',
                    'Content-Type':'application/json'
                    },
                    body:JSON.stringify({
                        "id":itemId
                    })
                 }).then((res)=>res.json())
                 .then((data)=>{
                    if(data.data){
                        setCourse(data.data)
                        function toDMS(deg) {
                            var d = Math.floor(deg);
                            var min = Math.floor((deg - d) * 60);
                            var sec = ((deg - d - min / 60) * 3600).toFixed(2);
                            return d + "°" + min + "'" + sec + "\"";
                        }
                        
                        function convertLatLngToDMS(lat, lng) {
                            var latDMS = lat >= 0 ? "N" : "S";
                            var lngDMS = lng >= 0 ? "E" : "W";
                            
                            lat = Math.abs(lat);
                            lng = Math.abs(lng);
                            
                            var latDMSString = toDMS(lat);
                            var lngDMSString = toDMS(lng);
                            
                            return latDMSString + " " + latDMS + " " + lngDMSString + " " + lngDMS;
                        }
                        const lat = Number(data.data[0].latitude)
                        const lng = Number(data.data[0].longitude)

                         const dms = convertLatLngToDMS(lat, lng)
                         setLocDms(dms)
                    }
                 })
                 
    },[])

    const renderOrders=(data)=>{
if(data){
    return data.map((item)=>{
        return(
            <View key={item.id}>
                <View style={{flexDirection:'row',gap:20,marginBottom:20}}>
                    <View style={{width:'40%'}}>
<Text style={{color:'#999999'}}>Payment ID : </Text>
                    </View>
                    <View style={{maxWidth:'60%'}}>
<Text style={{color:'#fff'}}>{item.paymentID}</Text>
                    </View>
                </View>
                <View style={{flexDirection:'row',gap:20,marginBottom:20}}>
                    <View style={{width:'40%'}}>
<Text style={{color:'#999999'}}>Course Name : </Text>
                    </View>
                    <View style={{maxWidth:'60%'}}>
<Text style={{color:'#fff'}}>{item.courseName}</Text>
                    </View>
                </View>
                <View style={{flexDirection:'row',gap:20,marginBottom:20}}>
                    <View style={{width:'40%'}}>
<Text style={{color:'#999999'}}>Institute Name : </Text>
                    </View>
                    <View style={{maxWidth:'60%'}}>
<Text style={{color:'#fff'}}>{item.instituteName}</Text>
                    </View>
                </View>
                <View style={{flexDirection:'row',gap:20,marginBottom:20}}>
                    <View style={{width:'40%'}}>
<Text style={{color:'#999999'}}>State : </Text>
                    </View>
                    <View style={{maxWidth:'60%'}}>
<Text style={{color:'#fff'}}>{item.state}</Text>
                    </View>
                </View>
                <View style={{flexDirection:'row',gap:20,marginBottom:20}}>
                    <View style={{width:'40%'}}>
<Text style={{color:'#999999'}}>City : </Text>
                    </View>
                    <View style={{maxWidth:'60%'}}>
<Text style={{color:'#fff'}}>{item.city}</Text>
                    </View>
                </View>
                <View style={{flexDirection:'row',gap:20,marginBottom:20}}>
                    <View style={{width:'40%'}}>
<Text style={{color:'#999999'}}>Address : </Text>
                    </View>
                    <View style={{maxWidth:'60%'}}>
<Text style={{color:'#fff'}}>{item.address}</Text>
                    </View>
                </View>
                <View style={{flexDirection:'row',gap:20,marginBottom:20,alignItems:'center'}}>
                    <View style={{width:'40%'}}>
<Text style={{color:'#999999'}}>Location : </Text>
                    </View>
                    <View style={{maxWidth:'60%'}}>
<TouchableOpacity onPress={()=>{Linking.openURL(`https://www.google.com/maps/place/${locDms}/@${item.latitude},${item.longitude},18z/data=!3m1!4b1!4m4!3m3!8m2!3d16.535219!4d80.640256?entry=ttu`)}}>
    <View style={{backgroundColor:'blue',borderRadius:20,padding:10,paddingHorizontal:30,alignItems:'center',flexDirection:'row',gap:5}}>
      <Image source={require('../../assets/location.png')} tintColor={'#fff'} style={{width:15,height:15}}/>
        <Text style={{color:'#fff'}}>Location</Text>
    </View>
</TouchableOpacity>
                    </View>
                </View>
                <View style={{flexDirection:'row',gap:20,marginBottom:20}}>
                    <View style={{width:'40%'}}>
<Text style={{color:'#999999'}}>Start Date : </Text>
                    </View>
                    <View style={{maxWidth:'60%'}}>
<Text style={{color:'#fff'}}>{item.courseStartDate}</Text>
                    </View>
                </View>
                <View style={{flexDirection:'row',gap:20,marginBottom:20}}>
                    <View style={{width:'40%'}}>
<Text style={{color:'#999999'}}>Course Fee </Text>
                    </View>
                    <View style={{maxWidth:'60%'}}>
<Text style={{color:'#fff'}}>{item.price}</Text>
                    </View>
                </View>
                <View style={{flexDirection:'row',gap:20,marginBottom:20}}>
                    <View style={{width:'40%'}}>
<Text style={{color:'#999999'}}>Enroll Date  </Text>
                    </View>
                    <View style={{maxWidth:'60%'}}>
<Text style={{color:'#fff'}}>{item.DateandTime}</Text>
                    </View>
                </View>
                <View style={{flexDirection:'row',gap:20,marginBottom:20}}>
                    <View style={{width:'40%'}}>
<Text style={{color:'#999999'}}>Student Name  </Text>
                    </View>
                    <View style={{maxWidth:'60%'}}>
<Text style={{color:'#fff'}}>{item.userName}</Text>
                    </View>
                </View>
                <View style={{flexDirection:'row',gap:20,marginBottom:20}}>
                    <View style={{width:'40%'}}>
<Text style={{color:'#999999'}}>Student Email  </Text>
                    </View>
                    <View style={{maxWidth:'60%'}}>
<Text style={{color:'#fff'}}>{item.userEmail}</Text>
                    </View>
                </View>
                <View style={{flexDirection:'row',gap:20,marginBottom:20}}>
                    <View style={{width:'40%'}}>
<Text style={{color:'#999999'}}>Student Phone </Text>
                    </View>
                    <View style={{maxWidth:'60%'}}>
<Text style={{color:'#fff'}}>{item.phone}</Text>
                    </View>
                </View>
                <View style={{flexDirection:'row',gap:20,marginBottom:20}}>
                    <View style={{width:'40%'}}>
<Text style={{color:'#999999'}}>Gst </Text>
                    </View>
                    <View style={{maxWidth:'60%'}}>
<Text style={{color:'#fff'}}>{item.gst}</Text>
                    </View>
                </View>
                <View style={{flexDirection:'row',gap:20,marginBottom:20}}>
                    <View style={{width:'40%'}}>
<Text style={{color:'#999999'}}>Total Paid </Text>
                    </View>
                    <View style={{maxWidth:'60%'}}>
<Text style={{color:'#fff'}}>{item.totalPaid}</Text>
                    </View>
                </View>
            </View>
        )
    })
}else{
    return(
        <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
            <View style={{flex:1,justifyContent:'space-around',alignItems:'center'}}>
<ActivityIndicator size={'large'}/>
</View>
        </View>
    )
}
    }
    return(
        <View style={{backgroundColor:'black',flex:1}}>
            <View style={{margin:30,marginHorizontal:20}}>
            <View style={{backgroundColor:'#637aff',padding:20,borderRadius:30,flexDirection:'row',gap:60,alignItems:'center'}}>
             <TouchableOpacity onPress={()=>{navigation.goBack()}}> 
        <View style={{backgroundColor:'#191a1b',borderRadius:20,padding:10}}>
<Image source={require('../../assets/back.png')} tintColor={'grey'} style={{width:20,height:20}}/>
</View>
</TouchableOpacity>
<View>
    <Text style={{color:'#fff',fontSize:20,fontWeight:600}}>Order Details</Text>
</View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{marginTop:30,margin:10,backgroundColor:'#121313',borderRadius:20,padding:20}}>
{renderOrders(course)}
            </View>
            </ScrollView>
            </View>
        </View>
    )
}
export default AOrderDetails