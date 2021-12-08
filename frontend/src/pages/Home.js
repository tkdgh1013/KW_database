import React, { useState,useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components'
import "@fontsource/noto-sans-kr";

const Body = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction:column;
    font-size:25px;
    font-family:"Noto Sans KR";
`
const User=styled.div`
    display:flex;
    align-content : center;
    width:300px;
    height:50px;
    font-size: 15px;
    font-family:"Noto Sans KR";
    justify-content:right;
    margin-top:50px;
    margin-left:300px;
`

const Wrap = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
`

const Title = styled.div`
    display:flex;
`

const TitleWrap = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    width:400px;
    height:80px;
    background-color:#A6A6A6;
    border-radius: 10px;
    margin-top:20px;
    margin-bottom: 20px;
`
const ContainerA = styled.div`
    width:600px;
    display:inline-flex;
    justify-content:center;
    gap:20px;
    align-items:center;
`

const Btn = styled.button`
    align-content: center;
    padding: 10px 20px;
    width:200px;
    height:400px;
    border: 0;
    border-radius: 10px;
    font-size: 25px;
    font-family:"Noto Sans KR";
    cursor: pointer;
`

const Btnlogout = styled.button`
    align-content: center;
    padding: 10px 20px;
    width:100px;
    height:40px;
    border: 0;
    border-radius: 10px;
    font-size: 15px;
    font-family:"Noto Sans KR";
    cursor: pointer;
`

const Name = styled.div`
    padding: 10px 20px;
`

const logoutHandler = () => {
    window.sessionStorage.clear();
    document.location.href = '/'
}

const Home= ()=>{
    const RRN = window.sessionStorage.getItem('RRN');
    console.log(RRN);
    const [username, setUsername] = useState();
    useEffect(()=>{
        axios.get('http://localhost:4000/username',{params:{RRN:RRN}}).then(({data})=>{setUsername(data[0].name)});
    },[])
    console.log(username);
    return (
    <Body>
        <User><Name>{username}님</Name><Btnlogout onClick={()=>logoutHandler()}>로그아웃</Btnlogout></User>
        <Wrap>
        <TitleWrap><Title>백신 접종 예약 시스템</Title> </TitleWrap>
        <ContainerA>
            <Btn style={{backgroundColor:'#FF9595'}} onClick ={()=>{document.location.href = '/Reservation'}}>백신 접종<br/>예약</Btn>
            <Btn style={{backgroundColor:'#bbffcc'}} onClick ={()=>{document.location.href = '/Mypage'}}>백신 예약<br/>조회 / 변경</Btn>
            <Btn style={{backgroundColor:'#ccd4ee'}} onClick ={()=>{document.location.href = '/View'}}>백신 접종<br/>현황 보기</Btn>
        </ContainerA>
        </Wrap>
    </Body>
    );
};

export default Home;