import { TextInput } from "react-native-paper";
import { ArrowFunction } from "typescript";

interface interfaceInput {
    mode: "flat" | "outlined",
    focus?: boolean,
    label?: string,
    left?: any,
    right?: any,
    value: any,
    style?: {}[],
    secureText?: any,
    length: number,
    onChange: (props: any) => {} | void | ArrowFunction
}

export default function InputComp({ secureText, mode, focus, length, left, right, value, style, label, onChange}: interfaceInput) {

    return (
        <TextInput
            autoFocus={focus}
            label={label}
            left={left}
            right={right}
            value={value}
            onChangeText={onChange}
            style={[style]}
            maxLength={length}
            mode={mode}
            secureTextEntry={secureText}
        />
    )
}