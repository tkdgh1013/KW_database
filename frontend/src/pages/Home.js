import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components'
import { Link } from 'react-router-dom';

const Body = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction:column;
    font-size:25px;
    height:500px;  
`

const Wrap = styled.div`
    
`

const Title = styled.div`
    display:flex;
    text-align:center;
`

const TitleWrap = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    width:400px;
    height:80px;
    background-color:#A6A6A6;
    border-radius: 10px;
    margin-bottom: 20px;
`
const ContainerA = styled.div`
    display:flex;
`

const Btn = styled.button`
    color : gray;
    padding: 10px 20px;
    width:120px;
    height:200px;
    border: 0;
    border-radius: 10px;
    font-size: 15px;
    margin-right: 20px;
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
     return (
    <Body><Wrap>
        <TitleWrap><Title>백신 접종 예약 시스템</Title> </TitleWrap>
        <ContainerA>
            <Btn style={{backgroundColor:'#eecccc'}} onClick ={()=>{document.location.href = '/Reservation'}}>백신 접종<br/>예약</Btn>
            <Btn style={{backgroundColor:'#cceed4'}} onClick ={()=>{document.location.href = '/Mypage'}}>백신 예약<br/>조회 / 변경</Btn>
            <Btn style={{backgroundColor:'#ccd4ee'}} onClick ={()=>{document.location.href = '/View'}}>백신 접종<br/>현황 보기</Btn>
        </ContainerA>
        </Wrap>
    </Body>
    );
};

export default Home;