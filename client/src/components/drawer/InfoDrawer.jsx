
import {Drawer,Box,Typography,styled} from '@mui/material'; 
import { ArrowBack } from '@mui/icons-material';

// component
import Profile from './Profile';

const Header = styled(Box)`
background :#008069;
height:107px;
color: #FFFFFF;
display:flex;
& > svg , & >P {
  margin-top:auto;
  padding:15px;
  font-weight:600;
}
`
const Text = styled(Typography)`
font-size:18px;`

const Component = styled(Box)`
background: #ededed;
height : 85%;

`

const drawerStyle = {
    left:31,
    top:12,
    height:'95%',
    width:'35%',
    boxShadow:'none'
}

const InfoDrawer = ({open, setOpen}) => { 

  const handleClose =() => {
    setOpen(false);
  }
    return (
        <Drawer
        open = {open}
        onClose={handleClose}
        PaperProps ={{sx:drawerStyle}}
        style={{zIndex:1800}}
        > 
        <Header>
            <ArrowBack onClick={() => setOpen(false)}/>
            <Text>Profile</Text>
        </Header>
        <Component>
          <Profile/>
        </Component>

        </Drawer>
    )
}

export default InfoDrawer;