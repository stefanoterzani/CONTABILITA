export const schemaCliente = {
   codice: { label: 'Codice ', type: 'text', obbligatorio:true,visibile:true ,
    layout: { 
      web: { 
        visibile:true,
        margineDx: '5%' ,
        height:40, 
        width:'10%',
        bordoColor:'grey', 
        bordoWidth:1,
        labelColor:'',
        inputColor:'',     
        row: 1, 
        pagina:1,
        tipoElenco:'',
        campo:'',
        tipoInput:''
      },
      
      mobile: { 
        visibile:true,
        margineDx: '6%' ,
        height:40, 
        width:'30%',
        bordoColor:'', 
        bordoWidth:1,
        labelColor:'blue',
        inputColor:'',     
        row: 1, 
        pagina:1,
        tipoElenco:'',
        campo:'',
        tipoInput:''
      } 
    }
    },
    dataCreazione: { label: 'Creato', type: 'data', obbligatorio:true,visibile:true ,
      layout: { 
        web: { 
          visibile:true,
          margineDx: '2%' ,
          height:40, 
          width:'15%',
          bordoColor:'grey', 
          bordoWidth:1,
          labelColor:'',
          inputColor:'',     
          row: 1, 
          pagina:1,
          tipoElenco:'',
          campo:'',
          tipoInput:''
        },
        
        mobile: { 
          visibile:true,
          margineDx: '2%' ,
          height:40, 
          width:'30%',
          bordoColor:'', 
          bordoWidth:1,
          labelColor:'',
          inputColor:'',       
          row: 1, 
          pagina:1,
          tipoElenco:'',
          campo:'',
          tipoInput:''
        } 
      }
      },
  
      dataAggiornamento: { label: 'Aggiornato', type: 'data', obbligatorio:true,visibile:true ,
        layout: { 
          web: { 
            visibile:true,
            margineDx: '2%' ,
            height:40, 
            width:'15%',
            bordoColor:'grey', 
            bordoWidth:1,
            labelColor:'',
            inputColor:'',     
            row: 1, 
            pagina:1,
            tipoElenco:'',
            campo:'',
            tipoInput:''},
          
          mobile: { 
            visibile:true,
            margineDx: '1%' ,
            height:40, 
            width:'30%',
            bordoColor:'', 
            bordoWidth:1,
            labelColor:'blue',
            inputColor:'',   
            row: 1, 
            pagina:1,
            tipoElenco:'',
            campo:'',
            tipoInput:''
          } 
        }
        },
    nome: { label: 'Nome Cliente ', type: 'text', obbligatorio:true,visibile:true ,
      layout: { 
       web: { 
        visibile:true,
        margineDx: '2%' ,
        height:40, 
        width:'77%',
        bordoColor:'grey', 
        bordoWidth:1,
        labelColor:'',
        inputColor:'',     
        row: 2, 
        pagina:1,
        tipoElenco:'',
        campo:'',
        tipoInput:''},
      
      mobile: { 
        visibile:true,
        margineDx: '0' ,
        height:40, 
        width:'98%',
        bordoColor:'', 
        bordoWidth:1,
        labelColor:'blue',
        inputColor:'',     
        row: 3, 
        pagina:1,tipoElenco:'',
        campo:'',
        tipoInput:''
      } 
      
      }
      },
  


    partitaIva: { label: 'Partita IVA', type: 'text', obbligatorio:true, visibile:true ,
      layout: { 
        web: { 
          visibile:true,
          margineDx: '2%' ,
          height:40, 
          width:'20%',
          bordoColor:'grey', 
          bordoWidth:1,
          labelColor:'',
          inputColor:'',     
          row: 1, 
          pagina:1,
          tipoElenco:'',
          campo:'',
          tipoInput:''},
        
        mobile: { 
          visibile:true,
          margineDx: '5%' ,
          height:40, 
          width:'45%',
          bordoColor:'', 
          bordoWidth:1,
          labelColor:'blue',
          inputColor:'',     
          row: 2, 
          pagina:1,
          tipoElenco:'',
          campo:'',
          tipoInput:''
        } 
      
      } 
      },

      codicefiscale: { label: 'Codice Fiscale', type: 'text', obbligatorio:true, visibile:true ,
        layout: { 
          web: { 
            visibile:true,
            margineDx: '2%' ,
            height:40, 
            width:'28%',
            bordoColor:'grey', 
            bordoWidth:1,
            labelColor:'',
            inputColor:'',     
            row: 1, 
            pagina:1,
          tipoElenco:'',
        campo:'',
        tipoInput:''},
          
          mobile: { 
            visibile:true,
            margineDx: '' ,
            height:40, 
            width:'48%',
            bordoColor:'', 
            bordoWidth:1,
            labelColor:'blue',
            inputColor:'',     
            row: 2, 
            pagina:1,
            tipoElenco:'',
        campo:'',
        tipoInput:''
          } 
        
        } 
        },
     
        email: { 
          label: 'E-mail', 
          type: 'text' , 
          obbligatorio:false, 
          visibile:true ,
          layout: { 
            web: { 
              visibile:true,
              margineDx: '1%' ,
              height:40, 
              width:'49%',
              bordoColor:'grey', 
              bordoWidth:1,
              labelColor:'',
              inputColor:'',     
              row: 3, 
              pagina:1,
            tipoElenco:'',
        campo:'',
        tipoInput:''},
            
            mobile: { 
              visibile:true,
              margineDx: '1%' ,
              height:40, 
              width:'98%',
              bordoColor:'', 
              bordoWidth:1,
              labelColor:'blue',
              inputColor:'',     
              row: 4, 
              pagina:1,
              tipoElenco:'',
              campo:'',
              tipoInput:''
            } 
           } 
        },
  
      pec: { label: 'Pec', type: 'text', obbligatorio:false, visibile:true ,
        layout: { 
          web: { 
            visibile:true,
            margineDx: '2%' ,
            height:40, 
            width:'49%',
            bordoColor:'grey', 
            bordoWidth:1,
            labelColor:'',
            inputColor:'',     
            row: 3, 
            pagina:1,
            tipoElenco:'',
            campo:'',
            tipoInput:''},
          
          mobile: { 
            visibile:true,
            margineDx: '1%' ,
            height:40, 
            width:'98%',
            bordoColor:'', 
            bordoWidth:1,
            labelColor:'blue',
            inputColor:'',     
            row: 5, 
            pagina:1,
            tipoElenco:'',
            campo:'',
            tipoInput:''
          } 
        } 
        },

    
     /*************************************************** */
        comune: { 
        label: 'Comune', 
        type: 'dropdown' , 
        obbligatorio:false, 
        visibile:true ,
        campoElenco:'comuni',
        campoNome:'nome',
          layout: { 
            web: { 
              visibile:true,
              margineDx: '2%' ,
              height:40, 
              width:'30%',
              bordoColor:'grey', 
              bordoWidth:1,
              labelColor:'',
              inputColor:'',     
              row: 1, 
              pagina:2,
              tipoElenco:'',
              campo:'',
              tipoInput:''},
            
            mobile: { 
              visibile:true,
              margineDx: '1%' ,
              height:40, 
              width:'98%',
              bordoColor:'', 
              bordoWidth:1,
              labelColor:'blue',
              inputColor:'',     
              row: 1, 
              pagina:2,
              tipoElenco:'',
              campo:'',
              tipoInput:''
            } 
          } 
        },
        indirizzo: { label: 'Indirizzo', type: 'text' , obbligatorio:false, 
          layout: { 
            web: { 
              visibile:true,
              margineDx: '2%' ,
              height:40, 
              width:'50%',
              bordoColor:'grey', 
              bordoWidth:1,
              labelColor:'',
              inputColor:'',     
              row: 1, 
              pagina:2,
              tipoElenco:'',
              campo:'',
              tipoInput:''},
            
            mobile: { 
              visibile:true,
              margineDx: '1%' ,
              height:40, 
              width:'80%',
              bordoColor:'', 
              bordoWidth:1,
              labelColor:'blue',
              inputColor:'',     
              row: 2, 
              pagina:2,
              tipoElenco:'',
              campo:'',
              tipoInput:''
            } 
           } },
   
           civico: { label: 'Civico', type: 'text' , obbligatorio:false, 
            layout: { 
              web: { 
                visibile:true,
                margineDx: '2%' ,
                height:40, 
                width:'8%',
                bordoColor:'', 
                bordoWidth:2,
                labelColor:'blue',
                inputColor:'',     
                row: 1, 
                pagina:2,
                tipoElenco:'',
                campo:'',
                tipoInput:''},
              
              mobile: { 
                visibile:true,
                margineDx: '1%' ,
                height:40, 
                width:'18%',
                bordoColor:'', 
                bordoWidth:1,
                labelColor:'blue',
                inputColor:'',     
                row: 2, 
                pagina:2,
                tipoElenco:'',
                campo:'',
                tipoInput:''
              } 
             } },
             provincia: { label: 'Provincia', type: 'text'  , obbligatorio:false, 
              layout: { 
                web: { 
                  visibile:true,
                  margineDx: '5%' ,
                  height:40, 
                  width:'30%',
                  bordoColor:'grey', 
                  bordoWidth:1,
                  labelColor:'',
                  inputColor:'',     
                  row: 2, 
                  pagina:2,
                  tipoElenco:'',
                  campo:'',
                  tipoInput:''},
                
                mobile: { 
                  visibile:true,
                  margineDx: '1%' ,
                  height:40, 
                  width:'80%',
                  bordoColor:'', 
                  bordoWidth:1,
                  labelColor:'blue',
                  inputColor:'',     
                  row: 3, 
                  pagina:2,
                  tipoElenco:'',
                  campo:'',
                  tipoInput:''
                } 
              } },  
    
            cap: { label: 'CAP', type: 'text' , obbligatorio:false , 
              layout: { 
                web: { 
                  visibile:true,
                  margineDx: '5%' ,
                  height:40, 
                  width:'10%',
                  bordoColor:'grey', 
                  bordoWidth:1,
                  labelColor:'',
                  inputColor:'',     
                  row: 2, 
                  pagina:2,
                  tipoElenco:'',
                  campo:'',
                  tipoInput:''},
                
                mobile: { 
                  visibile:true,
                  margineDx: '1%' ,
                  height:40, 
                  width:'18%',
                  bordoColor:'', 
                  bordoWidth:1,
                  labelColor:'blue',
                  inputColor:'',     
                  row: 3, 
                  pagina:2,
                  tipoElenco:'',
                  campo:'',
                  tipoInput:''
                } 
              } },
    
            nazione: { label: 'Nazione', type: 'text' , obbligatorio:false, 
             layout: { 
              web: { 
                visibile:true,
                margineDx: '2%' ,
                height:40, 
                width:'40%',
                bordoColor:'grey', 
                bordoWidth:1,
                labelColor:'',
                inputColor:'',     
                row: 2, 
                pagina:2,
                tipoElenco:'',
                campo:'',
                tipoInput:''},
              
              mobile: { 
                visibile:true,
                margineDx: '1%' ,
                height:40, 
                width:'98%',
                bordoColor:'', 
                bordoWidth:1,
                labelColor:'blue',
                inputColor:'',     
                row: 4, 
                pagina:2,
                tipoElenco:'',
                campo:'',
                tipoInput:''
              } 
            } }, 

     riferimento: { label: 'Persona riferimento', type: 'text' , obbligatorio:false, visibile:true ,
      layout: { 
        web: { 
          visibile:true,
          margineDx: '2%' ,
          height:40, 
          width:'40%',
          bordoColor:'grey', 
          bordoWidth:1,
          labelColor:'',
          inputColor:'',     
          row: 3, 
          pagina:2,
          tipoElenco:'',
          campo:'',
          tipoInput:''},
        
        mobile: { 
          visibile:true,
          margineDx: '1%' ,
          height:40, 
          width:'65%',
          bordoColor:'', 
          bordoWidth:1,
          labelColor:'blue',
          inputColor:'',     
          row: 1, 
          pagina:3,
          tipoElenco:'',
          campo:'',
          tipoInput:''
        } 
       } 
        },
            
     telefono_1: { label: 'Telefono', type: 'text' , obbligatorio:false, visibile:true ,
        layout: { 
          web: { 
            visibile:true,
            margineDx: '2%' ,
            height:40, 
            width:'18%',
            bordoColor:'grey', 
            bordoWidth:1,
            labelColor:'',
            inputColor:'',     
            row: 3, 
            pagina:2,
            tipoElenco:'',
            campo:'',
            tipoInput:''},
          
          mobile: { 
            visibile:true,
            margineDx: '1%' ,
            height:40, 
            width:'32%',
            bordoColor:'', 
            bordoWidth:1,
            labelColor:'blue',
            inputColor:'',     
            row: 2, 
            pagina:3,
            tipoElenco:'',
            campo:'',
            tipoInput:''
          } 
         } 
      },
     telefono_2: { label: 'Telefono', type: 'text' , obbligatorio:false, visibile:true ,
        layout: { 
          web: { 
            visibile:true,
            margineDx: '2%' ,
            height:40, 
            width:'18%',
            bordoColor:'grey', 
            bordoWidth:1,
            labelColor:'',
            inputColor:'',     
            row: 3, 
            pagina:2,
            tipoElenco:'',
            campo:'',
            tipoInput:''},
          
          mobile: { 
            visibile:true,
            margineDx: '1%' ,
            height:40, 
            width:'32%',
            bordoColor:'', 
            bordoWidth:1,
            labelColor:'blue',
            inputColor:'',     
            row: 2, 
            pagina:3,
            tipoElenco:'',
            campo:'',
            tipoInput:''
          } 
        
        } 
        },
      fax: { label: 'Fax', type: 'text' , obbligatorio:false, visibile:true ,
        layout: { 
          web: { 
            visibile:true,
            margineDx: '5%' ,
            height:40, 
            width:'18%',
            bordoColor:'grey', 
            bordoWidth:1,
            labelColor:'',
            inputColor:'',     
            row: 3, 
            pagina:2,
            tipoElenco:'',
            campo:'',
            tipoInput:''},
          
          mobile: { 
            visibile:true,
            margineDx: '1%' ,
            height:40, 
            width:'32%',
            bordoColor:'', 
            bordoWidth:1,
            labelColor:'blue',
            inputColor:'',     
            row: 3, 
            pagina:3,
            tipoElenco:'',
            campo:'',
            tipoInput:''
          } 
        } 
        },
        codiceAteco: { label: 'ATECO', type: 'text' , obbligatorio:false, visibile:true ,
          layout: { 
            web: { 
              visibile:true,
              margineDx: '2%' ,
              height:40, 
              width:'20%',
              bordoColor:'gray', 
              bordoWidth:1,
              labelColor:'',
              inputColor:'green',     
              row: 2, 
              pagina:1,
              tipoElenco:'',
              campo:'',
              tipoInput:''},
            
            mobile: { 
              visibile:true,
              margineDx: '1%' ,
              height:40, 
              width:'20%',
              bordoColor:'', 
              bordoWidth:1,
              labelColor:'blue',
              inputColor:'',     
              row: 6, 
              pagina:2,
              tipoElenco:'',
              campo:'',
              tipoInput:''
            } 
          } 
            },
      aziendaId: { label: 'idAzienda', type: 'text', obbligatorio:false, visibile:false ,
        layout: { 
          web: { row: 99, margineDx: 0 , visibile: false, width:'30%',pagina:1}, 
          mobile: { row: 99, margineDx: 0 ,visibile: false, width:'45%',pagina:1} } 
        },
      areaGeograficaId: { label: 'idArea', type: 'text', obbligatorio:false, visibile:false ,
        layout: { 
          web: { row: 99, margineDx: 0 , visibile: false, width:'30%',pagina:1}, 
          mobile: { row: 99, margineDx: 0 ,visibile: false, width:'45%',pagina:1} } 
        },
      regioneId: { label: 'idRegione', type: 'text', obbligatorio:false, visibile:false ,
        layout: { 
          web: { row: 99, margineDx: 0 , visibile: false, width:'30%',pagina:1}, 
          mobile: { row: 99, margineDx: 0 ,visibile: false, width:'45%',pagina:1} } 
        },
      cittaId: { label: 'idCittò', type: 'text', obbligatorio:false, visibile:false ,
        layout: { 
          web: { row: 99, margineDx: 0 , visibile: false, width:'30%',pagina:1}, 
          mobile: { row: 99, margineDx: 0 ,visibile: false, width:'45%',pagina:1} } 
        },
      unitaOperativaId: { label: 'idUnità', type: 'text', obbligatorio:false, visibile:false ,
        layout: { 
          web: { row: 99, margineDx: 0 , visibile: false, width:'30%',pagina:1}, 
          mobile: { row: 99, margineDx: 0 ,visibile: false, width:'45%',pagina:1} } 
        },
        idCreatore: { label: 'idCreatore', type: 'text', obbligatorio:false, visibile:false ,
          layout: { 
            web: { row: 99, margineDx: 0 , visibile: false, width:'30%',pagina:1}, 
            mobile: { row: 99, margineDx: 0 ,visibile: false, width:'45%',pagina:1} } 
          },
        idCliente: { label: 'idCliente', type: 'text', obbligatorio:false, visibile:false ,
          layout: { 
            web: { row: 99, margineDx: 0 , visibile: false, width:'30%',pagina:1}, 
            mobile: { row: 99, margineDx: 0 ,visibile: false, width:'45%',pagina:1} } 
          },
        
        
            

    
  };


  export const schemaSedi={
  tpoSede: { label: 'Tipo Sede', type: 'text'  , obbligatorio:false, 
      layout: { 
        web: { 
          visibile:true,
          margineDx: '2%' ,
          height:40, 
          width:'10%',
          bordoColor:'blue', 
          bordoWidth:2,
          labelColor:'red',
          inputColor:'green',     
          row: 1, 
          pagina:1},
        
        mobile: { 
          visibile:true,
          margineDx: '1%' ,
          height:40, 
          width:'10%',
          bordoColor:'red', 
          bordoWidth:2,
          labelColor:'red',
          inputColor:'green',     
          row: 1, 
          pagina:1
        } 
      } },
    citta: { label: 'Città', type: 'text'  , obbligatorio:false, 
      layout: { 
        web: { 
          visibile:true,
          margineDx: '2%' ,
          height:40, 
          width:'10%',
          bordoColor:'blue', 
          bordoWidth:2,
          labelColor:'red',
          inputColor:'green',     
          row: 1, 
          pagina:1},
        
        mobile: { 
          visibile:true,
          margineDx: '1%' ,
          height:40, 
          width:'10%',
          bordoColor:'red', 
          bordoWidth:2,
          labelColor:'red',
          inputColor:'green',     
          row: 1, 
          pagina:1
        } 
      } },
    
      indirizzo: { label: 'Indirizzo', type: 'text' , obbligatorio:false, 
      layout: { 
      web: { 
          visibile:true,
          margineDx: '2%' ,
          height:40, 
          width:'10%',
          bordoColor:'blue', 
          bordoWidth:2,
          labelColor:'red',
          inputColor:'green',     
          row: 1, 
          pagina:1},
        
        mobile: { 
          visibile:true,
          margineDx: '1%' ,
          height:40, 
          width:'10%',
          bordoColor:'red', 
          bordoWidth:2,
          labelColor:'red',
          inputColor:'green',     
          row: 1, 
          pagina:1
        } 
       } },

       civico: { label: 'Civico', type: 'text' , obbligatorio:false, 
        layout: { 
         web: { 
          visibile:true,
          margineDx: '2%' ,
          height:40, 
          width:'10%',
          bordoColor:'blue', 
          bordoWidth:2,
          labelColor:'red',
          inputColor:'green',     
          row: 1, 
          pagina:1},
        
        mobile: { 
          visibile:true,
          margineDx: '1%' ,
          height:40, 
          width:'10%',
          bordoColor:'red', 
          bordoWidth:2,
          labelColor:'red',
          inputColor:'green',     
          row: 1, 
          pagina:1
        } 
         } },

       provincia: { label: 'Provincia', type: 'text'  , obbligatorio:false, 
        layout: { 
          web: { 
          visibile:true,
          margineDx: '2%' ,
          height:40, 
          width:'10%',
          bordoColor:'blue', 
          bordoWidth:2,
          labelColor:'red',
          inputColor:'green',     
          row: 1, 
          pagina:1},
        
        mobile: { 
          visibile:true,
          margineDx: '1%' ,
          height:40, 
          width:'10%',
          bordoColor:'red', 
          bordoWidth:2,
          labelColor:'red',
          inputColor:'green',     
          row: 1, 
          pagina:1
        } 
        } },  

      cap: { label: 'CAP', type: 'text' , obbligatorio:false , 
        layout: { 
        web: { 
          visibile:true,
          margineDx: '2%' ,
          height:40, 
          width:'10%',
          bordoColor:'blue', 
          bordoWidth:2,
          labelColor:'red',
          inputColor:'green',     
          row: 1, 
          pagina:1},
        
        mobile: { 
          visibile:true,
          margineDx: '1%' ,
          height:40, 
          width:'10%',
          bordoColor:'red', 
          bordoWidth:2,
          labelColor:'red',
          inputColor:'green',     
          row: 1, 
          pagina:1
        } 
        } },

      nazione: { label: 'Nazione', type: 'text' , obbligatorio:false, 
       layout: { 
         web: { 
          visibile:true,
          margineDx: '2%' ,
          height:40, 
          width:'10%',
          bordoColor:'blue', 
          bordoWidth:2,
          labelColor:'red',
          inputColor:'green',     
          row: 1, 
          pagina:1},
        
        mobile: { 
          visibile:true,
          margineDx: '1%' ,
          height:40, 
          width:'10%',
          bordoColor:'red', 
          bordoWidth:2,
          labelColor:'red',
          inputColor:'green',     
          row: 1, 
          pagina:1
        } 
      } },
 
      


}

export default {
  schemaCliente,
  schemaSedi,
 
};