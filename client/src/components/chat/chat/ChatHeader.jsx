import {Box, Typography, styled} from '@mui/material';
import { Search,MoreVert } from '@mui/icons-material';

import {defaultProfilePicture} from '../../../constant/data'
import { AccountContext } from '../../../context/accountprovider';
import { useContext } from 'react';
const Header = styled(Box)`
height: 44px;
background: #ededed;
padding:8px 16px;
display :flex;
align-items:center;
`
const Image = styled('img')({
    height : 40,
    width: 40,
    objectFit: 'cover',
    borderRadius: '50%'

});
const Name= styled(Typography)`
margin-left: 12px !important;
`
const Status= styled(Typography)`
margin-left: 12px !important;
font-size: 12px;
color:rgb(0,0,0,0.6); 
`;
const RightContainer = styled(Box)`
margin-left : auto;
& > svg {
    padding :8px;
    font-size:20px;
    color: #000;
}
`
const ChatHeader = ({person}) => {

    const {activeUsers} = useContext(AccountContext);

    return (
        <Header>
            <Image src={person.picture} alt="dp" />
            <Box>
                <Name>{person.name}</Name>
                <Status>{activeUsers?.find(user => user.sub === person.sub) ? 'online':'offline'}</Status>
            </Box>
            <RightContainer>
                {/* yeh svg hi dete hai return main toh agar child property change karni hai right corner ki toh humlog svg karke likhenge */}
            <Search/>
            <MoreVert/> 
            </RightContainer>
            
        </Header>
    )
}

export default ChatHeader;