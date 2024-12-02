const schemaOrdineCliente = {
    
    numero: { label: 'Numero: ', type: 'numero', obbligatorio:false,visibile:true ,
      layout: { 
        web: { row: 1, margineDx:'3%', width: '20%', visibile:true }, 
        mobile: { row: 1, margineDx: '3%' , width:'30%', visibile:true} }
      },
      dataOrdine: { label: 'DataOrdine', type: 'data', obbligatorio:true, visibile:true ,
        layout: { 
          web: { row: 1, margineDx: '3%', width: '20%', visibile:true }, 
          mobile: { row: 1, margineDx: '3%' , width:'40%', visibile:true} } 
        },
        dataEvasione: { label: 'Data Evasione', type: 'data', obbligatorio:true, visibile:true ,
          layout: { 
          web: { row: 1, margineDx:'3%', width: '20%', visibile:true }, 
          mobile: { row: 2, margineDx: '3%' , width:'40%', visibile:true} } 
      },
      evasioneParziale: { label: 'Parziale (SI/NO)', type: 'text', obbligatorio:false, visibile:true ,
        layout: { 
          web: { row: 1, margineDx: 0 , width: '25%', visibile:true}, 
          mobile: { row: 2, margineDx: 0 , width: '40%' , visibile:true} } 
        },
    nome: { label: 'Cliente', type: 'text', obbligatorio:true,visibile:true ,
      layout: { 
        web: { row: 2, margineDx:0, width: '100%', visibile:true }, 
        mobile: { row: 3, margineDx: 0 , width:'100%', visibile:true} }
      },
      totaleOrdine: { label: 'totale', type: 'text', obbligatorio:false,visibile:true ,
        layout: { 
          web: { row: 3, margineDx:'5%', width: '40%', visibile:true }, 
          mobile: { row: 4, margineDx: '5%' , width:'45%', visibile:true} }
        },
        ivaOrdine: { label: 'iva', type: 'text', obbligatorio:false,visibile:true ,
          layout: { 
            web: { row: 3, margineDx:0, width: '40%', visibile:true }, 
            mobile: { row: 4, margineDx: 0 , width:'45%', visibile:true} }
          },
     
  };

const schemaRigaOrdineCliente= {
prodotto: { label: 'Prodotto: ', type: 'text', obbligatorio:false,visibile:true ,
  layout: { 
    web: { row: 1, margineDx:'3%', width: '100%', visibile:true }, 
    mobile: { row: 1, margineDx: '3%' , width:'100%', visibile:true} }
  },
  prezzoListino: { label: 'Listino', type: 'data', obbligatorio:true, visibile:true ,
    layout: { 
      web: { row: 2, margineDx: '3%', width: '20%', visibile:true }, 
      mobile: { row: 2, margineDx: '2%' , width:'25%', visibile:true} } 
    },
   'sconto%': { label: '%', type: 'numero', obbligatorio:true, visibile:true ,
        layout: { 
          web: { row: 2, margineDx: '3%', width: '7%', visibile:true }, 
          mobile: { row: 2, margineDx: '2%' , width:'12%', visibile:true} } 
        },
      scontoImporto: { label: 'Sconto', type: 'data', obbligatorio:true, visibile:true ,
        layout: { 
          web: { row: 2, margineDx: '3%', width: '20%', visibile:true }, 
          mobile: { row: 2, margineDx: '2%' , width:'25%', visibile:true} } 
        },
        prezzoUnitario: { label: 'Prezzo', type: 'numero', obbligatorio:true, visibile:true ,
          layout: { 
            web: { row: 2, margineDx: '3%', width: '20%', visibile:true }, 
            mobile: { row: 2, margineDx: '2%' , width:'30%', visibile:true} } 
          },
        
        quantita: { label: 'QT', type: 'numero', obbligatorio:true, visibile:true ,
        layout: { 
          web: { row: 3, margineDx: '3%', width: '8%', visibile:true }, 
          mobile: { row: 3, margineDx: '2%' , width:'15%', visibile:true} } 
        },
        tipoQuantita: { label: 'TP', type: 'text', obbligatorio:true, visibile:true ,
        layout: { 
          web: { row: 3, margineDx: '3%', width: '8%', visibile:true }, 
          mobile: { row: 3, margineDx: '2%' , width:'15%', visibile:true} } 
        },
        prezzoTotale: { label: 'Totale', type: 'numero', obbligatorio:true, visibile:true ,
          layout: { 
            web: { row: 3, margineDx: '3%', width: '20%', visibile:true }, 
            mobile: { row: 3, margineDx: '2%' , width:'35%', visibile:true} } 
          },
      'iva%': { label: '%', type: 'numero', obbligatorio:true, visibile:true ,
        layout: { 
          web: { row: 3, margineDx: '3%', width: '8%', visibile:true }, 
          mobile: { row: 4, margineDx: '2%' , width:'10%', visibile:true} } 
        },
        importoIva: { label: 'iva', type: 'numero', obbligatorio:true, visibile:true ,
          layout: { 
            web: { row: 3, margineDx: '3%', width: '15%', visibile:true }, 
            mobile: { row: 4, margineDx: '3%' , width:'25%', visibile:true} } 
          },
          norma: { label: 'norma', type: 'text', obbligatorio:true, visibile:true ,
            layout: { 
              web: { row: 3, margineDx: '3%', width: '20%', visibile:true }, 
              mobile: { row: 4, margineDx: '3%' , width:'40%', visibile:true} } 
            },
}

  export  {schemaOrdineCliente,schemaRigaOrdineCliente}