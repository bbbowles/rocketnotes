import styled from 'styled-components/native';

export const BackgroundView = styled.View`
    background-color:${props => props.theme.colors.darkest};
`
export const FooterView = styled.View`
    background-color:red;
    display:flex;
    flex-direction:row;
    position:sticky;
    justify-content:space-evenly;
    /* height:200px; */
    /* top:95%; */
    bottom:0;
`

export const CenteredView = styled.View`
    /* background-color:${props => props.theme.colors.darkest}; */
    flex:1;
    justify-content:center;
    align-items:center;
`

export const ModalView = styled.View`
    width:100%;
    margin:20px;
    background-color:${props => props.theme.colors.darkest};
    border:2px solid ${props => props.theme.colors.darkest};
    border-radius:20px;
    padding:35px;
    align-items:center;
    box-shadow: 0px 2px 5px black;

`

export const ButtonStyle = styled.Button`
    border-radius:20px;
    padding:10px;
`

export const TextStyle = styled.Text`
    color:white;
    font-weight:bold;
    text-align:center;

`

export const ModalText = styled.Text`
    font-size:30px;
    font-weight:bold;
    text-align:center;
    color:${props => props.theme.colors.lightest};
`

export const ModalText2 = styled.Text`
    font-size:20px;
    padding-bottom:20px;
    font-weight:bold;
    text-align:center;
`
export const CloseButton = styled.Pressable`
    color:white;
    position:absolute;
    left:10px;
    top:10px;
`

export const RNPickerView = styled.View`
    width:100%;
    background-color:${props => props.theme.colors.dark};
    border:2px solid rgba(0,0,0,0.2);
    border-radius:10px;
`

export const DatePickerView = styled.View`
    width:100%;
    background-color:${props => props.theme.colors.dark};
    border:2px solid rgba(0,0,0,0.2);
    border-radius:10px;
`