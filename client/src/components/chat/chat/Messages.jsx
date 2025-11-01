import { useContext, useState, useEffect, useRef } from 'react';
import { Box, styled } from '@mui/material';
import { AccountContext } from './../../../context/accountprovider';
import Footer from './Footer';
import Message from './Message';
import { getMessages, newMessage, getGroupMessages } from '../../../services/api';
const Wrapper = styled(Box)`
    background-image: url(${'https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png'});
    background-size: 50%;
    display: flex;
    flex-direction: column;
    height: 100%;
    
    @media (max-width: 768px) {
        background-size: 70%;
        height: calc(100vh - 125px);
    }
`;
const Component = styled(Box)`
    height: 80vh;
    overflow-y: scroll;
    flex: 1;
    
    @media (max-width: 768px) {
        height: calc(100vh - 180px);
    }
    
    @media (min-width: 769px) and (max-width: 1024px) {
        height: 75vh;
    }
`;
const Container = styled(Box)`
    padding: 1px 80px;
    
    @media (max-width: 768px) {
        padding: 1px 15px;
    }
    
    @media (min-width: 769px) and (max-width: 1024px) {
        padding: 1px 40px;
    }
`;

const Messages = ({ person, conversation, group }) => {
    const [messages, setMessages] = useState([]);
    const [incomingMessage, setIncomingMessage] = useState(null);
    const [value, setValue] = useState();
    const [file, setFile] = useState();
    const [image, setImage] = useState();
    const scrollRef = useRef();
    const { account, socket, newMessageFlag, setNewMessageFlag } = useContext(AccountContext);

    // Join group room if group is active
    useEffect(() => {
        if (group && group._id) {
            socket.current.emit('joinGroup', { groupId: group._id });
        }
    }, [group]);

    useEffect(() => {
        socket.current.on('getMessage', data => {
            setIncomingMessage({
                ...data,
                createdAt: Date.now()
            });
        });
    }, []);

    useEffect(() => {
        const getMessageDetails = async () => {
            if (group && group._id) {
                let data = await getGroupMessages(group._id, account.sub);
                setMessages(data);
            } else if (conversation?._id) {
                let data = await getMessages(conversation._id);
                setMessages(data);
            }
        };
        getMessageDetails();
    }, [conversation?._id, person?._id, group?._id, newMessageFlag]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ transition: "smooth" });
    }, [messages]);

    useEffect(() => {
        if (incomingMessage) {
            if (group && group._id && incomingMessage.groupId === group._id) {
                setMessages(prev => [...prev, incomingMessage]);
            } else if (
                !group &&
                conversation?.members?.includes(incomingMessage.senderId)
            ) {
                setMessages(prev => [...prev, incomingMessage]);
            }
        }
    }, [incomingMessage, conversation, group]);

    const receiverId = conversation?.members?.find(member => member !== account.sub);

    const sendText = async (e) => {
        let code = e.keyCode || e.which;
        if (!value) return;
        if (code === 13) {
            let message = {};
            if (group && group._id) {
                message = {
                    senderId: account.sub,
                    senderName: account.name,
                    groupId: group._id,
                    isGroup: true,
                    type: file ? 'file' : 'text',
                    text: file ? image : value
                };
            } else if (!file) {
                message = {
                    senderId: account.sub,
                    receiverId: receiverId,
                    conversationId: conversation._id,
                    type: 'text',
                    text: value
                };
            } else {
                message = {
                    senderId: account.sub,
                    conversationId: conversation._id,
                    receiverId: receiverId,
                    type: 'file',
                    text: image
                };
            }
            socket.current.emit('sendMessage', message);
            await newMessage(message);
            // Optimistically add the message so the sender sees it immediately
            setMessages(prev => [...prev, { ...message, createdAt: Date.now() }]);
            setValue('');
            setFile();
            setImage('');
            setNewMessageFlag(prev => !prev);
        }
    };

    return (
        <Wrapper>
            <Component>
                {messages && messages.map((message, idx) => (
                    <Container ref={scrollRef} key={message._id || idx}>
                        <Message message={message} isGroup={!!group} />
                    </Container>
                ))}
            </Component>
            <Footer
                sendText={sendText}
                value={value}
                setValue={setValue}
                setFile={setFile}
                file={file}
                setImage={setImage}
            />
        </Wrapper>
    );
};

export default Messages;