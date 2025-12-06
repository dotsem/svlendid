export type Transition = keyof TransitionValues;

export interface TransitionValues {
    instant: string;
    fast: string;
    normal: string;
    slow: string;
}

// TODO idk yet about these
export type FontWeight = keyof FontWeightValues;
export interface FontWeightValues {
    extraThin: number;
    thin: number;
    regular: number;
    medium: number;
    bold: number;
    extrabold: number;
}

export interface Font {
    fontSize: string;
    lineHeight: string;
    letterSpacing?: string;
    fontFamily: string;
    fontWeight: FontWeight;
    italic: boolean;
}

export interface FontTheme {
    h1: Font;
    h2: Font;
    h3: Font;
    h4: Font;
    h5: Font;
    h6: Font;
    body1: Font;
    body2: Font;
    subtitle1: Font;
    subtitle2: Font;
    caption: Font;
    overline: Font;

}

