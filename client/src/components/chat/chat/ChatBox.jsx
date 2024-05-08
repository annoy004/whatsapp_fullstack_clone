import { useContext,useEffect ,useState} from 'react';
import {Box} from '@mui/material';
import  { AccountContext } from '../../../context/accountprovider';
import { getConversation } from '../../../services/api';

import ChatHeader from './ChatHeader';
import Messages from './Messages';
const ChatBox = () =>  {
    const {person,account} = useContext(AccountContext);

    const [conversation,setConversation] = useState({});
    
    useEffect(() => {
        const getConversationDetails = async () => {
          let data =  await getConversation ({senderId:account.sub, receiverId:person.sub});
          console.log(data +"helloguys");
          setConversation(data);
        }
        
        getConversationDetails();      
    }, [person.sub])
    return (
        <Box>
        <ChatHeader person = {person}/>
        <Messages person = {person} conversation = {conversation} />
        </Box>
    )
}
export default ChatBox;