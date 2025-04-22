import styled from "styled-components";
import { auth, db, storeage } from "./firebase"
import { useEffect, useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import { ITweet } from "../components/timeline";
import Tweet from "../components/tweet";

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 20px;
`;

const AvatarUpload = styled.label`
    width: 80px;
    overflow: hidden;
    height: 80px;
    border-radius: 50%;
    background-color: #1d9bf0;
    cursor: pointer;
    align-items: center;
    svg{
        width: 50px;
    }
`;

const AvatarImg = styled.img`
    width : 100%;
`;

const AvartarInput = styled.input`
    display: none;
`;

const Name = styled.span`
    font-size: 22px;
`;

const Tweets = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

export default function Profile(){
    const user = auth.currentUser;
    const [avartar, setAvartar] = useState(user?.photoURL);
    const [tweets, setTweets] = useState<ITweet[]>([]);
    const onAvartarChage = async (e : React.ChangeEvent<HTMLInputElement>) => {
        const {files} = e.target;
        if(!user){
            return;
        };
        if(files && files.length === 1){
            const file = files[0];
            const locationRef = ref(storeage, `avartars/${user?.uid}`);
            const result = await uploadBytes(locationRef, file);
            const avartarUrl = await getDownloadURL(result.ref);
            setAvartar(avartarUrl);
            await updateProfile(user, {
                photoURL : avartarUrl
            });
        };
    };

    const fetchTweets = async() => {
      const tweetQuery = query(
        collection(db, "tweets"),
        where("userId", "==", user?.uid),
        orderBy("createAt", "desc"),
        limit(25)
      );
      
      const snapshot = await getDocs(tweetQuery);
      const tweets = snapshot.docs.map((doc)=>{
        const { tweet, createAt, userId, username, photo } = doc.data();
        return {
            tweet,
            createAt,
            userId,
            username,
            photo,
            id: doc.id
        };
      });

      setTweets(tweets);

    };

    useEffect(()=>{
      fetchTweets();
    },[]);

    // https://heroicons.dev/?search=person    
    return <Wrapper>
        <AvatarUpload htmlFor="avartar">
            {Boolean(avartar) ? <AvatarImg src={avartar ?? ""}/> 
            : <svg data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"></path>
              </svg>}
                                                              
        </AvatarUpload>
        <AvartarInput onChange={onAvartarChage} id = "avartar" type = "file" accept = "image/*"></AvartarInput>
        <Name>
            {user?.displayName ?? "Anonymous"}
        </Name>
        <Tweets>
            {tweets.map((tweet)=>(
                <Tweet key={tweet.id}{...tweet}></Tweet>
            ))}
        </Tweets>
    </Wrapper>
}