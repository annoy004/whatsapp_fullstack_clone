import { Box, Typography, styled } from '@mui/material';

const Component = styled(Box)`
  display: flex;
  height: 45px;
  padding: 13px 0;
  cursor: pointer;
`;
const Image = styled('img')({
  width: 50,
  height: 50,
  borderRadius: '50%',
  padding: '0 14px',
});
const Container = styled(Box)`
  display: flex;
`;
const GroupName = styled(Typography)`
  font-size: 16px;
  font-weight: 500;
`;

const GroupConversation = ({ group, onSelect }) => {
  return (
    <Component onClick={() => onSelect(group)}>
      <Box>
        <Image src={group.picture || '/default-group.png'} alt="group" />
      </Box>
      <Box style={{ width: '100%' }}>
        <Container>
          <GroupName>{group.name}</GroupName>
        </Container>
        <Box>
          <Typography variant="body2" color="textSecondary">
            {group.lastMessage ? group.lastMessage : 'No messages yet'}
          </Typography>
        </Box>
      </Box>
    </Component>
  );
};

export default GroupConversation;
