

export const getStileContenitoreColonnaSinistra = (leftColumnStyles, windowHeight, windowWidth,headerHeight, footerHeight) => {
    const isSmallWindow = windowWidth < 600;
    const additionalWidth = isSmallWindow ? 15 : 0;
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


export default { getStileContenitoreColonnaSinistra, getStileContenitoreColonnaDestra, getStileContenitoreColonnaCentrale }
/*
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


*/