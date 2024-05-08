import {useContext} from 'react';
import { Box,styled ,Typography}      from "@mui/material";
import { AccountContext } from '../../context/accountprovider';

const ImageContainer = styled(Box)`
display:flex;
justify-content:center;`;

const Image = styled(`img`) ({
    width: 200,
    height: 200,
    borderRadius:'50%',
    padding:'25px 0'
})
const BoxWrapper = styled(Box)`
background : #FFFFFF;
padding : 12px 30px 2px;
box-shadow:0px 1px 3px rgba(0,0,0,0.08);
& : first-child {
    font-size:13px;
    color: #009688;
    font-weight:200;
}
& :last-child{
    margin:14px;
}`

const DescriptionContainer = styled(Box)`
padding : 15px 20px 20px 30px;
& > p {
    font-size:13px;
    color:#8696ao;

}
`

const Profile = () => {
    const {account} = useContext(AccountContext);
    return(
       <>
       <ImageContainer>
        <Image src={account.picture} alt="dp" />
       </ImageContainer>
       <BoxWrapper>
        <Typography>Your name</Typography>
        <Typography>{account.name}</Typography>
       </BoxWrapper>
       
       <DescriptionContainer>
       <Typography>This is not your user name or pin.this name will be visible to your whatspp context</Typography>
       </DescriptionContainer>
       <BoxWrapper>
       <Typography>About</Typography>
       <Typography>Eat! Sleep! Code! repeat!</Typography>
       </BoxWrapper>
       </>

    )
}

export default Profile;