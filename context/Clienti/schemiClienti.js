const schemaCliente = {
    
    nome: { label: 'Nome Cliente', type: 'text', obbligatorio:true,visibile:true ,
      layout: { 
        web: { row: 1, margineDx:0, width: '100%', visibile:true }, 
        mobile: { row: 1, margineDx: 0 , width:'100%', visibile:true} }
      },
    
    partitaIva: { label: 'Partita IVA', type: 'text', obbligatorio:true, visibile:true ,
      layout: { 
        web: { row: 2, margineDx: '5%', width: '45%', visibile:true }, 
        mobile: { row: 2, margineDx: 0 , width:'100%', visibile:true} } 
      },
    
    codiceFiscale: { label: 'Codice Fiscale', type: 'text', obbligatorio:false, visibile:true ,
      layout: { 
        web: { row: 2, margineDx: 0 , width: '45%'}, 
        mobile: { row: 3, margineDx: 0 , width: '100%' , visibile:true} } 
      },
    
    email: { label: 'E-mail', type: 'email' , obbligatorio:false, visibile:true ,
      layout: { 
        web: { row: 4, margineDx:'5%' , width:'30%', visibile:true}, 
        mobile: { row: 4, margineDx: '7%' , width:'100%', visibile:true} } 
      },

    pec: { label: 'Pec', type: 'email', obbligatorio:false, visibile:true ,
      layout: { 
        web: { row: 4, margineDx: 0 , width:'30%', visibile:true}, 
        mobile: { row: 5, ma5rgineDx: 0 ,width:'100%', visibile:true} } 
      },
   
     codiceAteco: { label: 'Codice ATECO', type: 'text' , obbligatorio:false, visibile:true ,
      layout: { 
        web: { row: 5, margineDx:0 , visibile: true, width:'17%'}, 
        mobile: { row: 9, margineDx: 0 , visibile: true, width:'100%'} } 
        },

     riferimento: { label: 'Persona Riferimento', type: 'text' , obbligatorio:false, visibile:true ,
      layout: { 
        web: { row: 5, margineDx:0 , visibile: true, width:'17%'}, 
        mobile: { row: 9, margineDx: 0 , visibile: true, width:'100%'} } 
        },
            
     telefono_1: { label: 'Telefono 1', type: 'text' , obbligatorio:false, visibile:true ,
        layout: { 
          web: { row:5, margineDx:'2%',visibile: true, width:'31%'}, 
          mobile: { row:9, margineDx: '5%' , visibile: true, width:'47%'} } 
      },
     telefono_2: { label: 'Telefono 2', type: 'text' , obbligatorio:false, visibile:true ,
        layout: { 
          web: { row:5, margineDx: '2%',visibile: true, width:'31%'}, 
          mobile: { row:9, margineDx: 0 , visibile: true, width:'47%'} } 
        },
      fax: { label: 'Fax', type: 'text' , obbligatorio:false, visibile:true ,
        layout: { 
          web: { row:5, margineDx: 0 ,visibile: true, width:'31%'}, 
          mobile: { row:10, margineDx: 0 , visibile: true, width:'47%'} } 
        },
      aziendaId: { label: 'idAzienda', type: 'text', obbligatorio:false, visibile:false ,
        layout: { 
          web: { row: 99, margineDx: 0 , visibile: false, width:'30%'}, 
          mobile: { row: 99, margineDx: 0 ,visibile: false, width:'45%'} } 
        },
      areaGeograficaId: { label: 'idArea', type: 'text', obbligatorio:false, visibile:false ,
        layout: { 
          web: { row: 99, margineDx: 0 , visibile: false, width:'30%'}, 
          mobile: { row: 99, margineDx: 0 ,visibile: false, width:'45%'} } 
        },
      regioneId: { label: 'idRegione', type: 'text', obbligatorio:false, visibile:false ,
        layout: { 
          web: { row: 99, margineDx: 0 , visibile: false, width:'30%'}, 
          mobile: { row: 99, margineDx: 0 ,visibile: false, width:'45%'} } 
        },
      cittaId: { label: 'idCittò', type: 'text', obbligatorio:false, visibile:false ,
        layout: { 
          web: { row: 99, margineDx: 0 , visibile: false, width:'30%'}, 
          mobile: { row: 99, margineDx: 0 ,visibile: false, width:'45%'} } 
        },
      unitaOperativaId: { label: 'idUnità', type: 'text', obbligatorio:false, visibile:false ,
        layout: { 
          web: { row: 99, margineDx: 0 , visibile: false, width:'30%'}, 
          mobile: { row: 99, margineDx: 0 ,visibile: false, width:'45%'} } 
        },
        idCreatore: { label: 'idCreatore', type: 'text', obbligatorio:false, visibile:false ,
          layout: { 
            web: { row: 99, margineDx: 0 , visibile: false, width:'30%'}, 
            mobile: { row: 99, margineDx: 0 ,visibile: false, width:'45%'} } 
          },
        dataCreazione: { label: 'DataCreazione', type: 'data', obbligatorio:false, visibile:false ,
          layout: { 
            web: { row: 99, margineDx: 0 , visibile: false, width:'30%'}, 
            mobile: { row: 99, margineDx: 0 ,visibile: false, width:'45%'} } 
          },
        dataAggiornamento: { label: 'DataAggiornamento', type: 'data', obbligatorio:false, visibile:false ,
          layout: { 
            web: { row: 99, margineDx: 0 , visibile: false, width:'30%'}, 
            mobile: { row: 99, margineDx: 0 ,visibile: false, width:'45%'} } 
              },
    sedeLegale: {
      citta: { label: 'Città', type: 'text'  , obbligatorio:false, 
        layout: { 
          web: { row: 1, margineDx: 0 , visibile: true, width:'100%'}, 
          mobile: { row: 5, margineDx: 10 , visibile: true, width:'100%'} 
        } },
      
        indirizzo: { label: 'Indirizzo', type: 'text' , obbligatorio:false, 
        layout: { 
          web: { row:2, margineDx: '2%', visibile: true, width:'77%'}, 
          mobile: { row:6, margineDx: '3%' , visibile: true, width:'77%'}
         } },

         civico: { label: 'Civico', type: 'text' , obbligatorio:false, 
          layout: { 
            web: { row:2, margineDx: 0 , visibile: true, width:'20%'}, 
            mobile: { row:6, margineDx: 0 , visibile: true, width:'20%'}
           } },

         provincia: { label: 'Provincia', type: 'text'  , obbligatorio:false, 
          layout: { 
            web: { row: 3, margineDx:'2%', visibile: true, width:'70%' }, 
            mobile: { row: 7, margineDx:'3%', visibile: true, width:'67%'} 
          } },  

        cap: { label: 'CAP', type: 'text' , obbligatorio:false , 
          layout: { 
            web: { row: 3, margineDx:  '2%' ,visibile: true, width:'25%'}, 
            mobile: { row:7, margineDx: 0, visibile: true, width:'30%' } 
          } },

        nazione: { label: 'Nazione', type: 'text' , obbligatorio:false, 
         layout: { 
            web: { row:4, margineDx:'2%',visibile: true, width:'100%'}, 
            mobile: { row:8, margineDx: '2%' , visibile: true, width:'100%'} 
        } },
   
        
    },
    
  };
  export  {schemaCliente}