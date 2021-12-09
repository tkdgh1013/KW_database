import React, { useState, memo } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import DatePicker from "react-datepicker";
import "@fontsource/noto-sans-kr";
import "react-datepicker/dist/react-datepicker.css";
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
    background-color:#FF9595;
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

const ContainerB = styled.div`
    display:flex;
    align-items:flex-start;
    flex-direction:column;
    width:800px;
    background-color:#A6A6A6;
    border-radius: 10px;
    padding: 5px 20px 20px 20px;
`

const ListWrap = styled.div`
    display:flex;
    align-items:center;
`

const DetailInfo = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    width:500px;
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

let resultNum=0;

function HospitalList(prop){
    const result = [];
    const [hospitalName, setHospitalName] = useState();
    let invertedVac;
    console.log(prop);
    if(prop.vaccine==="화이자"){
        invertedVac = "Pfizer";
    } else if(prop.vaccine==="모더나"){
        invertedVac = "Moderna";
    } else if(prop.vaccine==="아스트라제네카"){
        invertedVac = "AstraZeneca";
    } else if(prop.vaccine==="얀센"){
        invertedVac = "Janssen";
    }
    axios.get("http://localhost:4000/list", {params:{date : prop.date, address1: prop.si, address2: prop.gu, address3: prop.dong, vaccine:invertedVac}}).then(({data})=>{
        console.log(data);
        if(data.result!==false){
            resultNum = data.length;
        }
    })
    useEffect(()=>{
        
    },[])
    if(prop.isClicked===false)
    {
        return <div>없어</div>;
    }
    for (let i=0; i<5; i++){
        result.push(<div>for문 체크 {i}</div>)
    }
    return(
        <div style={{display:'flex',
        height:'600px',
        width:'300px',
        flexDirection:'column',
        overflow:'scroll'
        }}>
        {result}
        </div>
    );
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
    const [vaccine,setVaccine] = useState();
    const [isClick,setIsClick] = useState(false);
    
    const ExampleCustomInput = ({ value, onClick }) => (
        <Btn onClick={onClick}>
          {value}
        </Btn>
    );

    useEffect(()=>{
        setFdate(getFormatDate(date));
    },[date]);    

    const RRN = window.sessionStorage.getItem('RRN');

    const [username, setUsername] = useState();
    useEffect(()=>{
        axios.get('http://localhost:4000/username',{params:{RRN:RRN}}).then(({data})=>{setUsername(data[0].name)});
    },[])

    const onChange1 = (event) => {
        setSi(event.target.value);
    }
    const onChange2 = (event) => {
        setGu(event.target.value);
    }
    const onChange3 = (event) => {
        setDong(event.target.value);
    }
    const onChange4 = (event) => {
        setVaccine(event.target.value);
    }
    const onClicked = ()=>{
        if(si[(si.length)-1]!=='시'||gu[(si.length)-1]!=='구'||dong[(dong.length)-1]!=='동'||(!(vaccine==='화이자'||vaccine==='모더나'||vaccine==='아스트라제네카'||vaccine==='얀센')))
        {
            alert("검색 옵션을 알맞게 입력해주십시오.");
            return;
        }
        setIsClick(true);
    }
    console.log(vaccine);
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
        
        <InputField 
        value={vaccine}
        placeholder="화이자"
        onChange={onChange4}
        />
        </div>
        </div>
        <div style={{
            flexDirection:'row',
            display:'flex',
            justifyContent:'center',
            gap:'20px'}}>     
        <InputField 
        value={si}
        placeholder="OO시"
        onChange={onChange1}
        />
        <InputField 
        value={gu}
        placeholder="OO구"
        onChange={onChange2}     
        />
        <InputField 
        value={dong}
        placeholder="OO동"
        onChange={onChange3}
        />
        <Btn1 onClick={onClicked}>
            검색
        </Btn1>
        </div>
        </ContainerA>
        <ContainerB>
            <div style={{backgroundColor:'white',
        marginBottom:'5px'}}>
            <div style={{
            padding:'0px 8px',
        }}>검색결과 총 {resultNum}건</div>
            </div>
            <ListWrap>
            <HospitalList 
            isClicked={isClick}
            date={formatted_date}
            vaccine={vaccine}
            si={si}
            gu={gu}
            dong={dong}
            />
            <DetailInfo>
                안녕하세요
            </DetailInfo>
            </ListWrap>
        </ContainerB>
    </Wrap></Body>
    );
};

export default Reservation;