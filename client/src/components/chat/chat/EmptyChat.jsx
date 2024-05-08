import { Box, Typography ,styled ,Divider} from "@mui/material";
import { emptyChatImage } from "../../../constant/data";


const Component = styled(Box)`
background: #f8f9fa;
padding: 0px 0;
text-align:center;
height : 93vh;
`

const Container = styled(Box)`
padding:0 157px;

`

const Image = styled('img') ({
   width : 400,
    marginTop:10,
    
})

const Title = styled(Typography)`
font-size: 32px;
font-weight: 400;

margin:25px 0 10px 0;
font-family: inherit;
color : #41525d

`

const SubTitle = styled(Typography)`
font-size:14px;
color : #667781;
font-weight: 400;
font-family: inherit;
`

const StyledDivider = styled(Divider)`
margin: 30px 0 0 0 ;
opacity:0.6;
`
 const EmptyChat =() => {
    return (
        
   <Component>
    <Container>
        <Image src={emptyChatImage} alt="" />
        <Title>WhatsApp Web</Title>
        <SubTitle>Now send and recieve message without keeping your phone online.</SubTitle>
        <SubTitle>Use whatsapp on  up to 4 linked devices and 1 phone at same time. </SubTitle>
        <StyledDivider>not real but like real</StyledDivider>
    </Container>
   </Component>
   

    )
 }

 export default EmptyChat;