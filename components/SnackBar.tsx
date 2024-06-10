import { Snackbar } from "react-native-paper";
import { ArrowFunction } from "typescript";

interface interfaceSnackBar {
    text: string,
    label?: string,
    visible: boolean,
    action?: (props: any) => {} | ArrowFunction | void,
    setVisibleSnack: (props: any) => {} | ArrowFunction | void,
    color?: any
}

export default function SnackBar({ text, label, visible, action, setVisibleSnack, color }: interfaceSnackBar) {

    const onDismissSnackBar = () => setVisibleSnack(false);

    const stylesColor = { color: 'white' }

    return (
        <>
            <Snackbar
                style={{backgroundColor: color}}
                visible={visible}
                onDismiss={onDismissSnackBar}
                action={{
                    labelStyle: stylesColor,
                    label: label,
                    onPress: action,
                }}>
                {text}
            </Snackbar>
        </>
    )
}