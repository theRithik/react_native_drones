// import React,{useState,useEffect} from "react";
// import { Text,View,StyleSheet,Button,Image,ScrollView, StatusBar, TextInput, Touchable, Pressable, Dimensions, ImageBackground} from "react-native";
// import { Buffer } from "buffer";
// import { LinearGradient } from "expo-linear-gradient";

// const CARD_WIDTH = Dimensions.get('window').width*0.45
// const url = "https://dronesapp.azurewebsites.net/user/serviceDetails"


// const ServiceComponent=()=>{
//     const [detail,setDetail]=useState('')
//     useEffect(()=>{
//         fetch(url,{
//             method:'GET'
//         }).then((res)=>res.json())
//         .then((data)=>{
//         setDetail(data)
//         })
//     },[])

//     const hadleCourse=(data)=>{
//         if(data){
//             if(data.length>0){
//                 return data.map((item)=>{
//                     const buffer = Buffer.from(item.serviceImage.data);
//                     let name= item.firstName+'' +item.middleName+ ''+item.lastName
                  
//                     return(
//                         <Pressable key={item.id} onPress={()=>{('Service',{
//                             itemId:item.serviceID
//                         })}}>
//                         <LinearGradient  style={styles.cardLinearGd} start={{x:0,y:0}} end={{x:1,y:1}}
                       
//                         colors={['#252A32','#0C0F14']}
//                         >
//                         <View  style={styles.card}>
//                         <View>
//                         <ImageBackground  style={{
//                             width:CARD_WIDTH,
//                             height:CARD_WIDTH,
//                             borderRadius:20,
//                             marginBottom:15,
//                             overflow:'hidden'

//   }} resizeMode="cover" source={{ uri :`data:image/png;base64,${buffer}`}} >
//      <View style={styles.CardRatingContainer}>
//        <Image source={require('../../assets/star.png')} style={{width:15,height:15}}/>
//           <Text style={styles.CardRatingText}>4.5</Text>
//         </View>
//   </ImageBackground>
//   <View style={{overflow:'hidden',maxWidth:CARD_WIDTH}}>
//                             <Text style={styles.cradText}>{item.firstName} {item.middleName} {item.lastName}</Text>
//                             <Text style={styles.cradText2}>{item.companyName}</Text>
//                             <View style={{flexDirection:'row',marginTop:9}}>
//                                 <Image source={require('../../assets/location.png')} style={{width:15,height:15}} tintColor={'tomato'}/>
//                             <Text style={{color:'#fff',fontSize:13}}>{item.currentLocation}</Text>
//                     </View>
//                            </View>
//                               </View>
//                         </View>
//                         </LinearGradient>
//                         </Pressable>
//                     )
//                 })
//             }
//         }
//     }
//     return(
//         <>
// {hadleCourse(detail)}
//         </>
//     )
// }

// const styles = StyleSheet.create({
//     cardView:{
//         // backgroundColor:'#fff',
//         flexDirection:'row',
//         width:'100%',
//         overflow:'visible',
//         marginTop:20
//             },
//             cardLinearGd:{
//               padding:15,
//               borderRadius:25,
//                 height:CARD_WIDTH*2,
//                 marginRight:10
//             },
//             CardRatingContainer: {
//                 flexDirection: 'row',
//                 backgroundColor: 'rgba(12,15,20,0.5)',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 gap: 10,
//                 paddingHorizontal: 15,
//                 position: 'absolute',
//                 borderBottomLeftRadius: 20,
//                 borderTopRightRadius: 20,
//                 top: 0,
//                 right: 0,
//               },
//               CardRatingText: {
//                 color:'#FFFFFF',
//                 lineHeight: 22,
//                 fontSize: 14,
//               },
//             cradText:{
//                 color:'#fff',
//                 fontSize:17,
//             },
//             cradText2:{
//                 marginTop:8,
//                 color:'grey',
//                 fontSize:14
//             },
// })
// export default ServiceComponent