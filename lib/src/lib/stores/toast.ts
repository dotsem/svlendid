/**
 * Toast store for managing global toast notifications
 */
import { writable, derived, get } from "svelte/store";
import type { ColorPalette } from "$package/types/colorPalette.type.js";

export interface ToastMessage {
    id: string;
    message: string;
    color?: ColorPalette;
    variant?: "filled" | "tonal";
    duration?: number;
    closable?: boolean;
}

function createToastStore() {
    const { subscribe, set, update } = writable<ToastMessage[]>([]);

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

        update((toasts) => [...toasts, newToast]);

        if (newToast.duration && newToast.duration > 0) {
            setTimeout(() => {
                remove(id);
            }, newToast.duration);
        }

        return id;
    }

    function remove(id: string): void {
        update((toasts) => toasts.filter((t) => t.id !== id));
    }

    function clear(): void {
        set([]);
    }

    return {
        subscribe,
        add,
        remove,
        clear,
    };
}

export const toastStore = createToastStore();

export function showToast(
    message: string,
    options?: Partial<Omit<ToastMessage, "id" | "message">>
): string {
    return toastStore.add({ message, ...options });
}

export function showSuccess(message: string, duration?: number): string {
    return toastStore.add({ message, color: "success", duration });
}

export function showError(message: string, duration?: number): string {
    return toastStore.add({ message, color: "error", duration });
}

export function showWarning(message: string, duration?: number): string {
    return toastStore.add({ message, color: "warning", duration });
}

export function showInfo(message: string, duration?: number): string {
    return toastStore.add({ message, color: "info", duration });
}
