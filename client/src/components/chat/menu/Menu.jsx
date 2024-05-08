 //component
 import Header from "./Header";
 import { useState } from "react";
 import {Box} from "@mui/material";
 import Search from "./Search";
 import Conversations from './Conversations';
  const Menu =() => {
    const [text,setText] = useState('');
    console.log(text)

    return (
        <Box>
            <Header/>
            <Search setText = {setText}/>
            <Conversations text ={text}/>
        </Box>
    )
    }

    export default Menu;