import React, { useState } from 'react';
import { useEffect } from 'react';
import { useMemo } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select"

const Body = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction:column;
    font-size:25px;
    height:800px;  
`

const Wrap = styled.div`
    
`

const Title = styled.div`
    display:flex;
    text-align:center;
    color : white;
`

const TitleWrap = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    width:400px;
    height:60px;
    background-color:#A6A6A6;
    border-radius: 10px;
    margin-bottom: 20px;
    margin-left:100px;
`
const ContainerA = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    width:600px;
    height:120px;
    background-color:#A6A6A6;
    border-radius: 10px;
    margin-bottom: 20px;
`

const ContainerB = styled.div`
    display:flex;
    justify-content:center;
    width:600px;
    height:400px;
    background-color:#A6A6A6;
    border-radius: 10px;
`

const innerBody = styled.div`
    margin:10px;
`

const Btn = styled.button`
    background-color: white;
    padding: 10px 20px;
    border: 0;
    border-radius: 5px;
    font-size: 16;
    cursor: pointer;
`
const searchRow = styled.div`
    display:flex;
    flex-direction:row;
    align-items:center;
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

    const temp = window.sessionStorage.getItem('RRN');
    console.log(temp);

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
        <TitleWrap><Title>의료기관 찾기</Title> </TitleWrap>
        <ContainerA>
        <div style={{
            flexDirection:'row',
            display:'flex',
            justifyContent:'center',
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
        marginTop:'5px',
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
            justifyContent:'center',}}>     
            <div style={{fontSize:16,
        margin:'5px 10px 0px 0px',
        width:'125px'}}>
        <Select
        defaultValue={{value:"서울시",label:"서울시"}}
        options={options}>
        </Select>
        </div>
        <div style={{fontSize:16,
        margin:'5px 10px 0px 0px',
        width:'125px'}}>
        <Select
        defaultValue={{value:"Pfizer",label:"화이자"}}
        options={options}>
        </Select>
        </div>
        <div style={{fontSize:16,
        margin:'5px 10px 0px 0px',
        width:'125px'}}>
        <Select
        defaultValue={{value:"Pfizer",label:"화이자"}}
        options={options}>
        </Select>
        </div>
        <Btn>
            인생리셋버튼
        </Btn>
        </div>
        </ContainerA>
        <ContainerB>
            히힝
        </ContainerB>
    </Wrap></Body>
    );
};

export default Reservation;