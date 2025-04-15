// Import the createTheme from the themed package
// Set up the style the colour
// Default the colour and apply globally
import { createTheme } from "@rneui/themed";

const themePalette = {
    primaryGreen: '#22577a', 
    primaryLightGreen: '#003262', 
    backgroundColor: '#F0F8FF',
    textWhite: '#F5F5F5',
    textGreen: '#22577a',
    primary:'#ffb703', 
    primaryDarker: '#F7A547', 
    blue: '#219ebc', 
    blueDarker: '#023047', 
    none: 'transparent',
    error: '#990000'
};

export const AdoptlyTheme = createTheme({
    colors: {
        primaryOrange: themePalette.primary, 
        primaryDarker: themePalette.primaryDarker,
        blue: themePalette.blue,
        blueDarker: themePalette.blueDarker,
        blueLighter: themePalette.blueLighter,
        none: themePalette.none,

    },
    components: {
        Button: {
            raised: true,
            buttonStyle: { backgroundColor: themePalette.primaryGreen}, 
            disabledStyle: { backgroundColor: themePalette.primaryLightGreen },
        },
        Text: {
            h1Style: { 
                color: themePalette.textGreen,
                fontSize: 50,
                fontWeight: 'bold',
                textAlign: 'center',
            },
            h2Style: { 
                color: themePalette.textWhite,
                fontSize: 28,
                fontWeight: 'medium',
                textAlign: 'center',
            },
            h3Style: { 
                color: themePalette.textGreen,
                fontSize: 20,
                fontWeight: 'bold',
                textAlign: 'center',
            },
            style: { 
                color: themePalette.textGreen, 
                fontSize: 16,
                fontWeight: 'bold',
                textAlign: 'left',
            },
            Icon: {
                color: themePalette.primaryGreen,

            },
        },
        Avatar: {
            avatarStyle: {
                borderColor: themePalette.primary,
                borderWidth: 1,
            },
            size: 50
        },
        Input: {
            inputStyle: {
                backgroundColor: themePalette.fieldBackground,
                borderRadius: 10,
                fontFamily: 'OpenSans-Regular',
                fontSize: 14
                
            },
            errorStyle:{
                color:themePalette.error
            }
        },
        CheckBox:{
            checkedColor:themePalette.Lighter,
            containerStyle:{
                backgroundColor:'transparent',            
            },
            textStyle:{
                fontFamily: 'OpenSans-Regular',
                fontWeight: 'normal',
            }
    
        },
    }
});
