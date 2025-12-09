/**
 * Animation easing presets
 * Maps friendly names to CSS timing functions
 */

import type { AnimationEasing } from "$package/types/animation.type.js";

/**
 * Map of easing names to CSS timing functions
 */
export const easingMap: Record<AnimationEasing, string> = {
    linear: "linear",
    ease: "ease",
    "ease-in": "ease-in",
    "ease-out": "ease-out",
    "ease-in-out": "ease-in-out",
    spring: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
    bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
    elastic: "cubic-bezier(0.68, -0.6, 0.32, 1.6)",
};

/**
 * Resolve an easing value to CSS timing function
 * @param easing - Easing preset name or custom CSS timing function
 * @returns CSS timing function string
 */
export function resolveEasing(easing: AnimationEasing | string): string {
    return easingMap[easing as AnimationEasing] ?? easing;
}
