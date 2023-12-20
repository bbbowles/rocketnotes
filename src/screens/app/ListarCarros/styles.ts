import styled from 'styled-components/native';

export const BackgroundView = styled.View`
    background-color:${props => props.theme.colors.darkest};
    height:100%;
`

export const GridViewContainer = styled.View`
    display:flex;
    flex-direction:row;
    justify-content:space-around;
    background-color:${props => props.theme.colors.dark};
    border: 3px solid #3f3f41;
    width:45%;
    height:180px;
    border-radius:30px;
    margin:10px;
    padding-top:7px;
`
export const SmallText = styled.Text`
    font-size:24px;
    line-height:27px;
    justify-content:center;
    height:27px;
    color:${props => props.theme.colors.lightest};
    
`
export const ReallySmallText = styled.Text`
    font-size:20px;
    justify-content:center;
    color:#f3f9f9;
    background-color:${props => props.theme.colors.neutral};
    border-radius:10px;
    padding-left:10%;
    
`
export const BigText = styled.Text`
    font-size:30px;
    font-weight:bold;
    justify-content:center;
    line-height:35px;
    color:${props => props.theme.colors.lightest};
    
`
export const GridViewContainerFlex = styled.View`
    display:block;
    /* border: 3px solid red; */
    /* background-color:${props => props.theme.colors.dark}; */
    margin-left:8%;
    width:70%;
    height:170px;

`

export const PressableTop = styled.Pressable`
    background-color:${props => props.theme.colors.light};
    padding: 7px;
    border-radius:20px 20px 0 0;
    
`
export const PressableBottom = styled.Pressable`
    background-color:${props => props.theme.colors.neutral};
    padding: 7px;
    border-radius:0 0 20px 20px;

`
export const TextWhiteShadow = styled.Text`
    font-size:27px;
    text-shadow:0px 0px 10px white;

    
`
export const ModalView = styled.View`
    display:flex;
    align-items:center;
    position:absolute;
    justify-content:flex-start;
    width:100%;
    bottom:0;
    background-color:rgba(0,0,0,0.5);
    padding:0 10px;
    height:100%;

`

export const CustomImage = styled.Image`
    width:100%;
    height:100%;
`

export const ModalText = styled.Text`
    color:${props => props.theme.colors.lightest};
  
    /* font-size:40px; */
    font-weight:bold;


`

export const ModalTextView = styled.View`
    display:block;
    position:absolute;
    z-index:999;

    top:18%;
    left:5%;

    border: 3px solid #3f3f41;

    background-color:${props => props.theme.colors.dark};
    border-radius:10px;

`

export const ExitModalButton = styled.Pressable`
color:white;
    position: absolute;
    top:16%;
    left:90%;
    z-index:999;
    font-size:40px;
    font-weight:bold;
    background-color:rgba(0,0,0,0.2);

    border-radius:30px;



`