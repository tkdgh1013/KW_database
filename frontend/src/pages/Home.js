import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components'
import "@fontsource/noto-sans-kr";
import { Link } from 'react-router-dom';

const Body = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction:column;
    font-size:25px;
    font-family:"Noto Sans KR";
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
    margin-top:70px;
    margin-bottom: 40px;
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
const loginHandler = ({name, RRN, pn}) => {
    axios.get("http://localhost:4000/login", {params:{userName : name, RRN: RRN, phoneNumber:pn}}).then(({data})=>{
        if(data.result===true){
            document.location.href = '/page2'
        }
        else{
                alert("입력하신 이름과 주민번호, 연락처가 일치하지 않습니다.");
        }
    });
    
}

const Home= ()=>{
    const temp = window.sessionStorage.getItem('RRN');
    console.log(temp);
    return (
    <Body><Wrap>
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