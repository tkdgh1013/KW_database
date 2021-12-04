import React, { useEffect, useState } from 'react';
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

const box = styled.div`
    width:600px;
    height:400px;
    text-align:center;
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



const Mypage= ({history})=>{
    
    const RRN = window.sessionStorage.getItem('RRN');
    let count=0;
    const [info1,setInfo1]=useState({
        hospitalName:'',
        contact:'',
        addr1:'',
        addr2:'',
        hour:'',
        date:'',
        vacc:'',
        name:''
    })
    const [info2,setInfo2]=useState({
        hospitalName:'',
        contact:'',
        addr1:'',
        addr2:'',
        hour:'',
        date:'',
        vacc:'',
        name:''
    })
    
    
    useEffect(async()=>{
        const res = axios.get("http://localhost:4000/vaccine_info", {params:{RRN: RRN}}).then(({data})=>{
        
        if(data[0]!==undefined){
            setInfo1(
                info1.hospitalName=data[0].hospitalName,
                info1.contact=data[0].contact,
                info1.addr1=data[0].address1,
                info1.addr2=data[0].address2,
                info1.hour=data[0].Hour,
                info1.date=data[0].Date,
                info1.vacc=data[0].vaccine,
                info1.name=data[0].name
            )
            count=1;
            if(data[1]!==undefined){
                setInfo2(
                    info2.hospitalName=data[1].hospitalName,
                    info2.contact=data[1].contact,
                    info2.addr1=data[1].address1,
                    info2.addr2=data[1].address2,
                    info2.hour=data[1].Hour,
                    info2.date=data[1].Date,
                    info2.vacc=data[1].vaccine,
                    info2.name=data[1].name
                )
                count=2;
            }
        }
        console.log(info1);    
        console.log(info2);    
        });
        
    },[])
    
    if(count===0){
    return (
    <Body><Wrap>
        <TitleWrap><Title>백신 예약 조회 / 취소</Title> </TitleWrap>
        
        <div
            style={{marginBottom:"60px"}}>
        </div>
        </Wrap>
    </Body>
    );}
    if(count===1){
        return (
        <Body><Wrap>
            <TitleWrap><Title>백신 예약 조회 / 취소</Title> </TitleWrap>
            
            <div
                style={{marginBottom:"60px"}}>
            </div>
            </Wrap>
        </Body>
    );}
    if(count===2){
        return (
        <Body><Wrap>
            <TitleWrap><Title>백신 예약 조회 / 취소</Title> </TitleWrap>
            
            <div
                style={{marginBottom:"60px"}}>
            </div>
            </Wrap>
        </Body>
    );}
};


export default Mypage;