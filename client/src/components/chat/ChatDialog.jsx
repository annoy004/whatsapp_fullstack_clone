import { useContext, useState, useEffect } from "react";

import { Box, Dialog, styled, useMediaQuery, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { AccountContext } from "../../context/accountprovider";

import Menu from "./menu/Menu";
import EmptyChat from "./chat/EmptyChat";
import ChatBox from "./chat/ChatBox";

const Component = styled(Box)`
display:flex;
height: 100%;
position: relative;
`
const LeftComponent = styled(Box)`
min-width: 300px;
width: 30%;
max-width: 450px;

@media (max-width: 768px) {
    width: 100%;
    min-width: 100%;
    max-width: 100%;
    display: ${props => props.show ? 'block' : 'none'};
}

@media (min-width: 769px) and (max-width: 1024px) {
    width: 35%;
    min-width: 280px;
}
`

const RightComponent = styled(Box)`
width: 70%;
flex: 1;
height: 100%;
border-left: 1px solid rgba(0,0,0,0.14);

@media (max-width: 768px) {
    width: 100%;
    display: ${props => props.show ? 'block' : 'none'};
    border-left: none;
}

@media (min-width: 769px) and (max-width: 1024px) {
    width: 65%;
}
`

const MobileBackButton = styled(IconButton)`
position: absolute;
top: 8px;
left: 8px;
z-index: 1000;
background: white;
box-shadow: 0 2px 4px rgba(0,0,0,0.2);

@media (min-width: 769px) {
    display: none;
}
`

const dialogStyle = {
    height: '96%',
    width: '100%',
    maxWidth: '100%',
    maxHeight: '100%',
    borderRadius: 0,
    boxShadow: 'none',
    overflow: 'hidden',
    '@media (max-width: 768px)': {
        height: '100%',
        width: '100%',
        maxWidth: '100%',
        margin: 0,
    }
}

const ChatDialog = () => {
    const { person, activeGroup, setPerson, setActiveGroup } = useContext(AccountContext);
    const [showMobileMenu, setShowMobileMenu] = useState(true);
    const isMobile = useMediaQuery('(max-width:768px)');

    const handleBackClick = () => {
        setShowMobileMenu(true);
        setPerson({});
        setActiveGroup(null);
    };

    const handleConversationSelect = () => {
        if (isMobile) {
            setShowMobileMenu(false);
        }
    };

    // Update showMobileMenu when person/group changes on mobile
    useEffect(() => {
        if (isMobile && (Object.keys(person).length > 0 || activeGroup)) {
            setShowMobileMenu(false);
        }
    }, [person, activeGroup, isMobile]);

    return (
        <Dialog
            open={true}
            PaperProps={{ sx: dialogStyle }}
            hideBackdrop={true}
            maxWidth={'md'}
        >
            <Component>
                <LeftComponent show={showMobileMenu}>
                    <Menu onSelectConversation={handleConversationSelect} />
                </LeftComponent>
                <RightComponent show={!showMobileMenu || !isMobile}>
                    {isMobile && !showMobileMenu && (
                        <MobileBackButton onClick={handleBackClick}>
                            <ArrowBackIcon />
                        </MobileBackButton>
                    )}
                    {(Object.keys(person).length || activeGroup) ? <ChatBox /> : <EmptyChat />}
                </RightComponent>
            </Component>
        </Dialog>
    )
}

export default ChatDialog;