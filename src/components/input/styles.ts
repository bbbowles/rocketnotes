import styled from 'styled-components/native';

export const LoginInput = styled.TextInput`
    background-color:${props => props.theme.colors.dark};
    width:80%;
    margin-top:4px;
    margin-bottom:4px;
    border-radius:10px;
    font-size:20px;
    color:${props => props.theme.colors.lightest};
    border:2px solid rgba(0,0,0,0.2)
`