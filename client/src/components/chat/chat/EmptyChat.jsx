import { Box, Typography, styled, Divider } from "@mui/material";

const Component = styled(Box)`
  background: #f8f9fa;
  padding: 0;
  text-align: center;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    height: calc(100vh - 125px);
    padding: 20px 10px;
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    height: 93vh;
  }
`;

const Container = styled(Box)`
  padding: 0 157px;
  max-width: 100%;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 0 20px;
    width: 100%;
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    padding: 0 80px;
  }
`;

const Image = styled("img")({
  width: 400,
  marginTop: 10,
  maxWidth: "100%",
  opacity: 0.6, // 👈 reduced transparency

  "@media (max-width: 768px)": {
    width: "80%",
    maxWidth: 300,
  },

  "@media (min-width: 769px) and (max-width: 1024px)": {
    width: 320,
  },
});

const Title = styled(Typography)`
  font-size: 32px;
  font-weight: 800;
  margin: 25px 0 10px 0;
  font-family: inherit;
  color: #2f3e46;

  @media (max-width: 768px) {
    font-size: 24px;
    margin: 15px 0 8px 0;
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    font-size: 28px;
  }
`;

const SubTitle = styled(Typography)`
  font-size: 15px;
  color: #546e7a;
  font-weight: 400;
  font-family: inherit;
  margin: 5px 0;

  @media (max-width: 768px) {
    font-size: 13px;
    margin: 4px 0;
  }
`;

const StyledDivider = styled(Divider)`
  margin: 30px 0 0 0;
  opacity: 0.6;
`;

const EmptyChat = () => {
  return (
    <Component>
      <Container>
        <Image
          src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExbmw1b21jYXV4NTUwczNxMjFla3pkMDRud3VobDVmejAwNTVoNjkxciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/9SJaONs482vvfqp3z9/giphy.gif"
          alt=""
        />
        <Title>Welcome to Your Chat Space</Title>
        <SubTitle>
          Start a new conversation or continue where you left off.
        </SubTitle>
        <SubTitle>
          Stay connected seamlessly across all your devices.
        </SubTitle>
        <StyledDivider>let’s start chatting</StyledDivider>
      </Container>
    </Component>
  );
};

export default EmptyChat;
