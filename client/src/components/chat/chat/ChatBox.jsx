import { useContext, useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { AccountContext } from '../../../context/accountprovider';
import { getConversation } from '../../../services/api';
import ChatHeader from './ChatHeader';
import Messages from './Messages';

const ChatBox = () => {
    const { person, account, activeGroup } = useContext(AccountContext);
    const [conversation, setConversation] = useState({});

    useEffect(() => {
        if (!activeGroup && person?.sub) {
            const getConversationDetails = async () => {
                let data = await getConversation({ senderId: account.sub, receiverId: person.sub });
                setConversation(data);
            };
            getConversationDetails();
        }
    }, [person?.sub, activeGroup]);

    return (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <ChatHeader person={person} group={activeGroup} />
            <Messages
                person={person}
                conversation={conversation}
                group={activeGroup}
            />
        </Box>
    );
};

export default ChatBox;