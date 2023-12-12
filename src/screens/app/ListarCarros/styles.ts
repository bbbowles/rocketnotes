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