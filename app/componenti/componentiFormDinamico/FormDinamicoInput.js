import {Text, View,Platform ,TextInput} from 'react-native'
import React from 'react'

const FormDinamicoInput = ({item,itemIndex,etichetta,onFocus,formNumber,}) => {
   
  return (
    
    <View>
          {etichetta  && (
            <Text style={{fontFamily:'Roboto-Regular',
                    color:item.layout.labelColor ?item.layout.labelColor : 'blue',
                    fontSize: Platform.OS ==='web' ? 13 : 16 }}>
                {item.label} 
            </Text>
        )}
            <TextInput style={{fontFamily:'Roboto-Medium', padding:5,
                    fontSize: Platform.OS ==='web' ? 16 : 18,                
                    height:item.layout.height ?item.layout.height : 40, 
                    borderColor:item.layout.bordoColor ?item.layout.bordoColor : 'lightgray', 
                    borderWidth:item.layout.bordoWidth ?item.layout.bordoWidth : 1,
                    color:item.layout.inputColor ?item.layout.inputColor : 'black'}}
                    placeholder={!etichetta ? item.label : ''}
                    placeholderTextColor='gray'
                    onFocus={()=> onFocus(item.label,formNumber)}
            />
   </View>
  )
}

export default FormDinamicoInput

