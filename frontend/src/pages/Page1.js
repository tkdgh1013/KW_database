import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components'
import { Link } from 'react-router-dom';

const Body = styled.div`
    display:flex;
    flex-direction:column;
    font-size:30px;
    color:black;
`

const Title = styled.div`
    display:flex;
    margin:10px 20px;
    text-align:center;
    color:black;
`

const Page1= ({history})=>{
    console.log("this is page1");
    return (
    <Body>
        <Title>백신 접종 예약 시스템</Title>
        Page1
        <Link to={'/page2'}>Go to Page 2</Link>
    </Body>
    );
};


export default Page1;