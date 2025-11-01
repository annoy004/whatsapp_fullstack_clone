import {useContext,useEffect,useState} from 'react';
import {Box,Typography,styled} from '@mui/material';
import { AccountContext } from '../../../context/accountprovider';
import { setConversation,getConversation } from '../../../services/api';
import {formatDate} from '../../../utils/common-utils.js'
const Component =styled(Box)`
display:flex;
height: 45px;
padding:13px 0;
cursor: pointer;

@media (max-width: 768px) {
    padding: 10px 0;
    height: 50px;
}
`;
const Image = styled('img')({
    width:50,
    height:50,
    borderRadius:'50%',
    padding : '0 14px',
    
    '@media (max-width: 768px)': {
        width: 45,
        height: 45,
        padding: '0 12px'
    }
})

const Container = styled(Box)`
display:flex;
`

const Timestamp = styled(Typography)`
font-size:12px;
margin-left:auto;
color: #000000;
margin-right: 20px;
`

const Text = styled(Typography)`
font-size:14px;
color: rgbs(0,0,0,0.6);
`
const Conversation =({user, onSelectConversation}) => {
    const {setPerson ,account,newMessageFlag} = useContext(AccountContext);

    const [message,setMessage] = useState({});

    useEffect(() => {
        const getConversationMessage = async() => {
            const data = await getConversation({ senderId: account.sub, receiverId: user.sub });
            console.log(data);
            setMessage({ text: data?.message, timestamp: data?.updatedAt });
        }
        getConversationMessage();
    },[newMessageFlag])

    const getUsers =  async () => {
            setPerson(user);
        await setConversation ({senderId:account.sub, receiverId:user.sub});
        // Trigger conversation selection callback for mobile navigation
        if (onSelectConversation) {
            onSelectConversation();
        }
    }
    return (
        <Component onClick={() => getUsers()}>
            <Box>
                <Image src={user.picture} alt="dp" />
            </Box>
            <Box style= {{width : '100%'}}>
            <Container>
                <Typography>{user.name}</Typography>
                {
                    message?.text && 
                    <Timestamp>{  formatDate(message?.timestamp)}</Timestamp>
                }
            </Container>
            <Box>
                <Text>{message?.text?.includes('localhost') ? 'media': message.text}</Text>
            </Box>
            </Box>
        </Component>
        )
}

export default Conversation;