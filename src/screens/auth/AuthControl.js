import React,{createContext,useEffect,useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
export const AuthContext = createContext();

export function AuthProvider ({children}){
const[isLoading,setIsLoading]=useState(false)
const[userToken,setUserToken]=useState(null)
const[login,setLogin]=useState(false)

const logout=(token)=>{
    setIsLoading(true)
    setUserToken(token)
AsyncStorage.removeItem('userToken')
AsyncStorage.removeItem('name')
setIsLoading(false)

}

const isLoggedIn=async()=>{
    try {
        setIsLoading(true)
        let userToken = await AsyncStorage.getItem('userToken')
   setUserToken(userToken);
   setIsLoading(false)
   console.log('run')
    } catch (error) {
        console.log(`isLoggedIn error ${error}`)
    }
   
}
const loginRender=(email,password)=>{
    if(email!=='' && password!==''){
    setLogin(true)
          fetch('https://dronesapp.azurewebsites.net/android/userLogin',{
              method:'POST',
              headers:{
                  'accept':'application/json',
              'Content-Type':'application/json'
              },
              body:JSON.stringify({
                  "email":email,
                  "password":password
              })
          }).then((res)=>res.json())
          .then((data)=>{
              if(data.auth===true){
                  AsyncStorage.setItem('userToken',data.token)
                  AsyncStorage.setItem('name',data.data[0].name)  
                  AsyncStorage.setItem('Id',data.data[0].uniqID) 
                  setLogin(false)
                  setUserToken(data.token)
              }
              else{
                Toast.show({
                  type: 'tomatoToast',
                  text1: 'Hello user!',
                  text2: data.token,
                });
                setLogin(false)
              }
          }).catch((err)=>{
            console.log(err)
            setLogin(false)
            Toast.show({
              type: 'tomatoToast',
              text1: 'Hello user!',
              text2: 'An error occured please try again',
            });
          })
        }
        else{
            Toast.show({
                type: 'tomatoToast',
                text1: 'Hello user!',
                text2: 'Please fill all the fields',
              });
        }
      }

useEffect(()=>{
isLoggedIn()
},[])
    return(
        <AuthContext.Provider value={{isLoading,userToken,login,loginRender,logout}}>
          {children}
        </AuthContext.Provider>
    )
}