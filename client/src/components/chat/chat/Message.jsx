import { Box,Typography,styled} from '@mui/material';
import GetAppIcon from '@mui/icons-material/GetApp'
import { useContext } from 'react';
import { AccountContext } from '../../../context/accountprovider';

import { formatDate ,downloadMedia} from '../../../utils/common-utils';
import {iconPDF} from '../../../constant/data.js'

const Own = styled(Box)`
  background: linear-gradient(135deg, #d6b5ff, #b0d7ff);
  max-width: 60%;
  margin-left: auto;
  padding: 10px;
  width: fit-content;
  display: flex;
  border-radius: 20px;
  word-break: break-word;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1);
`;
const Wrapper = styled(Box)`
  background: #ffffff;
  max-width: 60%;
  padding: 10px;
  width: fit-content;
  display: flex;
  border-radius: 20px;
  word-break: break-word;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1);
`;

const Text = styled(Typography)`
  font-size: 14px;
  padding: 0 20px;
`;


const Time = styled(Typography)`
font-size:10px;
color: #919191;
margin-top:6px;
word-break:keep-all;
`

export const Message = ({message}) => {
    const {account} = useContext(AccountContext);

    return (
        <>
           {
            account.sub === message.senderId ?
        <Own>
            {
                message.type ==='file'?<ImageMessage message = {message}/> :<TextMessage message={message}/>
            }
           
         

        </Own>
        :
        <Wrapper>
            
           
            {
                message.type ==='file'?<ImageMessage message = {message}/> :<TextMessage message={message}/>
            }
     </Wrapper>

}
        </>
    )
}
const ImageMessage = ({message}) => {
   
    return (
        <Box style= {{position:'relative'}}>
            {
         message?.text?.includes('.pdf') ?
         <Box style = {{display:'flex'}}>
            <img src={iconPDF} alt="pdf" style={{width: 80}} />
            <Typography style={{fontSize:14}}>{message.text.split('/').pop()}</Typography>
         </Box>
         : <img style={{ width: 300, height: '100%' ,object:'cover'}} src={message.text} alt={message.text} />
            }<Time style={{position: 'absolute' ,bottom:0,right:0}}>
                <GetAppIcon
                onClick={(e) => {downloadMedia(e,message.text)}  }
                style={{marginRight: 10,border:'1px solid gray',borderRadius: '20%' }} fontSize='small'/>
                {formatDate(message.createdAt)}
                </Time>
         </Box>
         
    )
}
const TextMessage = ({message}) => {

    
        return (
          <>
            <Text>{message.text}</Text>
            <Time>{formatDate(message.createdAt)}</Time>
          </>
        );
      
                
}
export default Message;