import React, { useState,useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components'

const Body = styled.div`
    display:flex;
`

const Page2= ({history})=>{
    //use State? [var, set var]
    //if use set var function, it refresh all of UI in this page
    const [res, setRes] = useState();

    //front request to backend
    useEffect(()=>{
        axios.get('http://localhost:4000/testUser',{params:{sibal:'윤상호'}}).then(({data})=>{setRes(data[0])});   console.log("this is page1");
    },[])

    //print result from requst to backend
    console.log(res);

    return <Body>Page2 {res!==undefined?res.name+"은 병신이다.":null} </Body>;
};
export default Page2;