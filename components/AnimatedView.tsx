import * as Animatable from 'react-native-animatable';

interface InterfaceAnimeted {
    children: any,
    mode: string,
    time: number,
    styles: {}[],
    delay?: number,
    direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse'
}

export default function Animated({ children, mode, time, styles, delay, direction }: InterfaceAnimeted) {

    const combinedStyles = styles.reduce((mergedStyles, currentStyle) => {
        return { ...mergedStyles, ...currentStyle };
    }, {});


    return (
        <>
            <Animatable.View
                animation={mode}
                duration={time}
                style={combinedStyles}
                delay={delay}
                direction={direction}
            >
                {children}
            </Animatable.View>
        </>
    )
}