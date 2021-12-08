import React, { useState } from 'react';
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

const Wrap = styled.div`
    
`

const BtnWrap = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
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
    margin-top:70px;
    margin-bottom: 40px;
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
    background-color: #308BFE;
    color : white;
    padding: 10px 20px;
    border: 0;
    border-radius: 10px;
    font-size: 18px;
    cursor: pointer;
`
const signupHandler = ({name, RRN, pn, addr}) => {
    console.log("머냐?",name, RRN, pn, addr)
    if(name===null)
    {
        alert("이름을 입력해주십시오.");
    }
    else if(RRN===null)
    {
        alert("주민번호를 입력해주십시오.");
        return;
    }
    else if(pn===null)
    {
        alert("전화번호를 입력해주십시오.");
        return;
    }
    else if(addr===null)
    {
        alert("주소를 입력해주십시오.");
        return;
    }

    axios.get("http://localhost:4000/join", {params:{userName : name, RRN: RRN, phoneNumber:pn, address:addr}}).then(({data})=>{
        if(data.result===true){
            document.location.href = '/'
        }
        else{
                alert("가입된 정보가 존재합니다.");
        }
    });
    
}

const Signup= ({history})=>{
    const [name,setName] = useState("");
    const [RRN,setRRN] = useState("");
    const [pn,setPn] = useState("");
    const [addr,setAddr] = useState("");
    const onChange1 = (event) => {
        setName(event.target.value);
    }
    const onChange2 = (event) => {
        setRRN(event.target.value);
    }
    const onChange3 = (event) => {
        setPn(event.target.value);
    }
    const onChange4 =(event)=>{
        setAddr(event.target.value);
    }
    console.log(name,RRN,pn);
     return (
    <Body><Wrap>
        <TitleWrap><Title>백신 접종 예약 시스템</Title> </TitleWrap>
        <div
            style={{marginBottom:"40px",
            fontSize:'19px'}}>
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
            <div style={{margin:'20px'}}>
                <LeftInput>주소 :</LeftInput>
                <RightInput>
                    <input style={{width:'130px',height:'27px'}}
                    placeholder="OO시 OO구 OO동"
                    value={addr}
                    onChange={onChange4}/>
                </RightInput>
            </div> 
        </div>
        <BtnWrap>
        <Btn onClick = {()=>signupHandler({name,RRN,pn,addr})}>회원가입하기</Btn>
        </BtnWrap>
        </Wrap>
    </Body>
    );
};


export default Signup;