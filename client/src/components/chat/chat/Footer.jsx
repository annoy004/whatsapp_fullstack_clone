import { useEffect } from "react";
import { Box, InputBase, styled, IconButton } from "@mui/material";
import { EmojiEmotionsOutlined, AttachFile, Mic, Send } from "@mui/icons-material";
import { uploadFile } from "./../../../services/api.js";

const Container = styled(Box)`
  height: 55px;
  background: #ededed;
  display: flex;
  width: 100%;
  align-items: center;
  padding: 0 15px;
  box-sizing: border-box;

  & > * {
    margin: 5px;
    color: #919191;
  }

  @media (max-width: 768px) {
    padding: 0 8px;
    height: 60px;
    width: 100%;
  }
`;

const Search = styled(Box)`
  background-color: #ffffff;
  border-radius: 18px;
  flex: 1;
  width: calc(100% - 140px);

  @media (max-width: 768px) {
    width: calc(100% - 120px);
  }
`;

const ClipIcon = styled(AttachFile)`
  transform: rotate(400deg);
  cursor: pointer;
`;

const SendButton = styled(IconButton)`
    background: linear-gradient(135deg, #9641ffff, #3499ffff) !important;
  color: white !important;
  padding: 8px;
  margin-left: 5px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #004e54 !important;
  }

  @media (max-width: 768px) {
    padding: 6px;
    min-width: 36px;
    min-height: 36px;
  }

  & svg {
    transform: rotate(-45deg);
  }
`;

const MicIcon = styled(Mic)`
  cursor: pointer;
`;

const Footer = ({ sendText, setValue, value, file, setFile, setImage }) => {
  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);

        let response = await uploadFile(data);
        setImage(response.data);
      }
    };
    getImage();
  }, [file]);

  const onfileChange = (e) => {
    setFile(e.target.files[0]);
    setValue(e.target.files[0].name);
  };

  const handleSend = () => {
    if ((value && value.trim()) || file) {
      const syntheticEvent = {
        keyCode: 13,
        which: 13,
        preventDefault: () => {},
      };
      sendText(syntheticEvent);
    }
  };

  const hasText = (value && value.trim().length > 0) || file;

  return (
    <Container>
      <EmojiEmotionsOutlined style={{ cursor: "pointer" }} />
      <label htmlFor="fileInput" style={{ cursor: "pointer" }}>
        <ClipIcon />
      </label>
      <input
        type="file"
        id="fileInput"
        style={{ display: "none" }}
        onChange={(e) => onfileChange(e)}
      />

      <Search>
        <InputBase
          placeholder="Type a message"
          onChange={(e) => setValue(e.target.value)}
          onKeyPress={(e) => sendText(e)}
          value={value || ""}
        />
      </Search>

      {hasText ? (
        <SendButton onClick={handleSend}>
          <Send />
        </SendButton>
      ) : (
        <MicIcon />
      )}
    </Container>
  );
};

export default Footer;
