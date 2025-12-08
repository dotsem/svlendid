/**
 * Animation types for the Animate component
 */

/**
 * Available animation presets for entry/exit animations
 */
export type AnimationPreset = 
    // Fade animations
    | "fade"
    | "fadeUp"
    | "fadeDown"
    | "fadeLeft"
    | "fadeRight"
    | "fadeScale"
    // Slide animations
    | "slideUp"
    | "slideDown"
    | "slideLeft"
    | "slideRight"
    // Scale animations
    | "scale"
    | "scaleUp"
    | "scaleDown"
    // Rotate animations
    | "rotate"
    | "rotateLeft"
    | "rotateRight"
    | "flip"
    | "flipX"
    | "flipY"
    // Bounce animations
    | "bounce"
    | "bounceIn"
    | "bounceLeft"
    | "bounceRight"
    // Zoom animations
    | "zoomIn"
    | "zoomOut"
    // Blur animations
    | "blur"
    | "blurUp"
    | "blurDown"
    // Skew animations
    | "skewLeft"
    | "skewRight"
    // Special effects
    | "typewriter"
    | "shake"
    | "pulse"
    | "swing"
    | "rubberBand"
    | "wobble"
    | "jello"
    | "heartbeat"
    // None
    | "none";

/**
 * Animation timing functions
 */
export type AnimationEasing = 
    | "linear"
    | "ease"
    | "ease-in"
    | "ease-out"
    | "ease-in-out"
    | "spring"
    | "bounce"
    | "elastic";

/**
 * Animation configuration
 */
export interface AnimationConfig {
    /** Animation preset or custom CSS animation name */
    animation: AnimationPreset | string;
    /** Duration in milliseconds */
    duration?: number;
    /** Delay before animation starts (ms) */
    delay?: number;
    /** Timing function */
    easing?: AnimationEasing | string;
    /** Distance for slide/fade animations (e.g., "50px", "100%") */
    distance?: string;
    /** Scale factor for scale animations */
    scale?: number;
    /** Rotation angle for rotate animations */
    angle?: string;
}
