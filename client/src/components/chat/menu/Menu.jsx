 //component
 import { useState, useContext } from 'react';
 import { Box, Tabs, Tab } from '@mui/material';
 import Conversations from './Conversations';
 import GroupConversations from './GroupConversations';
 import { AccountContext } from '../../../context/accountprovider';

const Menu = () => {
  const [tab, setTab] = useState(0);
  const { setActiveGroup, setPerson } = useContext(AccountContext);
  const [searchText, setSearchText] = useState('');

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
    setActiveGroup(null); // Reset group selection when switching tabs
    setPerson({}); // Reset person selection when switching tabs
  };

  const handleSelectGroup = (group) => {
    setActiveGroup(group);
    setPerson({});
  };

  return (
    <Box>
      <Tabs value={tab} onChange={handleTabChange} variant="fullWidth">
        <Tab label="Chats" />
        <Tab label="Groups" />
      </Tabs>
      {tab === 0 ? (
        <Conversations text={searchText} />
      ) : (
        <GroupConversations text={searchText} onSelectGroup={handleSelectGroup} />
      )}
    </Box>
  );
};

export default Menu;