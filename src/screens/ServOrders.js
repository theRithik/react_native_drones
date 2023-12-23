import AsyncStorage from '@react-native-async-storage/async-storage'
import { LinearGradient } from 'expo-linear-gradient'
import React,{useEffect, useState} from 'react'
import { View ,Text, StyleSheet, Dimensions,Image, ScrollView, TouchableOpacity,ActivityIndicator,Linking} from 'react-native'


const Surl ="https://dronesapp.azurewebsites.net/user/userServiceDetails"
const CARD_WIDTH = Dimensions.get('window').width*0.45
const ServiceOrders=({navigation})=>{
    const[service,setService]=useState('')
    const intit=async()=>{
        const id = await AsyncStorage.getItem('Id')
        fetch(Surl,{
            method:'POST',
                headers:{
                    'accept':'application/json',
                'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    "id":id
                })
             }).then((res)=>res.json())
             .then((data)=>{    
                if(data.data){
                    setService(data.data.reverse())
                   
                }
             })
    }
    useEffect(()=>{
intit()
    },[])

    const handleOrders=(data)=>{
        if(data){
            if(data.length>=1){
                return data.map((item)=>{
                    return(
                        <TouchableOpacity key={item.id} onPress={()=>{navigation.navigate('SorderDetails',{
                            itemId:item.id
                        })}}>
                        <LinearGradient  style={styles.cardLinearGd} start={{x:0,y:0}} end={{x:1,y:1}}
                       
                        colors={['#252A32','#0C0F14']}
                        >
                        <View >
                            <View style={{flexDirection:'row',alignItems:'center',width:'100%'}}>
                                <View  style={{margin:10,marginRight:10,justifyContent:'flex-start'}}>
                                <Image source={require('../../assets/option.png')} tintColor={'#999999'} style={{width:15,height:15}}/>
                                </View>
                                <View style={{maxWidth:'99%'}}>
                               <Text style={{color:'#fff',fontSize:16}}>{item.servicePerson}</Text>
                               </View>
                            </View>
                            <View style={{flexDirection:'row',gap:5,justifyContent:'flex-end',marginTop:5,alignItems:'center'}}>
                                <Image source={require('../../assets/time.png')} tintColor={'rgb(174 186 220)'} style={{width:15,height:15}}/>
                                <Text style={{color:'#fff',fontSize:8}}>{item.DateandTime}</Text>
                               </View>
<View style={{flexDirection:'row',margin:30,marginTop:15}}>
    <Text style={{color:'rgb(200 176 215)'}}>Service</Text>
    <View style={{maxWidth:'99%'}}>
        <Text style={{color:'#fff',fontSize:13}}> : {item.subCategory} </Text>
    </View>
</View>
                            </View>
                            </LinearGradient>
                            </TouchableOpacity>
                    )
                })
            }
            else{
                return(
                    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                          <LottieView source={require('../../assets/animations/Animation - 1702396048973.json')} style={{width:width*0.7}} autoPlay loop />
                    </View>
                )
            }
        }
        else{
            return(
                <View style={{flex:1,alignItems:'center',justifyContent:'space-around'}}>
                    <View style={{flex:1,alignContent:'center'}}>
        <ActivityIndicator size={'large'}/>
        </View>
                </View>
            )
        }

    }

    return(
        <>
        <View>
            <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{alignItems:'center',marginTop:20}}>
                <Text style={{color:'#fff',fontSize:25}}>
                    Orders
                </Text>
            </View>
            {handleOrders(service)}
            </ScrollView>
        </View>
        </>
    )
}

const styles=StyleSheet.create({
    cardLinearGd:{
      padding:15,
      borderRadius:25,
        height:CARD_WIDTH*0.7,
        width:CARD_WIDTH*2,
        marginRight:10,
        margin:20,
        overflow:'hidden',
    },
})
export default ServiceOrders
