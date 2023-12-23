import React,{useEffect,useState} from "react";
import { Text,View,StyleSheet,Button,Image,ScrollView, StatusBar, TextInput, TouchableOpacity, Pressable, Dimensions, ImageBackground, ActivityIndicator, useWindowDimensions} from "react-native";
import { Buffer } from "buffer";
import HeaderComponent from "../components/headerComponent";
import { LinearGradient } from "expo-linear-gradient";
import LottieView from 'lottie-react-native'
const rurl = "https://dronesapp.azurewebsites.net/android/serviceDetails"

const CARD_WIDTH = Dimensions.get('window').width*0.45
const Services=({navigation})=>{
const [details,setDetails]=useState('')
const [val,setVal]=useState('')
const[img,setImg]=useState('')
const[ser,setSer]=useState('')
const{width}=useWindowDimensions()
    useEffect(()=>{

        fetch(rurl,{
            method:'GET'
        }).then((res)=>res.json())
        .then((data)=>{
        setDetails(data)
        setSer(data)
        })
    },[])
const handleServices=(data)=>{
    if(data){
        if(data.length>0){
            return data.map((item)=>{
                const buffer = Buffer.from(item.serviceImage.data);
                let name= item.firstName+'' +item.middleName+ ''+item.lastName
              
                return(
                    <Pressable key={item.id} onPress={()=>{navigation.navigate('service',{
                        itemId:item.serviceID
                    })}}>
                    <LinearGradient  style={styles.cardLinearGd} start={{x:0,y:0}} end={{x:1,y:1}}
                   
                    colors={['#252A32','#0C0F14']}
                    >
                    <View  style={styles.card}>
                    <View style={{flexDirection:'row',gap:30}}>
                    <ImageBackground  style={{
                        width:CARD_WIDTH*0.7,
                        height:CARD_WIDTH*0.6,
                        borderRadius:20,
                        marginBottom:15,
                        overflow:'hidden'

}} resizeMode="cover" source={{ uri :`data:image/png;base64,${buffer}`}} >
</ImageBackground>
<View style={{overflow:'hidden',maxWidth:CARD_WIDTH}}>
                        <Text style={styles.cradText}>{item.firstName} {item.middleName} {item.lastName}</Text>
                        <Text style={styles.cradText2}>{item.companyName}</Text>
                        <View style={{flexDirection:'row',marginTop:9}}>
                            <Image source={require('../../assets/location.png')} style={{width:15,height:15}} tintColor={'tomato'}/>
                        <Text style={{color:'#fff',fontSize:13}}>{item.currentLocation}</Text>
                </View>
                       </View>
                          </View>
                    </View>
                    </LinearGradient>
                    </Pressable>
                )
            })
        }
        else{
            return(
                <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                     <LottieView source={require('../../assets/animations/Animation - 1702396048973.json')} style={{width:width*0.7}} autoPlay loop />
        
                </View>
            )
        }
    } else{
        return(
            <View style={{flex:1,justifyContent:'center'}}>
            <ActivityIndicator size="large" color="#0000ff" />
      </View>
        )
    }
}

const searchEnable=()=>{
   
    const data3 = ser
  
     const data=   data3.filter((item)=>{
            return (item.companyName.toLowerCase().indexOf(val.toLowerCase())>-1) || (item.currentLocation.toLowerCase().indexOf(val.toLocaleLowerCase())>-1) 
        })
       setDetails(data)
    }


const keyup=()=>{
setImg(true)
}
const search=()=>{
    return(
        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',marginHorizontal:40,marginVertical:30}}>
        <TextInput placeholder="Search..." style={styles.serachBox}  value={val} onChangeText={setVal} onPressIn={keyup}  onEndEditing={searchEnable}/>
    {img===true &&
      <TouchableOpacity onPress={searchEnable} style={{backgroundColor:'#637aff',padding:15,borderRadius:15,marginLeft:20}}>
        <Image source={require('../../assets/search.png')} tintColor={'#333'} resizeMode="stretch" style={{width:20,
height:20,}} />
  </TouchableOpacity>
}
    </View>
    )
}
return(
    <>
     <View style={styles.pageColor}>
            <StatusBar style={{backgroundColor:'black'}}/>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollView}>
                <HeaderComponent data={navigation}/>
               {search()}
            <Text style={{color:'#fff',fontSize:23,margin:20}} >Services</Text>
            <View>
                   {handleServices(details)}
                   </View>
            </ScrollView>
            </View>
    </>
)

}
export default Services

const styles=StyleSheet.create({
    filtText:{
        color:'#fff',
        padding:20
    },
    pageColor:{
        flex:1,
        backgroundColor:'black',
    },
    scrollView:{
        flexGrow:1,
    },
    ScreenTitle:{
        fontSize:20,
        // fontFamily:'Poppins_Black',
        color:'#fff',
        paddingLeft:25,
    },
    serachBox:{
backgroundColor:'rgb(41, 45, 62)',
padding:10,
borderRadius:20,
paddingLeft:30,
color:'rgb(191, 199, 213)',
fontSize:17,
flex:1
    },
  courseScroll:{
paddingHorizontal:15,

  },
    cardView:{
// backgroundColor:'#fff',
flexDirection:'row',
width:'auto',
overflow:'visible',
marginTop:20
    },
    cardLinearGd:{
      padding:15,
      borderRadius:25,
        height:CARD_WIDTH*0.8,
        width:CARD_WIDTH*2,
        marginRight:10,
        margin:20,
        overflow:'hidden',
        alignItems:'center'
    },
    CardRatingContainer: {
        flexDirection: 'row',
        backgroundColor: 'rgba(12,15,20,0.5)',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        paddingHorizontal: 15,
        position: 'absolute',
        borderBottomLeftRadius: 20,
        borderTopRightRadius: 20,
        top: 0,
        right: 0,
      },
      CardRatingText: {
        color:'#FFFFFF',
        lineHeight: 22,
        fontSize: 14,
      },
    cradText:{
        color:'#fff',
        fontSize:15,
    },
    cradText2:{
        marginTop:8,
        color:'grey',
        fontSize:12
    },
})