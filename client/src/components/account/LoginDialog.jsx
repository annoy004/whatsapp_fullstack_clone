import { useContext } from "react";
import { AccountContext } from "../../context/accountprovider.jsx";
import {
  Dialog,
  Box,
  Typography,
  List,
  ListItem,
  styled,
} from "@mui/material";
import { qrCodeImage } from "../../constant/data.js";
import { addUser } from "../../services/api";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const Component = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 50px 60px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.35);
  backdrop-filter: blur(12px);
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.15);
  gap: 40px;
  width: 80%;
  max-width: 1100px;
  margin: auto;
  animation: fadeIn 0.6s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 1024px) {
    width: 90%;
    padding: 40px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 30px 20px;
    width: 95%;
  }

  @media (max-width: 480px) {
    padding: 20px 15px;
  }
`;

const Container = styled(Box)`
  flex: 1;
  color: #000;
  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const Title = styled(Typography)`
  font-size: 32px;
  font-weight: 700;
  color: #000;
  margin-bottom: 16px;

  @media (max-width: 768px) {
    font-size: 26px;
  }

  @media (max-width: 480px) {
    font-size: 22px;
  }
`;

const SubTitle = styled(Typography)`
  font-size: 17px;
  color: #000;
  margin-bottom: 32px;

  @media (max-width: 768px) {
    font-size: 15px;
  }
`;

const StyledList = styled(List)`
  color: #000;
  & > li {
    margin-top: 12px;
    font-size: 17px;

    @media (max-width: 768px) {
      font-size: 15px;
    }
  }
`;

const QRCodeContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
`;

const QRCode = styled("img")({
  height: 300,
  width: 300,
  borderRadius: "16px",
  border: "3px solid rgba(160,180,255,0.6)",
  padding: "10px",
  boxShadow: "0 0 20px rgba(160, 180, 255, 0.4)",
  "@media (max-width: 768px)": {
    height: 220,
    width: 220,
  },
  "@media (max-width: 480px)": {
    height: 180,
    width: 180,
  },
});

const GoogleLoginContainer = styled(Box)`
  margin-top: 24px;
  display: flex;
  justify-content: center;
`;

const LoginDialog = () => {
  const { setAccount } = useContext(AccountContext);

  const onLoginSuccess = async (res) => {
    const decode = jwtDecode(res.credential);
    setAccount(decode);
    await addUser(decode);
  };

  const onLoginError = (res) => {
    console.log(res);
  };

  const dialogStyle = {
    height: "100%",
    width: "100%",
    maxWidth: "100%",
    maxHeight: "100%",
    boxShadow: "none",
    borderRadius: "0",
    background: "transparent",
  };

  return (
    <Dialog open={true} PaperProps={{ sx: dialogStyle }} hideBackdrop={true}>
      <Box
        sx={{
          height: "100vh",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "transparent",
        }}
      >
        <Component>
          <Container>
            <Title>Log in to your account</Title>
            <SubTitle>Quickly connect and sync across your devices</SubTitle>
            <StyledList>
              <ListItem>1. Open the app on your phone</ListItem>
              <ListItem>
                2. Tap <b>Settings</b> → <b>Linked Devices</b>
              </ListItem>
              <ListItem>3. Scan the QR code shown on this screen</ListItem>
            </StyledList>
          </Container>

          <QRCodeContainer>
            <QRCode src={qrCodeImage} alt="QR code" />
            <GoogleLoginContainer>
              <GoogleLogin onSuccess={onLoginSuccess} onError={onLoginError} />
            </GoogleLoginContainer>
          </QRCodeContainer>
        </Component>
      </Box>
    </Dialog>
  );
};

export default LoginDialog;
