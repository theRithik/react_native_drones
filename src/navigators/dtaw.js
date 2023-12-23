import { Text, TouchableOpacity, View ,Image} from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native'


const home= home
const DrawerItem = ({ label, onPress,
  activeItemColor, color,url,display }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      accessibilityRole="button"
      style={[styles.drawerItem, { backgroundColor: activeItemColor,display:display}]}
    >
      <View style={styles.row}>
      <Image source ={url} tintColor={'#333'} style={{width:20,height:20}}/>
        <Text style={[styles.label, { color }]}>{label}</Text>
      </View>
    </TouchableOpacity>
  )
}

const DrawerItemList = ({ state, descriptors, navigation, styles }) => {
  return (
    <View style={styles.view}>

      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const  options  = descriptors[route.key];
        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          })
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        }
       console.log(options.options.item.component,'state')
        const drawerItem = options.options.item;
        const color = isFocused ? '#333' : '#999999';
        const activeItemColor = isFocused ? '#637aff' : null;
        return (
          <DrawerItem key={index} label={drawerItem.label}
            onPress={onPress}
            name={drawerItem.icon}
            type={drawerItem.type}
            color={color}
            url={drawerItem.url}
            activeItemColor={activeItemColor}
            styles={styles}
            display={drawerItem.display}
          />
        )
      })}
    </View>
  )
}


const styles=StyleSheet.create({
    row:{
padding:10,
flexDirection:'row',
gap:30,
marginLeft:20
    },
    drawerItem:{
      marginHorizontal:20,
      padding:10,
      borderRadius:20
    },
    
})


export default DrawerItemList