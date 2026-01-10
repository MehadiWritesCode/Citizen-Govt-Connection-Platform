import { HeroDictionary } from './hero_interface';
import { SafetyNavigatorDictionary } from './safety_navigator';
export interface Dictionary {

  loginRegUi: {
    title: string;
    subtitle: string;
    help: string;
    num1: string;
    num2: string;
    support: string;
    supportText: string;
    links: string;
    link1: string;
    link2: string;
    link3: string;
    contactUs: string;
    helpline: string;
  },
  auth:{
    toggleBtn: {
        login:string,
        register:string
    },
    login:{
        numberLabel:string,
        numberPlaceholder:string,
        passwordLabel:string,
        passwordPlaceholder:string,
        forgotPassword:string,
        signInBtn:string,
        officialNotice:string,
    },
    register:{
        nameLabel: string,
    namePlaceholder: string,
    numberLabel: string,
    numberPlaceholder: string,
    nidNumberLabel: string,
    nidNumberPlaceholder: string,
    ageLabel: string,
    agePlaceholder: string,
    dobLabel: string,
    addressLabel: string,
    addressPlaceholder: string,
    passwordLabel: string,
    passwordPlaceholder: string,
    confirmPasswordLabel: string,
    confirmPasswordPlaceholder: string,
    registerBtn: string,
    termsText: string,
    terms: string,
    and: string,
    privacy: string,
    },
    authNavbar:{
       title:string,
       subtitle:string,
       helpDesk:string,
       accesibility:string,
       language:string,
       theme:string
     }
  },


  landingPage:{

 navbar:{
   title: string;
  explorer: string;
  departments: string;
  safeRoutes: string;
  loginRegister: string;
  joinPortal: string;
  },

  hero:HeroDictionary,
  safetyNavigator:SafetyNavigatorDictionary,

 }

}
