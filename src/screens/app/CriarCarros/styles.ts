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
    z-index:999;
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
    height:auto;
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

export const PhotoPickerView = styled.View`
    width: 90%;
    aspect-ratio:1/1;
    /* padding-bottom: 90%;  */
    /* 1:1 Aspect Ratio */
    /* position: relative; If you want text inside of it */

    /* margin-bottom:20%; */

    /* background-color:${props => props.theme.colors.dark}; */
    border:3px solid white;
    border-style:dashed;


`

export const OpenCameraButton = styled.Pressable`
    display:flex;
    justify-content:center; 
    align-items:center;


    position:absolute;

    display:table-cell;



    width:50%;
    height:auto;

    text-align:center;

    padding-bottom: 182%;
    background-color:rgba(0,0,0,0.4);
    

`

export const OpenGalleryButton = styled.Pressable`
    position:absolute;

    width:50%;
    margin-left: 50%;
    height:auto;

    text-align:center;

    padding-bottom: 190%;
    background-color:rgba(0,0,0,0.2);

    /* background-color:rgba(255,255,255,0.2); */
`
export const ModalImageBackground = styled.ImageBackground`
    display:flex;
    /* justify-content:center;  */
    align-items:center;


    /* width:100%; */
    height:100%;



    /* position:absolute; */
    

`

