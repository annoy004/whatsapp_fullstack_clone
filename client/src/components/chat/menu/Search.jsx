import { Box , InputBase,styled} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
const Component = styled(Box)`
  background: linear-gradient(135deg, #ffffff, #f8f9fa);
  display: flex;
  border-bottom: 1px solid #e0e0e0;
  height: 55px;
  align-items: center;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
`;

const Wrapper = styled(Box)`
  background-color: #f3f4f6;
  position: relative;
  margin: 0 16px;
  width: 100%;
  border-radius: 25px;
  overflow: hidden;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const Icon = styled(Box)`
  position: absolute;
  height: 100%;
   padding-left: 12px;
  color: #6c757d;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InputField = styled(InputBase)`
  width: 100%;
  padding: 12px 16px 12px 50px;
  height: 20px;
  font-size: 16px;
  color: #495057;
  font-weight: 500;
  border: none;
  outline: none;
  background: transparent;

  &::placeholder {
    color: #adb5bd;
    font-style: italic;
  }
  
  &:focus {
    background: #e9ecef;
    border-radius: 25px;
    outline: 2px solid #74b9ff;
    transition: outline 0.3s ease-in-out, background 0.3s ease-in-out;
  }
`;

const Search = ({setText}) => {
    return (
        <Component>
            <Wrapper>
                <Icon>
                <SearchIcon />
                </Icon>
                <InputField
                placeholder="Search or start a new chat"
                onchange = {(e) => setText(e.target.value)}

                />
                
            </Wrapper>
        </Component>
    )

}
export default Search;
