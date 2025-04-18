import { collection, getDocs, limit, onSnapshot, orderBy, query } from "firebase/firestore";
 import { useEffect, useState } from "react";
 import { styled } from "styled-components";
import { db } from "../routes/firebase";
import Tweet from "./tweet";
import { Unsubscribe } from "firebase/auth";

 
 export interface ITweet {
   id: string;
   photo?: string;          //필수값이 아니라고 설정하기 위해 ? 추가
   tweet: string;
   userId: string;
   username: string;
   createAt: number;
 }
 
 const Wrapper = styled.div`
    display: flex;
    gap: 10px;
    flex-direction: column;
 `;
 
 export default function Timeline() {
   const [tweets, setTweet] = useState<ITweet[]>([]);
   
   //아래 코드를 userEffect 함수 내부로 이동한다!!!
   /* const fetchTweets = async () => {
    const tweetsQuery = query(
        collection(db, "tweets"),
        orderBy("createAt", "desc")
    );

    const unsubscribe = await onSnapshot(tweetsQuery, (snapshot) => {
     const tweets = snapshot.docs.map((doc) => {
         const { tweet, createAt, userId, username, photo } = doc.data();
         return {
             tweet,
             createAt,
             userId,username,
             photo,
             id: doc.id
         };
      });
         setTweet(tweets);
     });
    }; */

   useEffect(() => {
    let unsubscribe : Unsubscribe | null = null;
    

    const fetchTweets = async () => {
        const tweetsQuery = query(
            collection(db, "tweets"),
            orderBy("createAt", "desc"),

            //처음에 25개만 불러오도록 설정
            limit(25)
        );
     
     
        /* const spanshot = await getDocs(tweetsQuery);
        const tweets = spanshot.docs.map((doc) => {
         const { tweet, createAt, userId, username, photo } = doc.data();
         return {tweet,createAt,userId,username,photo,id: doc.id};
        }); */
     
        unsubscribe = await onSnapshot(tweetsQuery, (snapshot) => {
         const tweets = snapshot.docs.map((doc) => {
             const { tweet, createAt, userId, username, photo } = doc.data();
             return {
                 tweet,
                 createAt,
                 userId,username,
                 photo,
                 id: doc.id
             };
          });
             setTweet(tweets);
         });
        };

        

     fetchTweets();

     return () => {
            //cleanup
            //사용자가 화면을 보지 않을때 값을 반환하면서 cleanup 실시한다.
            unsubscribe && unsubscribe();
     };

   }, []);

   return (
     <Wrapper>
       {tweets.map((tweet)=>(<Tweet key = {tweet.id} {...tweet}/>))}
     </Wrapper>
   );
 }