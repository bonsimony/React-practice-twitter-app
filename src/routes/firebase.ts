import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import {getAuth} from "firebase/auth";

/* 
  도메인, api ket 등 여러가지 키 값들이 포함된 config 개체를 
  firebase app 생성 시에 firebaseConfig 객체가 주어졌다.
*/
const firebaseConfig = {
  apiKey: "AIzaSyDRHBD9TNQFRsFTV8nf8N2SRJ7C65c4r08",
  authDomain: "nwitter-reloaded-68b8c.firebaseapp.com",
  projectId: "nwitter-reloaded-68b8c",
  storageBucket: "nwitter-reloaded-68b8c.firebasestorage.app",
  messagingSenderId: "464085535303",
  appId: "1:464085535303:web:ba1b5d7558448f3dc07f62",
  measurementId: "G-HF9RX7ZX6F"
};

/*
  firebaseConfig 옵션을 통해서 app을 생성한다.
*/
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

/*
  app에 대한 인증 서비스를 사용한다.
*/
export const auth = getAuth(app)