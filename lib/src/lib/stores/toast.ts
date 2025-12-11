/**
 * Toast store for managing global toast notifications
 */
import { writable } from "svelte/store";
import type { ColorPalette } from "$package/types/colorPalette.type.js";

export interface ToastMessage {
    id: string;
    message: string;
    color?: ColorPalette;
    variant?: "filled" | "tonal";
    duration?: number | null;
    closable?: boolean;
}

interface ToastState {
    toasts: ToastMessage[];
    pausedToasts: Set<string>;
}

function createToastStore() {
    const { subscribe, set, update } = writable<ToastState>({
        toasts: [],
        pausedToasts: new Set(),
    });

    const timers = new Map<
        string,
        {
            timeoutId: ReturnType<typeof setTimeout>;
            remaining: number;
            startTime: number;
        }
    >();

    function generateId(): string {
        return `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }

    function add(toast: Omit<ToastMessage, "id">): string {
        const id = generateId();
        const newToast: ToastMessage = {
            id,
            color: "primary",
            variant: "filled",
            duration: 5000,
            closable: true,
            ...toast,
        };

        update((state) => ({
            ...state,
            toasts: [...state.toasts, newToast],
        }));

        // Only set auto-dismiss if duration is a positive number (not null or 0)
        if (typeof newToast.duration === "number" && newToast.duration > 0) {
            startTimer(id, newToast.duration);
        }

        return id;
    }

    function startTimer(id: string, duration: number) {
        const timeoutId = setTimeout(() => {
            remove(id);
        }, duration);

        timers.set(id, {
            timeoutId,
            remaining: duration,
            startTime: Date.now(),
        });
    }

    function pauseTimer(id: string) {
        const timer = timers.get(id);
        if (timer) {
            clearTimeout(timer.timeoutId);
            const elapsed = Date.now() - timer.startTime;
            timer.remaining = Math.max(0, timer.remaining - elapsed);
            update((state) => ({
                ...state,
                pausedToasts: new Set([...state.pausedToasts, id]),
            }));
        }
    }

    function resumeTimer(id: string) {
        const timer = timers.get(id);
        if (timer && timer.remaining > 0) {
            timer.startTime = Date.now();
            timer.timeoutId = setTimeout(() => {
                remove(id);
            }, timer.remaining);
        }
        update((state) => {
            const newPaused = new Set(state.pausedToasts);
            newPaused.delete(id);
            return { ...state, pausedToasts: newPaused };
        });
    }

    function remove(id: string): void {
        const timer = timers.get(id);
        if (timer) {
            clearTimeout(timer.timeoutId);
            timers.delete(id);
        }
        update((state) => ({
            ...state,
            toasts: state.toasts.filter((t) => t.id !== id),
            pausedToasts: (() => {
                const newPaused = new Set(state.pausedToasts);
                newPaused.delete(id);
                return newPaused;
            })(),
        }));
    }

    function clear(): void {
        timers.forEach((timer) => clearTimeout(timer.timeoutId));
        timers.clear();
        set({ toasts: [], pausedToasts: new Set() });
    }

    return {
        subscribe,
        add,
        remove,
        clear,
        pauseTimer,
        resumeTimer,
    };
}

export const toastStore = createToastStore();

export function showToast(
    message: string,
    options?: Partial<Omit<ToastMessage, "id" | "message">>
): string {
    return toastStore.add({ message, ...options });
}

export function showSuccess(message: string, duration?: number | null): string {
    return toastStore.add({
        message,
        color: "success",
        ...(duration !== undefined && { duration }),
    });
}

export function showError(message: string, duration?: number | null): string {
    return toastStore.add({
        message,
        color: "error",
        ...(duration !== undefined && { duration }),
    });
}

export function showWarning(message: string, duration?: number | null): string {
    return toastStore.add({
        message,
        color: "warning",
        ...(duration !== undefined && { duration }),
    });
}

export function showInfo(message: string, duration?: number | null): string {
    return toastStore.add({
        message,
        color: "info",
        ...(duration !== undefined && { duration }),
    });
}
