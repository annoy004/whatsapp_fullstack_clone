import { useContext, useState } from 'react';
import { Box, Typography, styled, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Checkbox, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import { AccountContext } from '../../../context/accountprovider';
import { getUsers } from '../../../services/api';
import axios from 'axios';

const HeaderContainer = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  background: #ededed;
  
  @media (max-width: 768px) {
    padding: 8px 12px;
    min-height: 60px;
  }
`;

const ChatHeader = ({ person, group }) => {
  const { account } = useContext(AccountContext);
  const [editOpen, setEditOpen] = useState(false);
  const [groupName, setGroupName] = useState(group?.name || '');
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState(group?.members || []);
  const [saving, setSaving] = useState(false);

  const openEditDialog = async () => {
    setEditOpen(true);
    const allUsers = await getUsers();
    setUsers(allUsers.filter(u => u.sub !== account.sub));
    setGroupName(group?.name || '');
    setSelected(group?.members || []);
  };

  const handleToggle = (userId) => {
    setSelected(prev => prev.includes(userId) ? prev.filter(id => id !== userId) : [...prev, userId]);
  };

  const handleSave = async () => {
    if (!groupName || selected.length === 0) return;
    setSaving(true);
    try {
      await axios.post(`http://localhost:8000/group/${group._id}/add-members`, {
        userIds: selected.filter(id => !group.members.includes(id)),
      });
      await axios.patch(`http://localhost:8000/group/${group._id}/edit`, {
        name: groupName,
      });
      setEditOpen(false);
    } catch (e) {
      alert('Failed to update group');
    }
    setSaving(false);
  };

  return (
    <HeaderContainer>
      <Box>
        <Typography variant="h6">
          {group ? group.name : person?.name}
        </Typography>
      </Box>
      {group && (
        <Button variant="outlined" size="small" onClick={openEditDialog}>
          Edit Group
        </Button>
      )}
      <Dialog open={editOpen} onClose={() => setEditOpen(false)}>
        <DialogTitle>Edit Group</DialogTitle>
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
          <Button onClick={() => setEditOpen(false)} disabled={saving}>Cancel</Button>
          <Button onClick={handleSave} disabled={saving || !groupName || selected.length === 0} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </HeaderContainer>
  );
};

export default ChatHeader;