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
`

const LeftInput = styled.span`
    width:100px;
    height:50px;
    margin-right:20px;
    text-align:center;
`

const RightInput = styled.span`
    width:100px;
    height:50px;
    margin-right:20px;
    text-align:center;
`

const innerBody = styled.div`
    margin:10px;
`

const Btn = styled.button`
    background-color: skyblue;
    color : white;
    padding: 10px 20px;
    border: 0;
    border-radius: 10px;
    font-size: 16;
    margin-left: 40px;
    cursor: pointer;
`
const loginHandler = ({name, RRN, pn}) => {
    axios.get("http://localhost:4000/login", {params:{userName : name, RRN: RRN, phoneNumber:pn}}).then(({data})=>{
        if(data.result===true){
            window.sessionStorage.setItem('RRN', RRN);
            document.location.href = '/home'
        }
        else{
                alert("입력하신 이름과 주민번호, 연락처가 일치하지 않습니다.");
        }
    });
    
}

const Page1= ({history})=>{
    const [name,setName] = useState("");
    const [RRN,setRRN] = useState("");
    const [pn,setPn] = useState("");
    const onChange1 = (event) => {
        setName(event.target.value);
    }
    const onChange2 = (event) => {
        setRRN(event.target.value);
    }
    const onChange3 = (event) => {
        setPn(event.target.value);
    }
    console.log(name,RRN,pn);
     return (
    <Body><Wrap>
        <TitleWrap><Title>백신 접종 예약 시스템</Title> </TitleWrap>
        <div
            style={{marginBottom:"60px"}}>
            <div style={{margin:'20px'}}>
                <LeftInput>이름 :</LeftInput>
                <RightInput>
                    <input style={{width:'100px',height:'27px'}}
                    placeholder="홍길동"
                    value={name}
                    onChange={onChange1}/>
                </RightInput>
            </div>
            <div style={{margin:'20px'}}>
                <LeftInput>주민번호 :</LeftInput>
                <RightInput>
                    <input style={{width:'150px',height:'27px'}}
                    placeholder="000000-0000000"
                    value={RRN}
                    onChange={onChange2}/>
                </RightInput>
            </div>
            <div style={{margin:'20px'}}>
                <LeftInput>연락처 :</LeftInput>
                <RightInput>
                    <input style={{width:'130px',height:'27px'}}
                    placeholder="000-0000-0000"
                    value={pn}
                    onChange={onChange3}/>
                </RightInput>
            </div>   
        <Btn onClick = {()=>loginHandler({name,RRN,pn})}>로그인하기</Btn>
        <Btn onClick = {()=>{document.location.href = '/signup'}}>회원가입하기</Btn>
        </div>
        </Wrap>
    </Body>
    );
};


export default Page1;