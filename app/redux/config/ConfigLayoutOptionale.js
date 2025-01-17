//optionalLayoutConfig.js
//javascript

const optionalLayoutConfig = {
  tipoApp1: {
    small: {
        
        leftColumnStyles: { 
          tipo:'small',
          width: '30%', 
          background: 'yellow', 
          borderTopColor: '#ddd', borderTopWidth: 1, 
          borderBottomColor: 'black', borderBottomWidth: 2, 
          borderLeftColor: '#ddd', borderLeftWidth: 1, 
          borderRightColor: 'gray', borderRightWidth: 4,
          borderTopRightRadius:20,
          borderBottomRightRadius:20,
          margineSopraSotto:15,
        },

      rightColumnStyles:  { 
        tipo:'small',
       width: '30%',
       background: 'red', 
       borderTopColor: 'black', borderTopWidth: 0, 
       borderBottomColor: 'black', borderBottomWidth: 2, 
       borderLeftColor: 'gray', borderLeftWidth: 4, 
       borderRightColor: '#ddd', borderRightWidth: 0, 
       borderTopLeftRadius:20,
       borderBottomLeftRadius:20,
       margineSopraSotto:15,
           },
    },

    medium: {
   
        rightColumnStyles:  { 
          tipo:'medium',
             width: '20%',
            background: 'yellow', 
            borderTopColor: '#ddd', borderTopWidth: 0, 
            borderBottomColor: 'black', borderBottomWidth: 2, 
            borderLeftColor: 'gray', borderLeftWidth: 4, 
            borderRightColor: '#ddd', borderRightWidth: 1, 
            borderTopLeftRadius:15,
            borderBottomLeftRadius:15,
            margineSopraSotto:10,
        },


    },

   },
  tipoApp2: {
    // Configurazioni simili per tipoApp2
  },
};

export default optionalLayoutConfig;