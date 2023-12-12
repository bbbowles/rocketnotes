import styled from 'styled-components/native';

export const BackgroundView = styled.View`
    background-color:${props => props.theme.colors.darkest};
    height:100%;
`
export const BigText = styled.Text`
  font-size: 60px;
  color:${props => props.theme.colors.lightest};
  font-weight: 700;
  margin-top: 60%;
  text-align:center;
`;

export const PressableButton = styled.Pressable`
    background-color:${props => props.theme.colors.light};
    border-radius:10px;

`
export const PressableButton2 = styled.Pressable`
    background-color:${props => props.theme.colors.neutral};
    border-radius:10px;
      
`
export const ButtonsView = styled.View`
    max-height:8%;
    width:60%;
    justify-content:space-between;
    margin:0 auto;
    display:flex;
    flex-direction:row;
    flex:1;
`
export const Text = styled.Text`
    font-size:20px;
    font-weight:bold;
    color:white;
    text-align:center;
    line-height:35px;
    padding:10px;

`