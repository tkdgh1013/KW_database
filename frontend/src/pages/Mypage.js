import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components'
import "@fontsource/noto-sans-kr";
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
    cursor:pointer;
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
    display:flex;
    justify-content:center;
    align-items:center;
    width:400px;
    height:80px;
    background-color:#ccd4ee;
    border-radius: 10px;
    margin-top:20px;
    margin-bottom:20px;
`

const Box = styled.div`
    justify-content:flex-start;
    width:600px;
    background-color: skyblue;
`

const Btn = styled.button`
    display:flex;
    justify-content: center;
    width:100px;
    background-color: skyblue;
    padding: 10px 20px;
    border: 0;
    font-weight: bold;
    border-radius: 10px;
    font-size: 16;
    cursor: pointer;
`
const BtnWrap = styled.div`
    display:flex;
    justify-content: flex-end;
    margin-bottom: 20px;
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

const deleteHandler = ({index,RRN,vaccine}) => {
    axios.get("http://localhost:4000/subRes", {params:{Index : index, RRN: RRN, vaccine:vaccine}}).then(({data})=>{
        if(data.results===true){
            alert("백신 예약이 취소되었습니다.");
        }
        else{
            alert("오류가 발생하였습니다.");
        }
        document.location.href = '/Mypage';
    });
}

function MyReservation(props){
    const isExist = props.count;
    if(isExist===100)
    {
        return <div>로딩중...</div>
    }
    var splitString = props.string.split('|');
    const RRN = props.RRN;
    function convertVac(string){
        if(string==='Pfizer'){
            return '화이자';
        }
        else if(string==='Moderna'){
            return '모더나';
        }
        else if(string==='AstraZeneca'){
            return '아스트라제네카';
        }
        else {
            return '얀센';
        }
    }

    if(isExist===0){
        return <div>예약 정보가 없습니다.</div>
    }
    else if(isExist===1){
        return (
        <div>
        <Box>
            <div style={{backgroundColor:'#ACC7EE',
        padding:'16px'}}>
                1차 백신 예약 정보
            </div>
            <div style={{backgroundColor:'#DEEAF7',
                padding:'16px',
                fontSize:'20px',
                marginBottom:'10px'}}>
            <div>
            <span style={{marginRight:'15px'}}>{splitString[5]}</span>
            <span>{splitString[4]}시</span>
            </div>
            <div>
            </div>
            <div>
            <span>{splitString[0]}</span>
            </div>
            <div>
            <span>주소 : {splitString[2]} {splitString[3]}</span>
            </div>
            <div>
            <span>연락처 : {splitString[1]}</span>
            </div>
            <div>
            <span>백신 : {convertVac(splitString[6])}</span>
            </div>
            </div>
        </Box>
        <BtnWrap>   
        <Btn onClick={()=>deleteHandler({index:splitString[8],RRN:RRN,vaccine:splitString[6]})}>예약 취소</Btn>
        </BtnWrap>
        </div>   
        );
    }
    else if(isExist===2){
        return (
            <div>
            <Box>
                <div style={{backgroundColor:'#ACC7EE',
            padding:'16px'}}>
                    1차 백신 예약 정보
                </div>
                <div style={{backgroundColor:'#DEEAF7',
                    padding:'16px',
                    fontSize:'20px',
                    marginBottom:'10px'}}>
                <div>
                <span style={{marginRight:'15px'}}>{splitString[5]}</span>
                <span>{splitString[4]}시</span>
                </div>
                <div>
                </div>
                <div>
                <span>{splitString[0]}</span>
                </div>
                <div>
                <span>주소 : {splitString[2]} {splitString[3]}</span>
                </div>
                <div>
                <span>연락처 : {splitString[1]}</span>
                </div>
                <div>
                <span>백신 : {convertVac(splitString[6])}</span>
                </div>
                </div>
            </Box>
            <BtnWrap>   
            <Btn onClick={()=>deleteHandler({index:splitString[8],RRN:RRN,vaccine:splitString[6]})}>예약 취소</Btn>
            </BtnWrap>

            <Box>
                <div style={{backgroundColor:'#ACC7EE',
            padding:'16px'}}>
                    2차 백신 예약 정보
                </div>
                <div style={{backgroundColor:'#DEEAF7',
                    padding:'16px',
                    fontSize:'20px',
                    marginBottom:'10px'}}>
                <div>
                <span style={{marginRight:'15px'}}>{splitString[14]}</span>
                <span>{splitString[13]}시</span>
                </div>
                <div>
                </div>
                <div>
                <span>{splitString[9]}</span>
                </div>
                <div>
                <span>주소 : {splitString[11]} {splitString[12]}</span>
                </div>
                <div>
                <span>연락처 : {splitString[10]}</span>
                </div>
                <div>
                <span>백신 : {convertVac(splitString[15])}</span>
                </div>
                </div>
            </Box>
            <BtnWrap>   
            <Btn onClick={()=>deleteHandler({index:splitString[17],RRN:RRN,vaccine:splitString[15]})}>예약 취소</Btn>
            </BtnWrap>
            </div>
        );
    }
}

const Mypage= ({history})=>{
    
    const RRN = window.sessionStorage.getItem('RRN');
    const [username, setUsername] = useState();
    useEffect(()=>{
        axios.get('http://localhost:4000/username',{params:{RRN:RRN}}).then(({data})=>{setUsername(data[0].name)});
    },[])

    const [hospitalName1,setHospitalName1]=useState("");
    const [contact1,setContact1]=useState("");
    const [addr11,setAddr11]=useState("");
    const [addr21,setAddr21]=useState("");
    const [hour1,setHour1]=useState("");
    const [date1,setDate1]=useState("");
    const [vacc1,setVacc1]=useState("");
    const [name1,setName1]=useState("");
    const [idx1,setIdx1]=useState("");

    const [hospitalName2,setHospitalName2]=useState("");
    const [contact2,setContact2]=useState("");
    const [addr12,setAddr12]=useState("");
    const [addr22,setAddr22]=useState("");
    const [hour2,setHour2]=useState("");
    const [date2,setDate2]=useState("");
    const [vacc2,setVacc2]=useState("");
    const [name2,setName2]=useState("");
    const [idx2,setIdx2]=useState("");

    const [number,setNumber]=useState(100);   
    
    useEffect(()=>{
    axios.get("http://localhost:4000/vaccine_info", {params:{RRN: RRN}}).then(({data})=>{
    
    console.log(data);
    
    if(data.result===false){
        setNumber(0);
    }

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
    setIdx1(data[0].Index);
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
    setIdx2(data[1].Index);
    }

    });  
    },[]);
    
    return (
    <Body><Wrap>
        <User><ImgWrap><img src={icon} onClick = {()=>{document.location.href = '/home'}}></img></ImgWrap>
        <Name>{username}님</Name>
        <Btnlogout onClick={()=>logoutHandler()}>로그아웃</Btnlogout>
        </User>
        <TitleWrap><Title>백신 예약 조회 / 취소</Title> </TitleWrap>   
        <MyReservation count={number}
        RRN={RRN}
        string={hospitalName1+'|'+contact1+'|'+addr11+'|'+addr21+
        '|'+hour1+'|'+date1+'|'+vacc1+'|'+name1+'|'+idx1+'|'+
        hospitalName2+'|'+contact2+'|'+addr12+'|'+addr22+'|'+
        hour2+'|'+date2+'|'+vacc2+'|'+name2+'|'+idx2}></MyReservation>
        </Wrap>
    </Body>
    );
};


export default Mypage;