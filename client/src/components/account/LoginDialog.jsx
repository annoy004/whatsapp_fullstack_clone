
import { useContext } from "react";
import { AccountContext } from "../../context/accountprovider.jsx";
import { Dialog , Box,Typography,List ,ListItem,styled} from "@mui/material";
import {qrCodeImage} from "../../constant/data.js";
import {addUser} from '../../services/api'
import {GoogleLogin} from '@react-oauth/google'
import { jwtDecode } from "jwt-decode";

const Component = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  background-color: #f8f9fa;
  border-radius: 12px;
`;

const StyledList = styled(List)`
  & > li {
    padding: 0;
    margin-top: 15px;
    font-size: 18px;
    line-height: 28px;
    color: #4a4a4a;
    overflow: hidden;
  }
`;

const Container = styled(Box)`
  padding: 48px;
  max-width: 400px;
`;

const QRCode = styled("img")({
  height: 264,
  width: 264,
  margin: "0 auto",
  display: "block",
});

const Title = styled(Typography)`
  font-size: 28px;
  font-weight: bold;
  color: #202124;
  margin-bottom: 16px;
`;

const SubTitle = styled(Typography)`
  font-size: 16px;
  color: #5f6368;
  margin-bottom: 32px;
`;

const dialogStyle = {
  height: "96%",
  marginTop: "12%",
  width: "60%",
  maxWidth: "100%",
  maxHeight: "100%",
  boxShadow: "none",
  overflow: "hidden",
  borderRadius: "16px",
};


const LoginDialog = () => {
    const {setAccount } =useContext(AccountContext);
    const onLoginSuccess= async (res) => {
        const decode  = jwtDecode(res.credential);
        setAccount(decode);
         await addUser(decode);
    }
    
    const onLoginError= (res) => {
        console.log(res);
    
    }
    return (
        <Dialog
        open={true}
        PaperProps={{sx : dialogStyle}}
        hideBackdrop={true}
        >
            <Component>
                
                    <Container>
                       
                    <Title>to use your whatsapp on your computer:</Title>
                    <StyledList>
                        <ListItem>1. Open whatsapp on your phone</ListItem>
                        <ListItem>2.Tap Menu setings and select whatsapp web</ListItem>
                        <ListItem>3. point your phone to this screen to capture the code</ListItem>
                    </StyledList>
                    </Container>
                
                <Box style = {{position : 'relative'}}>
                    <QRCode src={qrCodeImage} alt=" qr code" />
                    <Box  style = {{position :'absolute' ,top : '50%' ,transform: 'translateX(25%)'}}>
                        <GoogleLogin
                        onSuccess={onLoginSuccess}
                        onError={onLoginError}/>
                    </Box>
                </Box>
            </Component>
        </Dialog>
    )
};

export default LoginDialog;