import { useEffect, useCallback } from 'react';

export interface ShortcutConfig {
  key: string;
  metaOrCtrl?: boolean;
  shift?: boolean;
  alt?: boolean;
  handler: (e: KeyboardEvent) => void;
  description?: string;
  allowInInputs?: boolean;
}

/**
 * Custom hook to register and handle keyboard shortcuts across the application.
 * Supports Cmd+K / Ctrl+K, Escape, and custom key combinations.
 */
export function useKeyboardShortcuts(shortcuts: ShortcutConfig[], enabled = true) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!enabled) return;

      const target = e.target as HTMLElement | null;
      const isInputFocused =
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable);

      for (const shortcut of shortcuts) {
        const keyMatches =
          e.key.toLowerCase() === shortcut.key.toLowerCase() ||
          e.code.toLowerCase() === shortcut.key.toLowerCase();

        const metaOrCtrlMatches = shortcut.metaOrCtrl
          ? e.metaKey || e.ctrlKey
          : !e.metaKey && !e.ctrlKey;

        const shiftMatches = shortcut.shift ? e.shiftKey : !e.shiftKey;
        const altMatches = shortcut.alt ? e.altKey : !e.altKey;

        if (keyMatches && metaOrCtrlMatches && shiftMatches && altMatches) {
          // If typing in an input, only allow if explicitly configured (e.g. Escape or Cmd+K)
          if (isInputFocused && !shortcut.allowInInputs) {
            continue;
          }

          e.preventDefault();
          shortcut.handler(e);
          break;
        }
      }
    },
    [shortcuts, enabled]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);
}

/**
 * Utility to detect if the current operating system is macOS
 */
export function isMac(): boolean {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') return false;
  return /Mac|iPod|iPhone|iPad/.test(navigator.platform || navigator.userAgent);
}
