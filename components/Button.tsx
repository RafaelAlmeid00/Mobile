import React from 'react';
import { Button } from 'react-native-paper';
import { ArrowFunction } from 'typescript';

interface interfaceButton {
    style?: {}[],
    text: string,
    disable?: boolean,
    mode: "text" | "outlined" | "contained" | "elevated" | "contained-tonal"
    click?: (props: any) => {} | void | ArrowFunction,
    color?: string,
    icon?: string
    loading?: boolean
}

const ButtonComp = ({ icon, color, style = [], text, disable, mode, click, loading }: interfaceButton) => {

    const combinedStyles = style.reduce((mergedStyles, currentStyle) => {
        return { ...mergedStyles, ...currentStyle };
    }, {});


    return (
        <Button textColor={color}
            icon={icon}
            mode={mode}
            style={[style && combinedStyles]}
            disabled={disable}
            onPress={click}
            loading={loading}
        >
            {text}
        </Button>
    );
};


export default ButtonComp
