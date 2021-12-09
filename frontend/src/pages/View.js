import React, { useState,useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components'
import { Link } from 'react-router-dom';
import {Chart} from "react-google-charts";
import icon from"../images/goback.PNG"

const Body = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction:column;
    font-size:25px;
    height:500px;  
`
const User=styled.div`
    display:flex;
    align-content : center;
    width:600px;
    height:50px;
    font-size: 15px;
    font-family:"Noto Sans KR";
    margin-top:50px;
    
`
const ImgWrap = styled.div`
    display:flex;
    width:30px;
    height:30px;
    padding: 10px 20px;
`
const Wrap = styled.div`
    display:flex;
    flex-direction:column;
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
`
const ContainerA = styled.div`
    width:600px;
    display:inline-flex;
    justify-content:center;
    gap:20px;
    align-items:center;
`
const Btnlogout = styled.button`
    align-items:flex-end;
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
    margin-left:330px;
    padding: 10px 20px;
`

const logoutHandler = () => {
    window.sessionStorage.clear();
    document.location.href = '/'
}
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

const option1={
    hAxis: { title: "날짜", format:'yyyy-MM-dd' },
    vAxis: { title: "1차 접종자 수",viewWindow:{min:0}}
}
const option2={
    hAxis: { title: "날짜", format:'yyyy-MM-dd' },
    vAxis: { title: "1차 누적 접종자 수",viewWindow:{min:0}}
}
const firstcount=[
    ["Date","cnt1"]
]
const firstsum=[
    ["Date","sumcnt1"]
]

const View= ({history})=>{
    const RRN = window.sessionStorage.getItem('RRN');
    console.log(RRN);
    const [username, setUsername] = useState();
    useEffect(()=>{
        axios.get('http://localhost:4000/username',{params:{RRN:RRN}}).then(({data})=>{setUsername(data[0].name)});
    },[])

    useEffect(()=>{
        axios.get("http://localhost:4000/count", {}).then(({data})=>{
        
        console.log(data);
        console.log(data.length);
        for(let i=0;i<data.length;i++){
            firstcount.push([data[i].Date,data[i].cnt1]);
            firstsum.push([data[i].Date,data[i].sumcnt1])
        }
    
        });  
        },[]);
    
    console.log(firstcount);
    

     return (
    <Body><Wrap>
        <User><ImgWrap><img src={icon} onClick = {()=>{document.location.href = '/home'}}></img></ImgWrap>
        <Name>{username}님</Name>
        <Btnlogout onClick={()=>logoutHandler()}>로그아웃</Btnlogout>
        </User>
        <TitleWrap><Title>백신 접종 예약 시스템</Title> </TitleWrap>
        <ContainerA>
        <Chart chartType="ScatterChart" data={firstcount} options={option1} graphID="1차접종자수추이" width="100%" height="400px"></Chart>
        <Chart chartType="ScatterChart" data={firstsum} options={option2} graphID="1차누적접종자수추이" width="100%" height="400px"></Chart>
        </ContainerA>
        </Wrap>
    </Body>
    );
};


export default View;