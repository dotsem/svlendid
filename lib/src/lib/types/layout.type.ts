

export type Spacing = keyof SpacingValues & string;
export interface SpacingValues {
    none?: Spacing;
    xs?: Spacing;
    s?: Spacing;
    m?: Spacing;
    l?: Spacing;
    xl?: Spacing;
    "2xl"?: Spacing;
    "3xl"?: Spacing;
}

export type Radius = keyof RadiusValues & string;
export interface RadiusValues {
    none?: Radius;
    xs?: Radius;
    s?: Radius;
    m?: Radius;
    l?: Radius;
    xl?: Radius;
    "2xl"?: Radius;
    full?: Radius;
}

export type ZIndex = keyof ZIndexValues & number;
export interface ZIndexValues {
    base?: ZIndex;
    dropdown?: ZIndex;
    sticky?: ZIndex;
    fixed?: ZIndex;
    overlay?: ZIndex;
    modal?: ZIndex;
    popover?: ZIndex;
    tooltip?: ZIndex;
    toast?: ZIndex;
}

export type Container = keyof ContainerValues & string;
export interface ContainerValues {
    s?: Container;
    m?: Container;
    l?: Container;
    xl?: Container;
}

export type Breakpoint = keyof BreakpointValues & string;
export interface BreakpointValues {
    mobileS: Breakpoint;
    mobileM: Breakpoint; 
    mobileL: Breakpoint; 
    tablet: Breakpoint;
    laptop: Breakpoint; 
    laptopL: Breakpoint; 
    "4k": Breakpoint;
}

export type BoxShadow = keyof BoxShadowValues & string; 
export interface BoxShadowValues {
    none?: BoxShadow;
    s?: BoxShadow;
    m?: BoxShadow;
    l?: BoxShadow;
}