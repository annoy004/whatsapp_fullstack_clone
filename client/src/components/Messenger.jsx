 import {AppBar,Toolbar,styled,Box} from '@mui/material'
 import { useContext } from 'react';
 import { AccountContext } from '../context/accountprovider';
 import LoginDialog from "./account/LoginDialog";
 import ChatDialog from './chat/ChatDialog';


 const Component =styled(Box)`
 height : 100vh;
 background:  #DCDCDC;
 `
//if we are handling css in string then we have to write in proper css with hyphen in in object camel casing are followed
 const LoginHeader = styled(AppBar)`
 height : 220px;
 background-color:#00bfa5;
 box-shadow:none;
 `
 const Header = styled(AppBar)`
 height : 125px;
 background-color:#00A884;
 box-shadow:none;
 `
 
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