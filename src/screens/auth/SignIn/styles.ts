import { Pressable } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  /* background: rgb(2,0,36);
  background: linear-gradient(322deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%);  */
  align-items: center;
  justify-content: center;
`;
export const ContainerImage = styled.ImageBackground`
  flex: 1;
  /* background: rgb(2,0,36);
  background: linear-gradient(322deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%);  */
  align-items: center;
  justify-content: center;
`;
export const BigText = styled.Text`
  font-size: 60px;
  color:${props => props.theme.colors.lightest};
  font-weight: 700;
  position:relative;
  bottom:80px;
  text-align:center;
`;

export const LoginInput = styled.TextInput`
    background-color:white;
    width:80%;
    margin-top:4px;
    margin-bottom:4px;
    border-radius:10px;
    font-size:20px;
    color:#C7C7C7;
`

// export const LoginButton = styled.Button`
//     width:80%;
//     color:black;
//     background-color:red;
// `

export const LoginButton = styled.Pressable`
  background-color:${props => props.theme.colors.neutral};
  width:40%;
  border-radius:5px;
`
export const TextButton = styled.Text`
  font-size:22px;
  color:white;
  font-weight:bold;
  text-align:center;
  line-height:36px;
`