import styled from "styled-components";
import PostTweetForm from "../components/post-tweet-form";
import Timeline from "../components/timeline";

const Wraaper = styled.div`
    display: grid;
    gap: 50px;
    overflow-y: auto;                       // 세로 스크롤
    overflow-x: hidden;                     // 가로 스크롤 X
    scrollbar-width: none;                  // 스크롤바 숨기기
    grid-template-rows: 1fr 5fr;
`;

export default function Home(){
  
    return <Wraaper>
        <PostTweetForm />  
        <Timeline />          
    </Wraaper>
}