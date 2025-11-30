"use client";

import { useEffect } from "react";
import { toast } from "sonner";

export function UpdatePrompt() {
    useEffect(() => {
        if (typeof window !== "undefined" && "serviceWorker" in navigator) {
            const handleControllerChange = () => {
                // This fires when the service worker controlling this page changes
                window.location.reload();
            };

            navigator.serviceWorker.addEventListener("controllerchange", handleControllerChange);

            const promptUpdate = (worker: ServiceWorker) => {
                toast("New version available", {
                    description: "Updating app...",
                    duration: 2000,
                });
                // Automatically activate the new worker
                worker.postMessage({ type: "SKIP_WAITING" });
            };

            navigator.serviceWorker.getRegistration().then((reg) => {
                if (!reg) return;

                if (reg.waiting) {
                    promptUpdate(reg.waiting);
                }

                reg.addEventListener("updatefound", () => {
                    const newWorker = reg.installing;
                    if (newWorker) {
                        newWorker.addEventListener("statechange", () => {
                            if (
                                newWorker.state === "installed" &&
                                navigator.serviceWorker.controller
                            ) {
                                promptUpdate(newWorker);
                            }
                        });
                    }
                });
            });

            return () => {
                navigator.serviceWorker.removeEventListener(
                    "controllerchange",
                    handleControllerChange
                );
            };
        }
    }, []);

    return null;
}
