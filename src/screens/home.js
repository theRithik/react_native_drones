import React,{useEffect,useState} from "react";
import { Text,View,StyleSheet,Button,Image,ScrollView, StatusBar, TextInput, Touchable, Pressable, Dimensions, ImageBackground, ActivityIndicator} from "react-native";
import { Buffer } from "buffer";
import HeaderComponent from "../components/headerComponent";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";



const url = 'https://dronesapp.azurewebsites.net/android/user'
const rurl = "https://dronesapp.azurewebsites.net/android/serviceDetails"

const CARD_WIDTH = Dimensions.get('window').width*0.45
const Home=({navigation})=>{
    const [detail,setDetail]=useState('')
    const [category,setCategory]=useState('')
    const [name,setName]=useState('')
    useEffect(()=>{
        const getting =async()=>{
            const dt = await AsyncStorage.getItem('name')
            setName(dt)
        }


fetch(url,{
    
    method:'GET'
}).then((res)=>res.json())
.then((data)=>{
setDetail(data)
})

fetch(rurl,{
    method:'GET'
}).then((res)=>res.json())
.then((data)=>{
setCategory(data)
})
getting()
    },[])

    const hadleCourse=(data)=>{
        if(data){
            if(data.length>0){
                return data.map((item)=>{
                    const buffer = Buffer.from(item.display_image.data);
                    return(
                        <Pressable key={item.id} onPress={()=>{navigation.navigate('Academy',{
                            itemId:item
                        })}}>
                        <LinearGradient style={styles.cardLinearGd} start={{x:0,y:0}} end={{x:1,y:1}}
                       
                        colors={['#252A32','#0C0F14']}
                        
                        >
                        <View  style={styles.card}>
                        <View>
                        <ImageBackground  style={{
                            width:CARD_WIDTH,
                            height:CARD_WIDTH,
                            borderRadius:20,
                            marginBottom:15,
                            overflow:'hidden'

  }} resizeMode="cover" source={{ uri :`data:image/png;base64,${buffer}`}} >
     <View style={styles.CardRatingContainer}>
       <Image source={require('../../assets/star.png')} style={{width:15,height:15}}/>
          <Text style={styles.CardRatingText}>4.5</Text>
        </View>
  </ImageBackground>
  <View style={{overflow:'hidden',maxWidth:CARD_WIDTH}}>
                            <Text style={styles.cradText}>{item.institute_name}</Text>
                            <Text style={styles.cradText2}>{item.course}</Text>
                            <View style={{flexDirection:'row',marginTop:9}}>
                                <Image source={require('../../assets/location.png')} style={{width:15,height:15}} tintColor={'tomato'}/>
                            <Text style={{color:'#fff',fontSize:13}}>{item.state}</Text>
                    </View>
                           </View>
                              </View>
                        </View>
                        </LinearGradient>
                        </Pressable>
                    )
                })
            }
        }
    }
 
    const hadleService=(data)=>{
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
                        <View>
                        <ImageBackground  style={{
                            width:CARD_WIDTH,
                            height:CARD_WIDTH,
                            borderRadius:20,
                            marginBottom:15,
                            overflow:'hidden'

  }} resizeMode="cover" source={{ uri :`data:image/png;base64,${buffer}`}} >
     <View style={styles.CardRatingContainer}>
       <Image source={require('../../assets/star.png')} style={{width:15,height:15}}/>
          <Text style={styles.CardRatingText}>4.5</Text>
        </View>
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
        }
        else{
            return(
                <View style={{flex:1,justifyContent:'center'}}>
                <ActivityIndicator size="large" color="#0000ff" />
          </View>
            )
        }
    }

    return(
        <>
    
        <View style={styles.pageColor}>
            <StatusBar style={{backgroundColor:'black'}}/>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollView}>
                <HeaderComponent data={navigation}/>
               
                <View style={{position:'relative',marginTop:20}}>
                <TextInput placeholder="Search..." style={styles.serachBox}/>
                <Image source={require('../../assets/search.png')} tintColor={'grey'} style={styles.searchIcon}/>
            </View>
            {/* <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryScroll}>
  <Pressable onPress={handleClick} style={({pressed})=>pressed?styles.fillTp:styles.tochfill}><Text style={{color:'#fff',padding:30}}>Hello</Text></Pressable>
      </ScrollView> */}

      <Text style={{color:'#fff',fontSize:23,margin:20}} >Courses</Text>
           <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.courseScroll}>
      
           {hadleCourse(detail)}

           </ScrollView>

<Image source={require('../../assets/Happy.png')} style={{width:'90%',height:100,margin:20,marginTop:50}}/>
           <Text style={{color:'#fff',fontSize:23,margin:20}} >Services</Text>
           <View style={{marginTop:20}}>
           <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.courseScroll}>
           {hadleService(category)}
      </ScrollView>
           </View>

       </ScrollView>
       </View>
 
        </>
    )
}
export default Home

const styles = StyleSheet.create({
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
backgroundColor:'#fff',
padding:13,
margin:20,
borderRadius:20,
paddingLeft:30,
color:'grey',
fontSize:16
    },
    searchIcon:{
width:20,
height:20,
position:'absolute',
right:40,
top:40
    },
  courseScroll:{
paddingHorizontal:15,

  },
    cardView:{
// backgroundColor:'#fff',
flexDirection:'row',
width:'100%',
overflow:'visible',
marginTop:20
    },
    cardLinearGd:{
      padding:15,
      borderRadius:25,
        height:CARD_WIDTH*2,
        marginRight:10
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
        fontSize:17,
    },
    cradText2:{
        marginTop:8,
        color:'grey',
        fontSize:14
    },
    categoryScroll:{

    }
})