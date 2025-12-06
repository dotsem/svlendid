import type { BoxShadow, BoxShadowValues, Breakpoint, BreakpointValues, Container, ContainerValues, Radius, RadiusValues, Spacing, SpacingValues, ZIndex, ZIndexValues } from "$lib/types/layout.type.js";
import { palette } from "$lib/config/colorPalette.default.js";

export const defaultSpacing: SpacingValues= {
    none: "0" as Spacing,
    xs: "4px" as Spacing,
    s: "8px" as Spacing,
    m: "16px" as Spacing,
    l: "24px" as Spacing,
    xl: "32px" as Spacing,
    "2xl": "40px" as Spacing,
    "3xl": "48px" as Spacing,
};

export const defaultRadius: RadiusValues = {
    none: "0" as Radius,
    xs: "4px" as Radius,
    s: "8px" as Radius,
    m: "16px" as Radius,
    l: "24px" as Radius,
    xl: "32px" as Radius,
    "2xl": "40px" as Radius,
    full: "9999px" as Radius,
};

export const defaultBreakpoints: BreakpointValues = {
    mobileS: "320px" as Breakpoint,
    mobileM: "375px" as Breakpoint,
    mobileL: "425px" as Breakpoint,
    tablet: "768px" as Breakpoint,
    laptop: "1024px" as Breakpoint,
    laptopL: "1440px" as Breakpoint,
    "4k": "2560px" as Breakpoint,
};

export const defaultZIndex: ZIndexValues = {
    base: 0 as ZIndex,
    dropdown: 100 as ZIndex,
    sticky: 200 as ZIndex,
    fixed: 300 as ZIndex,
    overlay: 400 as ZIndex,
    modal: 500 as ZIndex,
    popover: 600 as ZIndex,
    tooltip: 700 as ZIndex,
    toast: 800 as ZIndex,
};

export const defaultContainer: ContainerValues = {
    s: "640px" as Container,
    m: "768px" as Container,
    l: "1024px" as Container,
    xl: "1280px" as Container,
};

export const defaultBoxShadow: BoxShadowValues= {
    none: "none",
    s: `0 1px 2px 0 ${palette.shadow}` as BoxShadow,
    m: `0 4px 6px -1px ${palette.shadow}, 0 2px 4px -1px ${palette.shadow}` as BoxShadow,
    l: `0 10px 15px -3px ${palette.shadow}, 0 4px 6px -2px ${palette.shadow}` as BoxShadow,
   
}