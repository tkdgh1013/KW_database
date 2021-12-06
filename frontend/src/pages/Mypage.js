import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components'
import { Link } from 'react-router-dom';

const Body = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction:column;
    font-size:25px; 
`

const Wrap = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
`

const Title = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
`

const TitleWrap = styled.div`
    position:relative;
    display:flex;
    justify-content:center;
    align-items:center;
    width:400px;
    height:80px;
    background-color:#A6A6A6;
    border-radius: 10px;
    margin-top:70px;
    margin-bottom:20px;
`

const Box = styled.div`

    position:relative;
    width:600px;
    text-align:center;
    background-color: skyblue;
    border-radius: 10px;
`

const ContainerA = styled.div`
    display:flex;
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

function MyReservation(props){
    const isExist = props.count;
    var splitString = props.string.split('|');
    if(isExist===0){
        return <div>예약 정보가 없습니다.</div>
    }
    else if(isExist===1){
        return ( <Box>
            <div>
            <span>{splitString[0]}</span>
            </div>
            <div>
            <span>{splitString[1]}</span>
            </div>
            <div>
            <span>{splitString[2]}</span>
            </div>
            <div>
            <span>{splitString[3]}</span>
            </div>
            <div>
            <span>{splitString[4]}</span>
            </div>
            <div>
            <span>{splitString[5]}</span>
            </div>
            <div>
            <span>{splitString[6]}</span>
            </div>
            <div>
            <span>{splitString[7]}</span>
            </div>
        </Box>            
        );
    }
    else if(isExist===2){
        return (
            <div>
            <Box>
            <div>
            <span>{splitString[0]}</span>
            </div>
            <div>
            <span>{splitString[1]}</span>
            </div>
            <div>
            <span>{splitString[2]}</span>
            </div>
            <div>
            <span>{splitString[3]}</span>
            </div>
            <div>
            <span>{splitString[4]}</span>
            </div>
            <div>
            <span>{splitString[5]}</span>
            </div>
            <div>
            <span>{splitString[6]}</span>
            </div>
            <div>
            <span>{splitString[7]}</span>
            </div>
        </Box>
        <Box>
            <div>
            <span>{splitString[9]}</span>
            </div>
            <div>
            <span>{splitString[10]}</span>
            </div>
            <div>
            <span>{splitString[11]}</span>
            </div>
            <div>
            <span>{splitString[12]}</span>
            </div>
            <div>
            <span>{splitString[13]}</span>
            </div>
            <div>
            <span>{splitString[14]}</span>
            </div>
            <div>
            <span>{splitString[15]}</span>
            </div>
            <div>
            <span>{splitString[16]}</span>
            </div>
        </Box> 
        </div>
        )
    }
}

const Mypage= ({history})=>{
    
    const RRN = window.sessionStorage.getItem('RRN');

    const [hospitalName1,setHospitalName1]=useState("");
    const [contact1,setContact1]=useState("");
    const [addr11,setAddr11]=useState("");
    const [addr21,setAddr21]=useState("");
    const [hour1,setHour1]=useState("");
    const [date1,setDate1]=useState("");
    const [vacc1,setVacc1]=useState("");
    const [name1,setName1]=useState("");

    const [hospitalName2,setHospitalName2]=useState("");
    const [contact2,setContact2]=useState("");
    const [addr12,setAddr12]=useState("");
    const [addr22,setAddr22]=useState("");
    const [hour2,setHour2]=useState("");
    const [date2,setDate2]=useState("");
    const [vacc2,setVacc2]=useState("");
    const [name2,setName2]=useState("");
    const [number,setNumber]=useState(0);   
    
    useEffect(()=>{
    axios.get("http://localhost:4000/vaccine_info", {params:{RRN: RRN}}).then(({data})=>{
    
    if(data[0]!==undefined){
    setNumber(1);
    setHospitalName1(data[0].hospitalName);
    setContact1(data[0].contact);
    setAddr11(data[0].address1);
    setAddr21(data[0].address2);
    setHour1(data[0].Hour);
    setDate1(data[0].Date);
    setVacc1(data[0].vaccine);
    setName1(data[0].name);
    }
        
    if(data[1]!==undefined){
    setNumber(2);
    setHospitalName2(data[1].hospitalName);
    setContact2(data[1].contact);
    setAddr12(data[1].address1);
    setAddr22(data[1].address2);
    setHour2(data[1].Hour);
    setDate2(data[1].Date);
    setVacc2(data[1].vaccine);
    setName2(data[1].name);
    }
    console.log(hospitalName1);     

    });  
    },[]);
    
    return (
    <Body><Wrap>
        <TitleWrap><Title>백신 예약 조회 / 취소</Title> </TitleWrap>   
        <MyReservation count={number}
        string={hospitalName1+'|'+contact1+'|'+addr11+'|'+addr21+
        '|'+hour1+'|'+date1+'|'+vacc1+'|'+name1+'|'+hospitalName2+
        '|'+contact2+'|'+addr12+'|'+addr22+'|'+hour2+'|'+date2+'|'+
        vacc2+'|'+name2}></MyReservation>
        </Wrap>
    </Body>
    );
};


export default Mypage;