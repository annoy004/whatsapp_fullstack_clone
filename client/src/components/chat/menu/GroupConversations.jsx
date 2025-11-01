import { useEffect, useState, useContext } from 'react';
import GroupConversation from './GroupConversation';
import { Box, styled, Divider, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Checkbox, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import { AccountContext } from '../../../context/accountprovider';
import { getGroups, getUsers } from '../../../services/api';
import axios from 'axios';

const Component = styled(Box)`
  height: 80vh;
  overflow: overlay;
  
  @media (max-width: 768px) {
    height: calc(100vh - 94px);
  }
  
  @media (min-width: 769px) and (max-width: 1024px) {
    height: 75vh;
  }
`;
const StyledDivider = styled(Divider)`
  margin: 0 0 0 70px;
  background-color: #e9edef;
  opacity: 0.6;
  
  @media (max-width: 768px) {
    margin: 0 0 0 60px;
  }
`;
const TopBar = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px 0 16px;
  
  @media (max-width: 768px) {
    padding: 8px 12px 0 12px;
  }
`;

const GroupConversations = ({ text, onSelectGroup }) => {
  const [groups, setGroups] = useState([]);
  const { account } = useContext(AccountContext);
  const [showCreate, setShowCreate] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState([]);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    const fetchGroups = async () => {
      let response = await getGroups(account.sub);
      const filtered = response.filter(group => group.name.toLowerCase().includes(text.toLowerCase()));
      setGroups(filtered);
    };
    fetchGroups();
  }, [text, showCreate, account.sub]);

  const openCreateDialog = async () => {
    setShowCreate(true);
    // Fetch users for member selection
    const allUsers = await getUsers();
    setUsers(allUsers.filter(u => u.sub !== account.sub));
  };

  const handleToggle = (userId) => {
    setSelected(prev => prev.includes(userId) ? prev.filter(id => id !== userId) : [...prev, userId]);
  };

  const handleCreate = async () => {
    if (!groupName || selected.length === 0) return;
    setCreating(true);
    try {
      await axios.post('http://localhost:8000/group/create', {
        name: groupName,
        creatorId: account.sub,
        memberIds: selected
      });
      setShowCreate(false);
      setGroupName('');
      setSelected([]);
    } catch (e) {
      alert('Failed to create group');
    }
    setCreating(false);
  };

  return (
    <Component>
      <TopBar>
        <span>Groups</span>
        <Button variant="contained" size="small" onClick={openCreateDialog}>
          + Add Group
        </Button>
      </TopBar>
      {groups.map(group => (
        <>
          <GroupConversation key={group._id} group={group} onSelect={onSelectGroup} />
          <StyledDivider />
        </>
      ))}
      <Dialog open={showCreate} onClose={() => setShowCreate(false)}>
        <DialogTitle>Create Group</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Group Name"
            fullWidth
            value={groupName}
            onChange={e => setGroupName(e.target.value)}
          />
          <List>
            {users.map(user => (
              <ListItem key={user.sub} button onClick={() => handleToggle(user.sub)}>
                <ListItemIcon>
                  <Checkbox checked={selected.includes(user.sub)} />
                </ListItemIcon>
                <ListItemText primary={user.name} />
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowCreate(false)} disabled={creating}>Cancel</Button>
          <Button onClick={handleCreate} disabled={creating || !groupName || selected.length === 0} variant="contained">Create</Button>
        </DialogActions>
      </Dialog>
    </Component>
  );
};

export default GroupConversations;
