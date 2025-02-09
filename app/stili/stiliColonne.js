import { Platform } from "react-native";


export const getStileContenitoreColonnaSinistra = (leftColumnStyles, windowHeight, windowWidth,headerHeight, footerHeight) => {
    const isSmallWindow = windowWidth < 600;
    const additionalWidth = isSmallWindow ? 15 : 0;



    //STILE s', leftColumnStyles, windowHeight,windowHeight - headerHeight - footerHeight - (leftColumnStyles.margineSopraSotto * 2))
    return {
     width: `${parseInt(leftColumnStyles.width) + additionalWidth}%`,
     backgroundColor: leftColumnStyles.background, 
     borderTopColor: leftColumnStyles.borderTopColor, 
     borderTopWidth: leftColumnStyles.borderTopWidth, 
     borderBottomColor: leftColumnStyles.borderBottomColor, 
     borderBottomWidth: leftColumnStyles.borderBottomWidth, 
     borderLeftColor: leftColumnStyles.borderLeftColor, 
     borderLeftWidth: leftColumnStyles.borderLeftWidth, 
     borderRightColor: leftColumnStyles.borderRightColor, 
     borderRightWidth: leftColumnStyles.borderRightWidth,
     borderTopRightRadius: leftColumnStyles.borderTopRightRadius,
     borderBottomRightRadius: leftColumnStyles.borderBottomRightRadius,
     height: windowHeight - headerHeight - footerHeight - (leftColumnStyles.margineSopraSotto * 2), // Altezza disponibile 
     position: 'absolute', 
     top: headerHeight + leftColumnStyles.margineSopraSotto, 
     left: 0, 
     zIndex: 10
    }
   };

export const getStileContenitoreColonnaDestra = (rightColumnStyles, windowHeight, windowWidth,headerHeight, footerHeight) => {
    const isSmallWindow = windowWidth < 600;
    const additionalWidth = isSmallWindow ? 15 : 0;
    
    return {
     position: 'absolute',
     backgroundColor: rightColumnStyles.background,
     width: `${parseInt(rightColumnStyles.width) + additionalWidth}%`, 
     height: windowHeight - headerHeight - footerHeight - (rightColumnStyles.margineSopraSotto * 2),
     top: headerHeight + rightColumnStyles.margineSopraSotto,
     right: 0,
     borderTopColor: rightColumnStyles.borderTopColor, 
     borderTopWidth: rightColumnStyles.borderTopWidth, 
     borderBottomColor: rightColumnStyles.borderBottomColor, 
     borderBottomWidth: rightColumnStyles.borderBottomWidth, 
     borderLeftColor: rightColumnStyles.borderLeftColor, 
     borderLeftWidth: rightColumnStyles.borderLeftWidth, 
     borderRightColor: rightColumnStyles.borderRightColor, 
     borderRightWidth: rightColumnStyles.borderRightWidth, 
     borderTopLeftRadius: rightColumnStyles.borderTopLeftRadius,
     borderBottomLeftRadius: rightColumnStyles.borderBottomLeftRadius,
     zIndex: 9
    }
   };

   export const getStileContenitoreColonnaCentrale = (leftColumnStyles, centralColumnStyles,windowHeight,headerHeight, footerHeight) => {
   return {
    position:'absolute',  
              //flex:1,
              top: headerHeight, 
              left: leftColumnStyles.width, 
              width:centralColumnStyles.width, 
              height: windowHeight-footerHeight-headerHeight, 
              backgroundColor: centralColumnStyles.background, 
              borderTopColor: centralColumnStyles.borderTopColor, 
              borderTopWidth: centralColumnStyles.borderTopWidth, 
              borderBottomColor: centralColumnStyles.borderBottomColor, 
              borderBottomWidth: centralColumnStyles.borderBottomWidth, 
              borderLeftColor: centralColumnStyles.borderLeftColor, 
              borderLeftWidth: centralColumnStyles.borderLeftWidth, 
              borderRightColor: centralColumnStyles.borderRightColor, 
              borderRightWidth: centralColumnStyles.borderRightWidth,

   }
}
export const getStileContenitoreBottoniSubmit = (centralColumnWidth,leftColumnWidth,footerHeight) => {
    return {
        position:'absolute',  
        alignItems:'center',
        justifyContent:'center',
        height:footerHeight*0.7,
        left:leftColumnWidth ,
        width:centralColumnWidth,
        bottom:footerHeight+5,
        borderColor:'red',borderWidth:0,
        flexDirection:'row',
        gap:'10%',
    }

}
export const getStileBottoniSubmit = (tipo) => {
    return {
        borderRadius:10,
        backgroundColor:'blue',
        width:Platform.OS === 'web' ? '15%': '22%',
        height:'100%', alignItems:'center',
        justifyContent:'center',
        borderBottomColor:'orange',borderBottomWidth:2,
        borderRightColor:'orange',borderRightWidth:4,
    }

}

export const getStileTestoBottoniSubmit = (tipo) => {
  
    return {
        color: tipo === 1 ? 'lightgreen' : 'red',
        fontFamily:'Roboto-Medium',
        fontSize:16,
    }
}


export default { 
    getStileContenitoreColonnaSinistra, 
    getStileContenitoreColonnaDestra, 
    getStileContenitoreColonnaCentrale,
    getStileContenitoreBottoniSubmit,
    getStileBottoniSubmit,
    getStileTestoBottoniSubmit}
