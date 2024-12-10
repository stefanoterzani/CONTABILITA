// src/config/footerIconsConfig.js

import { Platform } from 'react-native';

export const getFooterIcons = (screenName, router, unreadMessages = 0) => {
  const piattaforma = Platform.OS;

  switch(screenName) {
    case 'Home':
      return [
        {
          name: 'bell', // Icona notifica
          size: piattaforma === 'web' ? 24 : 30,
          color: 'white',
          badge: unreadMessages,
          onPress: () => {
            console.log('Notifiche premute');
            router.push('/notifiche'); // Assicurati che la route '/notifiche' esista
          },
        },
        {
          name: 'cog', // Icona impostazioni
          size: piattaforma === 'web' ? 24 : 30,
          color: 'white',
          badge: 0,
          onPress: () => {
            console.log('Impostazioni premute');
            router.push('/settings'); // Assicurati che la route '/settings' esista
          },
        },
        {
          name: 'email-send', // Icona invia email
          size: piattaforma === 'web' ? 24 : 30,
          color: 'white',
          badge: 0,
          onPress: () => {
            console.log('Invia Email premuto');
            router.push('/sendEmail'); // Assicurati che la route '/sendEmail' esista
          },
        },
        {
          name: 'account', // Icona utente
          size: piattaforma === 'web' ? 24 : 30,
          color: 'white',
          badge: 0,
          onPress: () => {
            console.log('Profilo premuto');
            router.push('/profile'); // Assicurati che la route '/profile' esista
          },
        },
      ];
   

        case 'creaOrdineCliente':
          return [
            {
              name: 'home', // Icona Home
              size: piattaforma === 'web' ? 24 : 30,
              color: 'white',
              badge: 0,
              onPress: () => {
                console.log('Home premuta');
                router.push('/home'); // Naviga alla home
              },
            },
            {
              name: 'bell', // Icona notifica
              size: piattaforma === 'web' ? 24 : 30,
              color: 'white',
              badge: unreadMessages,
              onPress: () => {
                console.log('Notifiche premute');
                router.push('/notifiche'); // Assicurati che la route '/notifiche' esista
              },
            },
            {
              name: 'cog', // Icona impostazioni
              size: piattaforma === 'web' ? 24 : 30,
              color: 'white',
              badge: 0,
              onPress: () => {
                console.log('Impostazioni premute');
                router.push('/settings'); // Assicurati che la route '/settings' esista
              },
            },
          ];

    // Aggiungi altri casi per altre schermate se necessario
    default:
      return [];
  }
};