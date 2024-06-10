import { NativeScrollEvent, NativeSyntheticEvent, ScrollView, View, type ViewProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  ref?: React.RefObject<ScrollView>;
  scrollEventThrottle?: any;
  onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
};

export function ThemedScroll({ style, lightColor, darkColor, ref, onScroll, scrollEventThrottle, ...otherProps}: ThemedViewProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <ScrollView style={[{ backgroundColor }, style]} {...otherProps} ref={ref} scrollEventThrottle={scrollEventThrottle} onScroll={onScroll}/>;
}
