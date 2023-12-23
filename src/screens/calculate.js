import React,{useEffect,useState} from "react";
import { Text,View,StyleSheet,Image,StatusBar,ScrollView,ActivityIndicator,ImageBackground,TouchableOpacity,TouchableWithoutFeedback,Pressable, Linking, TextInput, Button} from "react-native";
import { Buffer } from "buffer";


const Calculate=(props)=>{
  const[on,setOn]=useState('')
const color=()=>{
  if(on!==true){
    return setOn(true)
}
else{
    return setOn(false)
}
}
 
 const handleData=(data)=>{
  if(data){
    return data.map((item)=>{
      const buffer = Buffer.from(item.serviceImage.data);
      return(
      <ImageBackground key={item.id}  source={{ uri :`data:image/png;base64,${buffer}`}} style={styles.itemBackgroundImg} >
      <View style={styles.ImageBarheader}>
          <TouchableOpacity onPress={()=>{props.data2.goBack()}}  >
              <View style={{padding:10,justifyContent:'flex-start',backgroundColor:'black',borderRadius:10}}>
              <Image source={require('../../assets/back.png')} tintColor={'#52555A'} style={{width:15,height:15}} resizeMode="contain"/>
          </View>
          </TouchableOpacity>
          <TouchableWithoutFeedback onPress={color} style={{justifyContent:'flex-end'}} >
<View style={{padding:10,backgroundColor:'black',borderRadius:10}}>
             
                  <Image source={require('../../assets/favourite.png')} style={{width:15,height:15}} tintColor={on?'red':'#52555A'} resizeMode="contain"/>
</View>
          </TouchableWithoutFeedback>
      </View>
      <View style={styles.ImageInfoOuter}>
          <View style={styles.ImageInfoInner}>
              <View style={styles.InfoContainerRow}>
          <View style={styles.ItemPropertiesContainer1}>
              <Text style={styles.ItemTitleText}>{item.firstName} {item.middleName} {item.lastName}</Text>
              <Text style={styles.ItemSubtitle}>{item.companyName}</Text>
          </View>
          <View style={styles.ItemPropertiesContainer}>
              <View style={styles.ProperFirst}>
                  <Image source={require('../../assets/drone.png')} style={{width:40,height:40}}  tintColor={'tomato'} />
                  <Text style={[styles.PropertyTextFirst]}>Service</Text>
              </View>
              <View style={styles.ProperFirst}>
                  <Image source={require('../../assets/location.png')} style={{width:25,height:25}} tintColor={'tomato'}/>
                  <Text style={styles.PropertyTextLast}>{item.currentLocation}</Text>
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
                      <Text style={styles.RoastedText}>{item.service}</Text>
                  </View>
              </View>
          </View>
      </View>
  </ImageBackground>
    )
      })
  }
 }

return(
    <>
    {handleData(props.data)}
    </>
)
    }
export default React.memo(Calculate)

const styles = StyleSheet.create({
  scrollStyle:{
    flexGrow:1,
    
  },
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
        paddingTop:5
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

})