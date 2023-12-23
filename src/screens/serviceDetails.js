import React,{memo, useEffect,useState} from "react";
import { Text,View,StyleSheet,Image,StatusBar,ScrollView,ActivityIndicator,ImageBackground,TouchableOpacity,TouchableWithoutFeedback,Pressable, Linking, TextInput, Button} from "react-native";
import { Buffer } from "buffer";
import DropDownPicker from "react-native-dropdown-picker";
import Calculate from "./calculate";

const sperson = "https://dronesapp.azurewebsites.net/android/servicePerson"
const sType = "https://dronesapp.azurewebsites.net/android/serviceTypes"
const Service=({route,navigation})=>{
  
    const[person,setPerson]=useState('')
    const[on,setOn]=useState('')
    const[stype,setStype]=useState('')
    const [type,setType]=useState('')
    const [pdiff,setPdiff]=useState('')
    const [open, setOpen] = useState(false);
    const[value,setValue]=useState(null)
    const [items, setItems] = useState([])
    const [ltime,setLtime]=useState('')
    const [seltST,setSelST] = useState('')
    const [typePr,setTypePr]=useState('')
    const [loading, setLoading] = useState(false);
    const [num,setNum]=useState('')
    const [total,setTotal]=useState('')
    const[service,setService]=useState('')
    const [gst,setGst]=useState('')
    const {itemId}=route.params
    const [subtotal,setSubtotal]=useState('')
useEffect(()=>{

      fetch(sperson,{
        method:'POST',
        headers:{
            'accept':'application/json',
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            "id":itemId
        })
       }).then((res)=>res.json())
       .then((result)=>{
        setPerson(result)
    })
    fetch(sType,{
        method:'POST',
        headers:{
            'accept':'application/json',
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            "id":itemId
        })
       }).then((res)=>res.json())
       .then((result)=>{
        const resType = Object.values(result[0])
            resType.splice(0,3)
            const arrType =[]
            const pricety= []
            for(let i=0;i<resType.length;i++){
                let obj={}
                if( /[a-zA-Z]/g.test(resType[i])){
                    obj['value']=i
                    obj['label']=resType[i]
                    arrType.push(obj)
                }
            }
            arrType.pop()
            setStype(result[0].priceType)
            setType(arrType)
            setItems(arrType)
            if(result[0].priceType==='Hour'|| result[0].priceType==='Day' ||result[0].priceType==='Task' ){
              setLtime('Number of')
            }
            if(result[0].priceType==='Arc' || result[0].priceType==='Hector' || result[0].priceType==='Km' || result[0].priceType==='SqKm'){
              setLtime('Land Size')
            }

            const resType3 = Object.values(result[0])
            resType3.splice(0,20)
            for(let i=0;i<resType3.length;i++){
              let pob={}
              if(/^[0-9]+$/.test(resType3[i])){
                pob['id']=i
                pob['priceType']=resType3[i]
                pricety.push(pob)
              }
            }
            setPdiff(pricety)
        })
},[])


const servicetypeRender=()=>{
  if(type){
    console.log('running 2')
    return type.map((item)=>{
      
      return(
        <View key={item.value} style={{backgroundColor:'#141921',padding:10,borderRadius:10}}>
            <Text style={{fontSize:15,color:'#AEAEAE'}}>{item.label}</Text>
        </View>
      )
    })
  }

}


const bannerImg=(data)=>{
    if(data){
        return data.map((item)=>{
          console.log('1')
       
            return(
           <View key={item.id}>
          
            <View>
    <Text style={{color:'grey',fontSize:20,margin:20,marginBottom:10}}>Serice Types:</Text>
    <ScrollView showsHorizontalScrollIndicator={true} scrollToOverflowEnabled={true} contentContainerStyle={{flexGrow:1}}>
    <View style={{gap:20,margin:20,overflow:"scroll",flexDirection:'row',flex:1}}>
    {servicetypeRender()}
</View>
</ScrollView>
{/*     
    <View style={{marginHorizontal:20}}>
        <Text style={{color:'#fff',fontSize:16,lineHeight:20,}}>{item.description}</Text>
    </View> */}
    <Text style={{color:'#fff',fontSize:16,margin:20}}>Select Service type you want</Text>
   {optionRender()}

   <View style={{justifyContent:'center',flex:1,alignItems:'center',marginVertical:20}}>
    <Text style={{color:'#fff',fontSize:18,}}>Price per/{stype?stype:'XXX'}</Text>
    <Text style={{color:'#fff',fontSize:18,}}>₹{typePr?typePr:'xxx'}</Text>
   </View>
   <View style={{flex:1,justifyContent:'center',alignItems:'center',marginVertical:10}}>
    <Text style={{color:'#fff',fontSize:18,justifyContent:'center',flex:1}}>{ltime}/{stype}</Text>
   </View>
        </View>

        {/* <View>
            <Text style={{color:'#fff'}}>Want to know more about this course</Text>
        <Pressable onPress={()=>{Linking.openURL(`https://www.dronesapp.in/academy/${name}/${ser}/${itemId}`)}}><Text style={{color:'tomato'}}>Click on this</Text></Pressable>
        </View> */}
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

    const optionRender=()=>{
      if(type){
        console.log('running 3')
          return(
            <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            theme="DARK"
            mode="BADGE"
            loading={loading}
            activityIndicatorColor="blue"
            searchable={true}
            closeAfterSelecting={true}
            listMode="MODAL"
            badgeDotColors={["#e76f51", "#00b4d8", "#e9c46a", "#e76f51", "#8ac926", "#00b4d8", "#e9c46a"]}
            closeOnBackPressed={true}
            onChangeValue={(value)=>{servicePrice(value)}}
            onSelectItem={(text)=>{setService(text)}}
          />
          )
        
      }
    }

    const servicePrice=(data)=>{
      console.log(data)
      const ptd=  data

      if(ptd!=='Open this select menu' && ptd!==''){
      if(pdiff){
            const mpd = pdiff.filter((item)=>{
              return Number(item.id) === Number(ptd)
            })
            setTypePr(mpd[0].priceType)


            if(type){
            const finalTp = type.filter((item)=>{
              return Number(item.value) === Number(ptd)
            })
            setSelST(finalTp[0].label)
          }
        }   
    }
  }

const caculate=(text)=>{
  console.log(text)
setNum(text)
    console.log('calculating')
  const price = Number(typePr)*Number(text)
  setSubtotal(price)
  const gst = price*18/100
  setGst(gst)
  const totalP = price+gst
  setTotal(totalP)
  console.log(totalP)
  
}
        return(
            
            <View style={styles.ScreenContainer}>
                <StatusBar backgroundColor={'#0C0F14'}/>
                <ScrollView showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollViewFlex}>
                  <Calculate data={person} data2={navigation}/>
     {bannerImg(person)}
    {person &&
     <View>
<TextInput placeholder="Ex: 2" onChangeText={(Text)=>{caculate(Text)}} style={{backgroundColor:'rgb(41, 45, 62)',padding:10,borderRadius:10,marginHorizontal:20,color:'rgb(191, 199, 213)'}}  keyboardType="numeric"/> 
   <View style={{flex:1,justifyContent:'center',alignItems:'center',marginVertical:20}}>
  
   </View>
   </View>
}
                </ScrollView>
              {person &&
                <View  style={styles.PriceFooter}>
          <View style={styles.PriceContainer}>
            <Text style={styles.PriceTitle}>Price</Text>
            <Text style={styles.PriceText}>
            ₹ <Text style={styles.Price}>{total}</Text>
            </Text>
                    {/* <Text style={{color:'#fff',fontSize:14,textDecorationLine:'line-through',textDecorationColor:'grey'}}>{discountP}</Text> */}
          </View>
          <TouchableOpacity
            style={styles.PayButton}
            onPress={()=>{if(total!==''&&total!==0){navigation.navigate('Scart',{
              itemId:itemId,
              total:total,
              number:num,
              service:service,
              price:typePr,
              book:num+' ' +stype,
              gst:gst,
              subtotal:subtotal
            })}}}
           >
            <Text style={styles.ButtonText}>Book</Text>
          </TouchableOpacity>
        </View>
}
            </View>  
        )
    }
export default Service

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