import React,{useEffect,useState} from "react";
import { View } from "react-native";
import {Text, Image, TouchableOpacity, ScrollView, ActivityIndicator, Linking } from 'react-native'


const url = "https://dronesapp.azurewebsites.net/user/getServiceDetails"
const SorderDetails=({route,navigation})=>{
    const {itemId}=route.params
    const [service,setService]=useState('')
    const [from,setFrom]=useState('')
    const init=()=>{
        
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
                    setService(data.data)
                    setFrom(data.data[0].bookedDates)
                }
             })
    }
    useEffect(()=>{
init()
    },[])

    const booking=()=>{
        if(from.length>11){
            const m1 = from.split('~')[0]
            const m2 = from.split('~')[1]
            //console.log()(from)
            return(
                    <View style={{flexDirection:'row',gap:20,marginBottom:20}}>
                    <View style={{width:'40%'}}>
<Text style={{color:'#999999'}}>Dates Booked : </Text>
                    </View>
                    <View style={{maxWidth:'60%'}}>
<Text style={{color:'#fff'}}>From {m1}  To {m2}</Text>
                    </View>
                </View>
            )
        }
        else{
            return(
                <View style={{flexDirection:'row',gap:20,marginBottom:20}}>
                <View style={{width:'40%'}}>
<Text style={{color:'#999999'}}>Dates Booked : </Text>
                </View>
                <View style={{maxWidth:'60%'}}>
<Text style={{color:'#fff'}}>{from}</Text>
                </View>
            </View>
            )
        }
    }

    const renderOrders=(data)=>{
        if(data){
            return data.map((item)=>{
                return(
                    <View key={item.id}>
                        <View style={{flexDirection:'row',gap:20,marginBottom:20}}>
                            <View style={{width:'40%'}}>
        <Text style={{color:'#999999'}}>Payment ID  </Text>
                            </View>
                            <View style={{maxWidth:'60%'}}>
        <Text style={{color:'#fff'}}>{item.paymentID}</Text>
                            </View>
                        </View>
                        <View style={{flexDirection:'row',gap:20,marginBottom:20}}>
                            <View style={{width:'40%'}}>
        <Text style={{color:'#999999'}}>Service Person  </Text>
                            </View>
                            <View style={{maxWidth:'60%'}}>
        <Text style={{color:'#fff'}}>{item.servicePerson}</Text>
                            </View>
                        </View>
                        <View style={{flexDirection:'row',gap:20,marginBottom:20}}>
                            <View style={{width:'40%'}}>
        <Text style={{color:'#999999'}}>Service  </Text>
                            </View>
                            <View style={{maxWidth:'60%'}}>
        <Text style={{color:'#fff'}}>{item.orderCategory}</Text>
                            </View>
                        </View>
                        <View style={{flexDirection:'row',gap:20,marginBottom:20}}>
                            <View style={{width:'40%'}}>
        <Text style={{color:'#999999'}}>Service Category </Text>
                            </View>
                            <View style={{maxWidth:'60%'}}>
        <Text style={{color:'#fff'}}>{item.subCategory}</Text>
                            </View>
                        </View>
                        <View style={{flexDirection:'row',gap:20,marginBottom:20}}>
                            <View style={{width:'40%'}}>
        <Text style={{color:'#999999'}}>Phone Number  </Text>
                            </View>
                            <View style={{maxWidth:'60%'}}>
        <Text style={{color:'#fff'}}>{item.servicePhone}</Text>
                            </View>
                        </View>
                        <View style={{flexDirection:'row',gap:20,marginBottom:20}}>
                            <View style={{width:'40%'}}>
        <Text style={{color:'#999999'}}>Booking  </Text>
                            </View>
                            <View style={{maxWidth:'60%'}}>
        <Text style={{color:'#fff'}}>{item.booking}</Text>
                            </View>
                        </View>
                        {booking()}
                        <View style={{flexDirection:'row',gap:20,marginBottom:20,alignItems:'center'}}>
                            <View style={{width:'40%'}}>
        <Text style={{color:'#999999'}}>Booked on  </Text>
                            </View>
                            <View style={{maxWidth:'60%'}}>
        <Text style={{color:'#fff'}}>{item.booking}</Text>
                            </View>
                        </View>
                        <View style={{flexDirection:'row',gap:20,marginBottom:20}}>
                            <View style={{width:'40%'}}>
        <Text style={{color:'#999999'}}>Name  </Text>
                            </View>
                            <View style={{maxWidth:'60%'}}>
        <Text style={{color:'#fff'}}>{item.userName}</Text>
                            </View>
                        </View>
                        <View style={{flexDirection:'row',gap:20,marginBottom:20}}>
                            <View style={{width:'40%'}}>
        <Text style={{color:'#999999'}}> Email  </Text>
                            </View>
                            <View style={{maxWidth:'60%'}}>
        <Text style={{color:'#fff'}}>{item.userEmail}</Text>
                            </View>
                        </View>
                        <View style={{flexDirection:'row',gap:20,marginBottom:20}}>
                            <View style={{width:'40%'}}>
        <Text style={{color:'#999999'}}>subTotal  </Text>
                            </View>
                            <View style={{maxWidth:'60%'}}>
        <Text style={{color:'#fff'}}>₹ {item.subtotal}</Text>
                            </View>
                        </View>
                        <View style={{flexDirection:'row',gap:20,marginBottom:20}}>
                            <View style={{width:'40%'}}>
        <Text style={{color:'#999999'}}>Tarvel Charges </Text>
                            </View>
                            <View style={{maxWidth:'60%'}}>
        <Text style={{color:'#fff'}}>₹ {item.travelCharges}</Text>
                            </View>
                        </View>
                        <View style={{flexDirection:'row',gap:20,marginBottom:20}}>
                            <View style={{width:'40%'}}>
        <Text style={{color:'#999999'}}>Gst  </Text>
                            </View>
                            <View style={{maxWidth:'60%'}}>
        <Text style={{color:'#fff'}}>₹ {item.gst}</Text>
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
        <Text style={{color:'#fff'}}>₹ {item.price}</Text>
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
        <>
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
            <ScrollView showsVerticalScrollIndicator={false} >
            <View style={{marginTop:30,margin:10,backgroundColor:'#121313',borderRadius:20,padding:20}}>
{renderOrders(service)}
            </View>
            </ScrollView>
            </View>
        </View>
        </>
    )
}
export default SorderDetails