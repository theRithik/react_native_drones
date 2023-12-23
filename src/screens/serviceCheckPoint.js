import React,{useEffect,useState} from "react";
import HeaderComponent from "../components/headerComponent";
import {StyleSheet,
    Text,
    View,
    ImageProps,
    Image,
    TouchableOpacity,StatusBar,ScrollView, TextInput, Linking, Modal,ActivityIndicator} from "react-native";
    import { Buffer } from "buffer";
    import { LinearGradient } from "expo-linear-gradient";
import Maps from "../components/maps";
import { DatePickerModal } from "react-native-paper-dates";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Button } from "react-native-paper";
import { en, registerTranslation } from 'react-native-paper-dates'
registerTranslation('en', en)

import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

const sperson = "https://dronesapp.azurewebsites.net/android/servicePerson"
const url="https://dronesapp.azurewebsites.net/android/checkDates"
const num = "https://dronesapp.azurewebsites.net/android/PhoneAdd"
const udetail = "https://dronesapp.azurewebsites.net/android/basicDetail"
const post = "https://dronesapp.azurewebsites.net/phonepe/adpay"
const order = "https://dronesapp.azurewebsites.net/user/serviceOrder"

const ScheckPoint=({route,navigation})=>{
    const{itemId,total,number,service,book,gst,subtotal}=route.params
const [person,setPerson]=useState('')
const [sst,Setsst]=useState('')
const [sed,setSed]=useState('')
const [avaliable,setAvaliable]=useState('')
const [useLat,setUserLat]=useState('')
const [useLng,setUserLng]=useState('')
const [dist,setDist]=useState('')
const [disPrice,setDisPrice]=useState('')
const [tmount,setTmount]=useState('')
const [userName,setUserName]=useState('')
const[name,setName]=useState('')
const [email,setEmail]=useState('')
const [phone,setPhone]=useState('')
const [id,setId]=useState('')
const [modal,setModal]=useState('')
const [loading,setLoading]=useState('')
const [pyId,setPyId]=useState('')
const[servName,setServName]=useState('')
const [bookingDate,setBookingDates]=useState('')
const [address,setAddress]=useState('')
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
            const n1 = result[0].firstName
            const n2 = result[0].middleName
            const n3 = result[0].lastName
            const fullname = n1+' '+n2+' '+ n3
            setServName(fullname)
            const dt = result[0].availableDates.split('~')
            const mt = dt[0]
            const gt = dt[1]
            console.log(mt,gt)
            Setsst(mt)
            setSed(gt)
        })
       warn()
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

    const warn=async()=>{
const name = await AsyncStorage.getItem('name')
const id = await AsyncStorage.getItem('Id')
setId(id)
setUserName(name)
    }


    const handleRender=(data)=>{
      if(data){
        return data.map((item)=>{
            const buffer = Buffer.from(item.serviceImage.data);
            return(
                <View key={item.id}>
                <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
                colors={['#252A32', '#0C0F14']}
                style={styles.CartItemLinearGradient}>
                <View style={styles.CartItemRow}>
                  <Image source={{ uri :`data:image/png;base64,${buffer}`}}  style={styles.CartItemImage} />
                  <View style={styles.CartItemInfo}>
                    <View>
                      <Text style={styles.CartItemTitle}>{item.firstName} {item.middleName} {item.lastName}</Text>
                      <Text style={styles.CartItemSubtitle}>
                      {item.companyName}
                      </Text>
                    </View>
                    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                    <View style={styles.CartItemRoastedContainer}>
                      <Text style={styles.CartItemRoastedText}>{item.service}</Text>
                    </View>
                    </View>
                  </View>
                </View>
<View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
    <Text style={{color:'#fff'}}>Your Selections</Text>
</View>
                <View style={{flexDirection:'row',gap:30,flex:1}}>
                <View>
                    <Text style={{color:'#AEAEAE',fontSize:13}}>Service Type you Selected</Text>
                    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                    <Text style={{color:'#fff',fontSize:15,}}>{service.label}</Text>
                    </View>
                </View>
                <View>
                    <Text style={{color:'#AEAEAE',fontSize:13}}>Number of Days</Text>
                    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                    <Text style={{color:'#fff',fontSize:15}}>{number} Days</Text>
                    </View>
                </View>
                </View>
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                  {DatePick()}

                </View>
                </LinearGradient>
                </View>
            )
        })
      } 
      else{
        return(
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <ActivityIndicator size="large" color="#0000ff" />
      </View>
        )
      }
    }

    const [range, setRange] = React.useState({ startDate: undefined, endDate: undefined });
    const [open, setOpen] = React.useState(false);
  
     const onDismiss = React.useCallback(() => {
      setOpen(false);
    }, [setOpen]);

const onConfirm = ({ startDate, endDate }) => {
        setOpen(false);
        setRange({ startDate, endDate });
      const start = startDate
      const end = endDate
      console.log(sst,sed)
   
      fetch(url,{
        method:'POST',
        headers:{
          'accept':'application/json',
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          sstart:sst,
          send:sed,
          ustart:start,
          uend:end?end:'undefined'
        })
      }).then((res)=>res.json())
      .then((data)=>{
        if(data.auth===true){
          Toast.show({
            type: 'tomatoToast',
            text1: `Hello ${userName}!`,
            text2: 'Service provider is avaliable on those days',
          });
          setBookingDates(data.dates)
          setAvaliable(true)
        }
        else{
          Toast.show({
            type: 'tomatoToast',
            text1: `Hello ${userName}!`,
            text2: 'Service provider is not avaliable on those days ❌',
          });
          setAvaliable(false)
        }
      })
      }

const DatePick=()=>{
  return(
    <SafeAreaProvider>
      <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}>
        <Button onPress={() => setOpen(true)} uppercase={false} mode="outlined" >
          Pick Dates
        </Button>
        <DatePickerModal
          mode="range"
          locale="en"
          visible={open}
          onDismiss={onDismiss}
          startDate={range.startDate}
          endDate={range.endDate}
          onConfirm={onConfirm}
          dateMode="dd-mm-yyyy"
        />
      </View>
    </SafeAreaProvider>
  )
}

const Distance=(data)=>{
  console.log(data)
setUserLat(data.ulat)
setUserLng(data.ulng)
setDist(data.tdist)
setDisPrice(data.distPrice)
const val = Number(data.distPrice)
const mt = Number(total)
const mout = mt+val
setTmount(mout)
console.log(mout,val,mt)
}

// const payment=()=>{
//   console.log('running payment')
// // const url = 'https://dronesapp.azurewebsites.net/android/newPayment';
// // const options = {
// //   method: 'POST',
// //   headers: {accept: 'application/json', 'Content-Type': 'application/json'},
// //   body:JSON.stringify({
// //     merchantTransactionId:'MT678789807',
// //     amount:'500',
// //     muid:'56586767665',
// //     number:'8877669998',
// //     name:'rithik'
// // })
// // }
// // fetch(phonep,{
// //   method:'POST',
// //   headers: {
// //       accept: 'application/json', 
// //       'Content-Type': 'application/json'
// //   },
// //   body:JSON.stringify({
// //       merchantTransactionId:'MT'+Math.floor(Date.now()*Math.random()),
// //       amount:'500',
// //       muid:'199594039596',
// //       number:'9922334455',
// //       name:'rithik'
// //   })
// // })
// // .then(res =>res.json())
// // .then((data) =>{
//     let merchantName = "DummyMerchant"
// let imageURL = "https://image.dummymerchant.com"
// //Any metadata to show on PhonePe's payment screen
// let metadata = [{
//     "Movie": "Avengers"
// }, {"Seats": "3E, 4E, 5E"}]
  
//     const context=data.data
//     sdk.openPaymentsPage(merchantName,context, null, imageURL, metadata).then((response) => {
//       console.log("Payment was successful = " + response)
//     }).catch((err) => {
//       console.log("Payment failed with error = " + err)
//     })
  
//   .catch(err => console.error('error:' + err));
// }

const payment=()=>{
  if(phone!==''){
     const tId= 'MT'+Math.floor(Date.now()*Math.random())
     setPyId(tId)
    fetch(post,{
      method:'POST',
      headers:{
        "accept":"application/json",
        "Content-Type":"application/json"
    },
    body:JSON.stringify({
      mTransId:tId,
      id:id,
      amount:tmount,
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
console.log(result[0].payId)
{submitOrder(service)}
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
  
  const submitOrder=(data)=>{

    fetch(order,{
      method:'POST',
      headers:{
        "accept":"application/json",
        "Content-Type":"application/json"
    },
    body:JSON.stringify({
              paymentId:pyId,
              adminID:data[0].adminID,
              serviceID:data[0].serviceID,
              company:data[0].companyName,
              serviceperson:servName,
              servicePhone:data[0].phone,
              category:data[0].service,
              subcat:service.label,
              price:tmount,
              userId:id,
              name:name,
              email:email,
              type:'service',
              phone:phone,
              booking:book,
              latitude:useLat,
              longitude:useLng,
              Address:address,
              dates:bookingDate,
              subtotal:subtotal,
              travelCharges:disPrice,
              gst:gst,
              distance :dist
    })
    }).then((res)=>res.json())
    .then((data)=>{
      navigation.navigate('ServiceOrders')
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
        <>
         <View style={styles.ScreenContainer}>
                <StatusBar backgroundColor={'#0C0F14'}/>
                <ScrollView showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollViewFlex}>
                    <View>
{person && 
<HeaderComponent data={navigation}/>
}
</View>
<View style={{margin:20}}>
   
{handleRender(person)}
    </View>
   
    {person && 

<View >
<View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
  <Text style={{color:'#fff',fontSize:18}}>Address</Text>
  <Text style={{color:'grey',fontSize:10}}>Please enter your address for conformation</Text>
</View>

<View style={{marginHorizontal:20}}>
  <TextInput onChangeText={(text)=>setAddress(text)} style={{backgroundColor:'#252A32',marginRight:5,padding:10,borderRadius:10,color:'rgb(191, 199, 213)'}}/>
</View>
  <View style={{margin:20}}>
    <Text style={{color:'grey',fontSize:10,margin:0}}>Pick your location on the map</Text>
<Maps msg1={person} handledist ={((data)=>Distance(data))}/>
</View>
</View>
}
<Modal visible={modal} animationType="slide" transparent={true}>
  <View style={{margin:20,marginTop:'50%',backgroundColor:'#050577e6',padding:20,borderRadius:20}}>
  <View style={{flexDirection:'row-reverse'}}>
               <TouchableOpacity onPress={()=>{setModal(false)}}>
<Image source={require('../../assets/close.png')} tintColor={'#999999'} style={{width:20,height:20}}/>
       </TouchableOpacity>
          </View>
    <View style={{alignItems:'center'}}>
<Text style={{color:'#fff',fontSize:20}}>Phone Number</Text>
<TextInput value={phone} onChangeText={(text)=>{setPhone(text)}} style={styles.inputBox}/>
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
                <View  style={styles.PriceFooter}>
          <View style={styles.PriceContainer}>
            <Text style={styles.PriceTitle}>Price</Text>
            <Text style={styles.PriceText}>
            ₹ <Text style={styles.Price}>{tmount?tmount:'xxx'}</Text>
            </Text>
                    {/* <Text style={{color:'#fff',fontSize:14,textDecorationLine:'line-through',textDecorationColor:'grey'}}>{discountP}</Text> */}
          </View>
          <TouchableOpacity
            style={styles.PayButton}
            onPress={payment}
           >
            <Text style={styles.ButtonText}>
  <Image source={require('../../assets/lock.png')} tintColor={'#fff'} style={{width:20,height:20,marginRight:10,backgroundColor:'#fff'}}/>
      Pay</Text>
         
          </TouchableOpacity>
        </View>
                </View>
        </>
    )
}


export default ScheckPoint

const styles = StyleSheet.create({
    ScreenContainer:{
        flex:1,
        backgroundColor:'black',
    },
    scrollViewFlex:{
        flexGrow:1,

    },
    CartItemLinearGradient: {
        flex: 1,
        gap: 12,
        padding: 12,
        borderRadius: 25,
      },
      CartItemRow: {
        flexDirection: 'row',
        gap: 20,
        flex: 1,
      },
      CartItemImage: {
        height: 130,
        width: 130,
        borderRadius: 20,
      },
      CartItemInfo: {
        flex: 1,
        paddingVertical: 4,
        justifyContent: 'space-between',
      },
      CartItemTitle: {
        // fontFamily: FONTFAMILY.poppins_medium,
        fontSize: 18,
        color: '#ffffff',
      },
      CartItemSubtitle: {
        // fontFamily: FONTFAMILY.poppins_regular,
        fontSize: 14,
        color: '#AEAEAE',
      },
      CartItemRoastedContainer: {
        height: 50,
        width: 50 * 2 + 20,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
     
      },
      CartItemRoastedText: {
        // fontFamily: FONTFAMILY.poppins_regular,
        fontSize: 12,
        color: '#ffffff',
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
        backgroundColor:'#0d6efd',
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
      inputBox:{
        backgroundColor:'rgb(41, 45, 62)',
        padding:25,
        borderRadius:20,
        paddingLeft:30,
        color:'#fff',
        fontSize:17,
        flex:1,
        marginBottom:5,
        width:'80%',
        margin:10,
        fontSize:18
            }
})