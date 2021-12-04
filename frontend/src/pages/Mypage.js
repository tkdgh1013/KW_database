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



const Mypage= ({history})=>{
    
    const RRN = window.sessionStorage.getItem('RRN');

    const [inputData,setInputData]=useState([{
        uName:'',
        hName:'',
        hContact:'',
        hAddr1:'',
        hAddr2:'',
        oHour:'',
        dDate:'',
        rVacc:''
    }])
    const[lastIdx,setLastIdx]=useState(0)

    
    useEffect(async()=>{
        axios.get("http://localhost:4000/vaccine_info", {params:{RRN: RRN}}).then(({data})=>{
        
        if(data.result!==false)
            console.log(data)
        
            
            
        });
    },[])
    

     return (
    <Body><Wrap>
        <TitleWrap><Title>백신 예약 조회 / 취소</Title> </TitleWrap>
        
        <div
            style={{marginBottom:"60px"}}>
        </div>
        </Wrap>
    </Body>
    );
};


export default Mypage;