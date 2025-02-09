//standardLayoutConfig.js
//javascript
//tipoApp1 =layout   definito layout nelle slice quindi una proprienta viene indicate layout.small.leftColumnStyles.width
const standardLayoutConfig = {
  tipoApp1: {
    small: {
        
        leftColumnStyles: { 
          tipo:'small',
          width:'0%',
          background: '#f2f2f2', 
          borderTopColor: '#ddd', borderTopWidth: 1, 
         borderBottomColor: '#ddd', borderBottomWidth: 1, 
          borderLeftColor: '#ddd', borderLeftWidth: 1, 
          borderRightColor: '#ddd', borderRightWidth: 1,
        },
      centralColumnStyles: {
        tipo:'small',  
            width:'100%', 
            background: 'rgba(173, 216, 230, 0.4)', 
            borderTopColor: '#ccc', borderTopWidth: 1, 
            borderBottomColor: '#ccc', borderBottomWidth: 1, 
            borderLeftColor: '#ccc', borderLeftWidth: 1, 
            borderRightColor: '#ccc', borderRightWidth: 1,     
      },

      rightColumnStyles:  { 
        tipo:'small',
            width:'0%',
            background: '#f2f2f2', 
            borderTopColor: '#ddd', borderTopWidth: 1, 
            borderBottomColor: '#ddd', borderBottomWidth: 1, 
            borderLeftColor: '#ddd', borderLeftWidth: 1, 
            borderRightColor: '#ddd', borderRightWidth: 1, 
        },
    },
    medium: {
      
      leftColumnStyles: { 
        tipo:'medium',
            width:'20%',   
            background: 'rgba(0, 102, 197, 1)', 
            borderTopColor: '#ccc', borderTopWidth: 1, 
            borderBottomColor: '#ccc', borderBottomWidth: 1, 
            borderLeftColor: '#ccc', borderLeftWidth: 1, 
            borderRightColor: '#ccc', borderRightWidth: 1, 
            borderTopRightRadius:0,
            borderBottomRightRadius:0,
            margineSopraSotto:0,
        }, 
       centralColumnStyles: { 
        tipo:'medium',
            width:'80%',
            background: 'rgba(173, 216, 230, 0.4)', 
            borderTopColor: '#ddd', borderTopWidth: 0,
            borderBottomColor: '#ddd', borderBottomWidth: 0,
            borderLeftColor: 'blue', borderLeftWidth: 5, 
            borderRightColor: 'blue', borderRightWidth: 5, 
        }, 
        rightColumnStyles:  { 
          tipo:'medium',
            width:'0%',
            background: 'grey', // Imposta un background grigio per la colonna destra 
            borderTopColor: '#ddd', borderTopWidth: 1, 
            borderBottomColor: '#ddd', borderBottomWidth: 1, 
            borderLeftColor: '#ddd', borderLeftWidth: 1, 
            borderRightColor: '#ddd', borderRightWidth: 1, 
            borderTopLeftRadius:0,
            borderBottomLeftRadius:0,
            margineSopraSotto:0,
        },


    },
    large: { 
        
        leftColumnStyles: { 
          tipo:'large',
            width:'15%',
            background: 'orange', 
            borderTopColor: '#bbb', borderTopWidth: 1, 
            borderBottomColor: '#bbb', borderBottomWidth: 1, 
            borderLeftColor: '#bbb', borderLeftWidth: 1, 
            borderRightColor: '#bbb', borderRightWidth: 1, 
            borderTopRightRadius:0,
            borderBottomRightRadius:0,
            margineSopraSotto:0,
        }, 
        centralColumnStyles: { 
          tipo:'large',
            width:'65%',
            background: 'rgba(173, 216, 230, 0.4)', 
            borderTopColor: '#aaa', borderTopWidth: 2, 
            borderBottomColor: '#aaa', borderBottomWidth: 1, 
            borderLeftColor: 'white', borderLeftWidth:10, 
            borderRightColor: 'white', borderRightWidth: 10, 
        }, 
        rightColumnStyles: { 
          tipo:'large',
            width:'20%',
            background: 'yellow', 
            borderTopColor: 'red', borderTopWidth: 0, 
            borderBottomColor: 'red', borderBottomWidth: 0, 
            borderLeftColor: 'blue', borderLeftWidth: 0, 
            borderRightColor: 'white', borderRightWidth: 0, 
            borderTopLeftRadius:0,
            borderBottomLeftRadius:0,
            margineSopraSotto:0,
           
        }, 
    }
  },
  tipoApp2: {
    // Configurazioni simili per tipoApp2
  },
};

export default standardLayoutConfig;