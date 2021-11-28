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

const Page1= ({history})=>{
    console.log("this is page1");
    return <Body>Page1<Link to={'/page2'}>Go to Page 2</Link></Body>;
};
export default Page1;