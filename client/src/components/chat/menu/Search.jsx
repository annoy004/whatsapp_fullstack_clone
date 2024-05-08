import { Box , InputBase,styled} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

const Component = styled(Box)`
background:#fff;
display:flex;
border-bottom: 1px solid #F2F2F2;
height:45px;
align-items:center;

`;

const Wrapper =styled(Box)`
background-color: #f0f2f5;
position:relative;
margin : 0 13px;
width:100%;
`;

const Icon = styled(Box)`
position:absolute;
height :100%;
padding:12px;
color: #919191;

`

const InputField = styled(InputBase)`
width : 100%;
padding : 16px;
height:15px;
font-size:14px;
padding-left:65px;
`
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
