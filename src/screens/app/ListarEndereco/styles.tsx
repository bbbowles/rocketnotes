import styled from 'styled-components/native';
// import { darkTheme } from '../../../../globalStyles';


export const BackgroundView = styled.View`
    background-color:${props => props.theme.colors.darkest};
    height:100%;
`
export const PrimaryText = styled.Text`
    flex:1;
    
    height:27px;
    line-height:30px;
    border-radius:30px;
    
    background-color:${props => props.theme.colors.neutral};
    color:white;
    
    font-size:26px;
    text-align:center;
    font-weight:bold;
`
export const SecondaryTextBold = styled.Text`
    flex:1;
    
    height:27px;
    line-height:30px;
    border-radius:5px;

    width:2%;
    margin-right:30%;
    
    background-color:${props => props.theme.colors.neutral};
    color:white;
    
    font-size:26px;
    text-align:center;
    font-weight:bold;

    max-width:20%;

`
export const SecondaryText = styled.Text`
    flex:1;
    
    height:27px;
    line-height:27px;

    border-radius:30px;
    
    /* background-color:${props => props.theme.colors.neutral}; */
    color:${props => props.theme.colors.lightest};
    
    font-size:24px;
    /* text-align:center; */
    font-weight:bold;
`

export const FineText = styled.Text`
    flex:1;
    font-size:24px;
    line-height:27px;
    height:27px;
    font-weight:300;
    color:${props => props.theme.colors.lightest};
`
export const GridViewContainer = styled.View`
    display:flex;
    flex-direction:column;
    justify-content:center;
    background-color:${props => props.theme.colors.dark};
    /* border:2px solid black; */
    width:90%;
    border: 3px solid #3f3f41;

    /* height:280px; */
    border-radius:30px;
    margin: 10px auto;
    padding-top:7px;
`
export const SmallText = styled.Text`
    /* border:3px solid red; */
    /* text-align:center; */
    flex:1;
    font-size:24px;
    line-height:27px;
    height:27px;
    color:${props => props.theme.colors.lightest};
`
export const GreySmallText = styled.Text`
    flex:1;
    font-size:16px;
    line-height:27px;
    justify-content:center;
    height:27px;
    color:grey;
`
export const ReallySmallText = styled.Text`
    font-size:20px;
    justify-content:center;
    color:${props => props.theme.colors.lightest};
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
    margin-left:4%;
    margin-Right:4%;

    width:auto;
    /* height:170px; */

`

export const PressableLeft = styled.Pressable`
    background-color:${props => props.theme.colors.light};
    padding: 7px 20%;
    border-radius:0px 0px 0px 29px;
    justify-content:center;
    /* padding-bottom:5%; */
    width:50%;
    
`
export const PressableRight = styled.Pressable`
    background-color:${props => props.theme.colors.neutral};
    padding: 7px 20%;
    border-radius:0 0 29px 0;
    width:50%;


`
export const TextWhiteShadow = styled.Text`
    font-size:27px;
    text-shadow:0px 0px 10px white;
    
`
export const ActivityIndicatorOnEnd = styled.ActivityIndicator`
    position:absolute;
    z-index:99;
    bottom:0;
    width:100%;
    height:100%;
    background-color:rgba(0,0,0,0.2);
    margin-left: auto;
    margin-right: auto;
`