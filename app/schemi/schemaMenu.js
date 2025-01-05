export const schemaMenu = {
          anagrafiche: { label:'ANAGRAFICHE',
                azienda:{ label: 'Azienda', 
                        inserimento:{label:'Nuova Azienda',route:'',icona:'building',permesso:true}, 
                        modifica:{ label: 'Modifica Azienda',route:'',icona:'',permesso:true},
                },

                clienti:{ label: 'Clienti', 
                        inserimento:{label:'Nuova Cliente',route:'(CLIENTI)/InserimentoClienti',icona:'user-plus',permesso:true}, 
                        modifica:{ label: 'Modifica Cliente',route:'',icona:'user-edit',permesso:true},
                },
                fornitori:{ label: 'Fornitori', 
                        inserimento:{label:'Nuova Fornitore',route:'',icona:'user-plus',permesso:true}, 
                        modifica:{ label: 'Modifica Fornitore',route:'',icona:'user-edit',permesso:true},},
          },

          vendite: { label:'VENDITE',
                ordini:{ label: 'Ordini Clienti', 
                        inserimento:{label: 'Registra Nuovo Ordine',route:'',icona:'building',permesso:true}, 
                        modifica:{ label: 'Modifica Ordine',route:'',icona:'',permesso:true},
                },

                proforme:{ label: 'Proforme Clienti', 
                        inserimento:{label: 'Emetti Nuova Proforma',route:'',icona:'user-plus',permesso:true}, 
                        modifica:{ label: 'Modifica Proforma ',route:'',icona:'user-edit',permesso:true},
                },
                fatture:{ label: 'Fatture Clienti', 
                        inserimento:{label: 'Emetti Nuova Fattura',route:'',icona:'user-plus',permesso:true}, 
                        modifica:{ label: 'Modifica Fattura',route:'',icona:'user-edit',permesso:true},
                },
                noteCredito:{ label: 'Note di Credito',
                        inserimento:{label: 'Emetti Nota Credito',route:'',icona:'user-plus',permesso:true}, 
                        modifica:{ label: 'Modifica Nota Credito ',route:'',icona:'user-edit',permesso:true},
                },
                corrispettivi:{ label: 'Corrispettivi del giorno',
                        inserimento:{label: 'Registra Incasso',route:'',icona:'user-plus',permesso:true}, 
                        modifica:{ label: 'Modifica Incasso',route:'',icona:'user-edit',permesso:true},
                },
          },
          Acquisti: { label:'ACQUISTI',
                ordini:{ label: 'Ordini Fornitore', 
                        inserimento:{label: 'Emetti Nuovo Ordine',route:'',icona:'building',permesso:true}, 
                        modifica:{ label: 'Modifica Ordine',route:'',icona:'',permesso:true},
                },

                proforme:{ label: 'Proforma Fornitori', 
                        inserimento:{label: 'Registra Nuova Proforma',label: 'Nuovo Fornitore',route:'',icona:'user-plus',permesso:true}, 
                        modifica:{ label: 'Modifica Proforma',route:'',icona:'user-edit',permesso:true},
                },
                fatture:{ label: 'Fatture Fornitori',
                        inserimento:{label: 'Registra Nuova Fattura',route:'',icona:'user-plus',permesso:true}, 
                        modifica:{ label: 'Modifica Fattura',route:'',icona:'user-edit',permesso:true},
                },
                noteCredito:{ label: 'Note di Credito',
                        inserimento:{label: 'Registra Nuova N.C.',route:'',icona:'user-plus',permesso:true}, 
                        modifica:{ label: 'Modifica Nota Credito',route:'',icona:'user-edit',permesso:true},
                },
               
          },


        }


        export default {
                schemaMenu,
               
               
              };



/*

    azienda: { label:'AZIENDA',
            inserimento:{ label: 'Inserisci',route:'',icona:'',permesso:true},
            modifica:{ label: 'Modifica',route:'',icona:'',permesso:true},        
        },
    clienti: { label:'CLIENTI',
            nuovo:{ label: 'Nuovo Cliente',route:'',icona:'user-plus',permesso:true},
            modifica:{ label: 'Modifica Cliente',route:'',icona:'user-edit',permesso:true},        
        },    
    fornitori: { label:'FORNITORI',
            inserimento:{ label: 'Nuovo Fornitore',route:'',icona:'user-plus',permesso:true},
            modifica:{ label: 'Modifica Fornitore',route:'',icona:'user-edit',permesso:true},        
            },
        }
      Vendite: {}
    ordini: { label:'ORDINI',
            inserimento:{ label: 'Inserisci Ordine',route:'',icona:'cart-plus',permesso:true},
            modifica:{ label: 'Modifica Ordine',route:'',icona:'edit',permesso:true},        
            },
    proforma: { label:'PROFORMA',
            inserimento:{ label: 'Nuova Proforma',route:'',icona:'file-invoice',permesso:true},
            modifica:{ label: 'Modifica Ordine',route:'',icona:'edit',permesso:true},        
            },
    fatture: { label:'FATTURE',
            inserimento:{ label: 'Nuova Fattura',route:'',icona:'file-invoice',permesso:true},
            modifica:{ label: 'Modifica Fattura',route:'',icona:'edit',permesso:true},     
                    
    }



}
    */