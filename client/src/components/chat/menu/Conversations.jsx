import {useEffect ,useState,useContext} from 'react';
import Conversation from './Conversation';
import { getUsers } from '../../../services/api';
import {Box,styled,Divider} from "@mui/material";
import { AccountContext } from '../../../context/accountprovider';

const Conversations = ({text})=>{

    const [users,setUsers] = useState([]);
    const {account,socket ,setActiveUsers} = useContext(AccountContext);
    useEffect(() => {
        const fetchData =async() => {
            let response = await getUsers();
            const filteredData = response.filter( user => user.name.toLowerCase().includes(text.toLowerCase()));
            setUsers(filteredData);
            console.log(response);
            
        }
        fetchData();
    }, [text] );
    useEffect(() => {
        socket.current.emit('addUsers', account);
        socket.current.on("getUsers", users => {
            setActiveUsers(users);
        });
    }, [account]);

    const Component= styled(Box)`
    height : 80vh; 
    overflow: overlay;
    
    `
    const StyledDivider = styled(Divider)`
    margin : 0 0 0 70px;
    background-color: #e9edef;
    opacity: 0.6;
    `
  
    return (
     <Component>
        {
           users.map(user => {
               
               return(  user.sub !== account.sub  &&

                <>
                <Conversation user = {user} />
                <StyledDivider/>
                </>
                )
            })
        }
     </Component>

    )
}
export default Conversations;