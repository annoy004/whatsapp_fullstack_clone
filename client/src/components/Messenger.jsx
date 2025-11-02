 import {AppBar,Toolbar,styled,Box} from '@mui/material'
 import { useContext } from 'react';
 import { AccountContext } from '../context/accountprovider';
 import LoginDialog from "./account/LoginDialog";
 import ChatDialog from './chat/ChatDialog';


const Component = styled(Box)`
height: 100vh;
background: linear-gradient(135deg, #f3e7fe, #e2ecfe);
display: flex;
justify-content: center;
align-items: center;
overflow: hidden;

@media (max-width: 768px) {
    height: 100vh;
    overflow: auto;
}
`;

const LoginHeader = styled(AppBar)`
 height: 220px;
 background: linear-gradient(135deg, #7b5cfa, #4c9ffe);
 box-shadow: none;
 border-bottom: 3px solid #3a89fe;
 display: flex;
 align-items: center;
 justify-content: center;
 font-family: 'Roboto', sans-serif;
 color: white;
 text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
 
 @media (max-width: 768px) {
    height: 150px;
 }
`;

const Header = styled(AppBar)`
 height: 125px;
 background: linear-gradient(135deg, #756cfd, #6fa8fe);
 box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.15);
 display: flex;
 align-items: center;
 justify-content: space-between;
 padding: 0 16px;
 border-bottom: 3px solid #547bfe;
 transition: transform 0.3s ease-in-out, background-color 0.3s ease-in-out;

 &:hover {
   transform: translateY(-2px);
   background: linear-gradient(135deg, #6a63fc, #609cfb);
 }
 
 @media (max-width: 768px) {
    height: 60px;
    padding: 0 8px;
 }
`;

const StyledToolbar = styled(Toolbar)`
 display: flex;
 justify-content: space-between;
 align-items: center;

 & > div {
   flex: 1;
   display: flex;
   justify-content: center;
 }

 button {
   background-color: #ffffff;
   color: #756cfd;
   padding: 10px 20px;
   border-radius: 25px;
   border: 2px solid #756cfd;
   font-weight: bold;
   transition: all 0.3s ease-in-out;
   box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);

   &:hover {
     background: linear-gradient(135deg, #756cfd, #6fa8fe);
     color: white;
     box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2);
   }
 }
`;

// Styling for a gradient overlay effect in LoginDialog or ChatDialog
const DialogOverlay = styled(Box)`
 width: 100%;
 height: 100%;
 background: linear-gradient(135deg, rgba(123, 92, 250, 0.2), rgba(76, 159, 254, 0.2));
 position: absolute;
 top: 0;
 left: 0;
 z-index: -1;
 pointer-events: none;
`;

 
 const Messenger = () => {
    const {account} = useContext(AccountContext);
    return (
        <Component > {
            account ? <>
            <Header>
            <Toolbar>

            </Toolbar>
        </Header>
      
             <ChatDialog/>
            </>
            
            :
            <>
        <LoginHeader>
            <Toolbar>

            </Toolbar>
        </LoginHeader>
        <LoginDialog/>

        </> }
        </Component>
    )
 }

 export default Messenger;