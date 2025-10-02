import { createContext , useState,useRef,useEffect} from "react";

import {io} from 'socket.io-client';

export const AccountContext = createContext(null);





const AccountProvider =({children}) => {
    const [account , setAccount] = useState();
    const [person ,setPerson] =useState({});
    const [activeUsers,setActiveUsers] = useState([]);
    const [newMessageFlag, setNewMessageFlag] = useState(false);
    const [activeGroup, setActiveGroup] = useState(null);

    const socket = useRef();

    useEffect(() => {
        socket.current=io(process.env.REACT_APP_SOCKET_URL || 'https://socketing.onrender.com')
    },[])
    

    return (
        <AccountContext.Provider value ={{
            account , setAccount,person,setPerson,socket,
            activeUsers,setActiveUsers,newMessageFlag,setNewMessageFlag,
            activeGroup, setActiveGroup
        }}>
            {children}
        </AccountContext.Provider>
    )
}

export default AccountProvider;