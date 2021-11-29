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

const ContainerA = styled.div`
    margin-bottom:60px;
`

const Btn = ({text}) =>{
    return (
    <Link to={'/page2'}>
        <button
        style={{
            backgroundColor: "skyblue",
            color : "white",
            padding: "10px 20px",
            border: 0,
            borderRadius: "10px",
            fontSize: 16,
            marginLeft: "40px"
        }}>{text}</button>
    </Link>
    );
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
     return (
    <Body><Wrap>
        <TitleWrap><Title>백신 접종 예약 시스템</Title> </TitleWrap>
        <ContainerA>
            <div style={{margin:'20px'}}>
                <LeftInput>이름 :</LeftInput>
                <RightInput>
                    <input style={{width:'100px',height:'27px'}}
                    value={name}
                    onChange={onChange1}/>
                </RightInput>
            </div>
            <div style={{margin:'20px'}}>
                <LeftInput>주민번호 :</LeftInput>
                <RightInput>
                    <input style={{width:'150px',height:'27px'}}
                    value={RRN}
                    onChange={onChange2}/>
                </RightInput>
            </div>
            <div style={{margin:'20px'}}>
                <LeftInput>연락처 :</LeftInput>
                <RightInput>
                    <input style={{width:'130px',height:'27px'}}
                    value={pn}
                    onChange={onChange3}/>
                </RightInput>
            </div>   
        </ContainerA>
        <Btn text="로그인하기" />
        <Btn text="회원가입" />
        </Wrap>
    </Body>
    );
};


export default Page1;