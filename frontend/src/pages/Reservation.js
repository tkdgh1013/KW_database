import React, { useState, memo } from 'react';
import { useEffect } from 'react';
import { useMemo } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import DatePicker from "react-datepicker";
import "@fontsource/noto-sans-kr";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select"
import icon from"../images/goback.PNG"

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
    margin-top:20px;
    margin-bottom: 20px;
`
const ContainerA = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    width:800px;
    gap:20px;
    height:150px;
    background-color:#A6A6A6;
    border-radius: 10px;
    margin-bottom: 20px;
`

const ContainerB = styled.div`
    display:flex;
    align-items:center;
    width:800px;
    height:600px;
    background-color:#A6A6A6;
    border-radius: 10px;
`

const innerBody = styled.div`
    margin:10px;
`

const Btn = styled.button`
    background-color: white;
    height:38.19px;
    padding: 0px 20px;
    border: 0;
    border-radius: 5px;
    font-size: 14px;
    cursor: pointer;
    font-family:"Noto Sans KR";
`

const Btn1 = styled.button`
    background-color: #308BFE;
    color:white;
    text-align:center;
    width: 120px;
    height:38.19px;
    margin-left:10px;
    padding: 0px 20px;
    border: 0;
    border-radius: 5px;
    font-size: 18px;
    cursor: pointer;
    font-family:"Noto Sans KR";
`

const searchRow = styled.div`
    display:flex;
    flex-direction:row;
    align-items:center;
`
const HospitalList = styled.div`
    display:flex;
    height: 600px;
    flex-direction:column;
    width:200px;
    overflow: scroll;
`

const DetailInfo = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    width:400px;
`

const InputField = styled.input`
    width:100px;
    height:36.19px;
    border:0px;
    border-radius: 4px;
    font-size: 14px;
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

function getFormatDate(date){
    var year = date.getFullYear();
    var month = (1+date.getMonth());
    month = month >= 10? month: '0' + month;
    var day = date.getDate();
    day = day>= 10? day : '0' + day;
    return year + '-' + month + '-' + day;
}

const Reservation= ({history})=>{
    const [date,setDate] = useState(new Date());
    const [formatted_date,setFdate] = useState("");
    const [si,setSi] = useState("");
    const [gu,setGu] = useState("");
    const [dong,setDong] = useState("");
    
    const ExampleCustomInput = ({ value, onClick }) => (
        <Btn onClick={onClick}>
          {value}
        </Btn>
    );

    useEffect(()=>{
        setFdate(getFormatDate(date));
    },[date]);
    
    const options = useMemo(
        () => [
          { value: "pFizer", label: "화이자" },
          { value: "Moderna", label: "모더나"},
          { value: "AstraZeneca", label: "아스트라제네카"},
          { value: "Janssen", label: "얀센" },
        ],
        []
    );

    const RRN = window.sessionStorage.getItem('RRN');
    const [username, setUsername] = useState();
    useEffect(()=>{
        axios.get('http://localhost:4000/username',{params:{RRN:RRN}}).then(({data})=>{setUsername(data[0].name)});
    },[])
    console.log(RRN);

 /* const onChange1 = (event) => {
        setName(event.target.value);
    }
    const onChange2 = (event) => {
        setRRN(event.target.value);
    }
    const onChange3 = (event) => {
        setPn(event.target.value);
    }*/
    return (
    <Body><Wrap>
        <User><ImgWrap><img src={icon} onClick = {()=>{document.location.href = '/home'}}></img></ImgWrap>
        <Name>{username}님</Name>
        <Btnlogout onClick={()=>logoutHandler()}>로그아웃</Btnlogout>
        </User>
        <TitleWrap><Title>의료기관 찾기</Title> </TitleWrap>
        <ContainerA>
        <div style={{
            flexDirection:'row',
            display:'flex',
            justifyContent:'flex-start',
            marginLeft:'150px'
            }}>
        <DatePicker
        selected={date}
        onChange={date => {  
            setDate(date);
            }
        }
        customInput={<ExampleCustomInput />}
        />
        <div style={{fontSize:16,
        marginTop:'3px',
        marginLeft:'24px',
        width:'171px'}}>
        <Select
        defaultValue={{value:"Pfizer",label:"화이자"}}
        options={options}>
        </Select>
        </div>
        </div>
        <div style={{
            flexDirection:'row',
            display:'flex',
            justifyContent:'center',
            gap:'20px'}}>     
        <InputField placeholder="OO시"/>
        <InputField placeholder="OO구"/>
        <InputField placeholder="OO동"/>
        <Btn1>
            검색
        </Btn1>
        </div>
        </ContainerA>
        <ContainerB>
            <HospitalList>
                여기다 스크롤 바가 있는 병원 목록
                여기다 스크롤 바가 있는 병원 목록
                여기다 스크롤 바가 있는 병원 목록
                여기다 스크롤 바가 있는 병원 목록
                여기다 스크롤 바가 있는 병원 목록
                여기다 스크롤 바가 있는 병원 목록
                여기다 스크롤 바가 있는 병원 목록
                여기다 스크롤 바가 있는 병원 목록
                여기다 스크롤 바가 있는 병원 목록
                여기다 스크롤 바가 있는 병원 목록
                여기다 스크롤 바가 있는 병원 목록
                여기다 스크롤 바가 있는 병원 목록
                여기다 스크롤 바가 있는 병원 목록
                여기다 스크롤 바가 있는 병원 목록
                여기다 스크롤 바가 있는 병원 목록
            </HospitalList>
            <DetailInfo>
                안녕하세요
            </DetailInfo>
        </ContainerB>
    </Wrap></Body>
    );
};

export default Reservation;