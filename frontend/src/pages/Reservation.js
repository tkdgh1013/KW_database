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
const DetailInfo = styled.div`
    padding:10px;
    margin-left:5px;
    background-color: white;
    display:flex;
    flex-direction:column;
    width:480px;
    gap:20px;
    font-size:20px;
`

const FlexColumn = styled.div`
    overflow: visible;
    display:flex;
    gap:10px;
`

const SubmitBtn = styled.button`
    width:150px;
    height:50px;
    font-size:25px;
    text-align:center;
`

const logoutHandler = () => {
    window.sessionStorage.clear();
    document.location.href = '/'
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
    const [resultNum,setResultNum] = useState(0);
    const [hospitalName,setHospitalName] = useState([]);
    const [select, setSelect] = useState();
    const [selectInfo, setSelectInfo] = useState([0]);
    const [invisible, setInvisible] = useState(false);
    const [selectedHour, setSH] = useState("");
    
    console.log(invisible);
    useEffect(()=>{
        if(select !== undefined)
            axios.get('http://localhost:4000/hinfo',{params:{name:select.name, DateId:select.DateId}}).then(({data})=>{console.log(data); setSelectInfo(data)});
    },[select])
    
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
    const onClicked = ({date, si, gu, dong, vaccine, setResultNum, setHospitalName})=>{
        console.log(date, si, gu, dong, vaccine, setResultNum)
        if(si[(si.length)-1]!=='시'||gu[(gu.length)-1]!=='구'||dong[(dong.length)-1]!=='동'||(!(vaccine==='화이자'||vaccine==='모더나'||vaccine==='아스트라제네카'||vaccine==='얀센')))
        {
            alert("검색 옵션을 알맞게 입력해주십시오.");
            return;
        }
        let invertedVac;
        
        if(vaccine==="화이자"){
            invertedVac = "Pfizer";
        } else if(vaccine==="모더나"){
            invertedVac = "Moderna";
        } else if(vaccine==="아스트라제네카"){
            invertedVac = "AstraZeneca";
        } else if(vaccine==="얀센"){
            invertedVac = "Janssen";
        }
        axios.get("http://localhost:4000/list", {params:{date : date, address1: si, address2: gu, address3: dong, vaccine:invertedVac}}).then(({data})=>{
            console.log(data);
            if(data!==undefined){
                setResultNum(data.length);
                setHospitalName(data);
            }
        });
    }

    const Submit = ({dateId, hour, RRN, vaccine})=>{
        let invertedVac;
        
        if(vaccine==="화이자"){
            invertedVac = "Pfizer";
        } else if(vaccine==="모더나"){
            invertedVac = "Moderna";
        } else if(vaccine==="아스트라제네카"){
            invertedVac = "AstraZeneca";
        } else if(vaccine==="얀센"){
            invertedVac = "Janssen";
        }
        if(window.confirm(hour+"시 예약 하시겠습니까?")){
                axios.get("http://localhost:4000/addRes", {params:{DateId : dateId, Hour: hour, RRN: RRN, vaccine:invertedVac}}).then(({data})=>{
                console.log(data);
                if(data.result===true){
                    alert("예약이 완료되었습니다.");
                }
                else{
                    alert("예약에 실패했습니다. 다시 시도해주십시오.");
                }
            });
        }
        else{
            return;
        }
    }

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
        <Btn1 onClick={()=>onClicked({date:formatted_date, si, gu, dong, vaccine, setResultNum, setHospitalName})}>
            검색
        </Btn1>
        </div>
        </ContainerA>
        <ContainerB>
        <div>
        <div style={{backgroundColor:'white',
        marginBottom:'5px',width:'300px'}}>
        <div style={{padding:'0px 8px',}}>검색결과 : {resultNum}
        </div>
        </div>
        <div style={{display:'flex'}}>
            <div style={{display:'flex',
            height:'600px',
            width:'300px',
            flexDirection:'column',
            overflow:'scroll'}}>
            {hospitalName.map((item,index)=>{
                return <button style={{
                height:'50px',
                backgroundColor:'#308BFE',
                color:'white',
                fontSize:'20px',
                }} onClick={()=>{setSelect(item);
                setInvisible(true);}}>{item.name}</button>
            })}
        </div>
        {invisible===false ? <div></div> :
        <DetailInfo>
            <div style={{fontSize:'30px'}}>{selectInfo[0].name}</div>
            <div>상세주소<br></br>{selectInfo[0].address1}<br></br>{selectInfo[0].address2}</div>
            <FlexColumn>
            {selectInfo.map((item,index)=>{
                return <button style={{
                width:'50px',
                height:'50px',
                backgroundColor:'#308BFE',
                color:'white',
                fontSize:'20px',
                border:'0px',
                cursor:'pointer'
            }} onClick={()=>setSH(item.Hour+"시 예약")}>{item.Hour}</button>
            })}
            </FlexColumn>
            <div>연락처<br></br>{selectInfo[0].contact}</div>
            <div>접종 예약 가능 시간<br></br>{selectInfo[0].Hour}시 ~ {selectInfo[selectInfo.length-1].Hour}시</div>
            <SubmitBtn onClick={()=>Submit({dateId:select.DateId, hour:selectedHour, RRN:RRN, vaccine:vaccine})} >{selectedHour}</SubmitBtn>
        </DetailInfo>
        }
        </div>
        </div>
        </ContainerB>
    </Wrap></Body>
    );
};

export default Reservation;