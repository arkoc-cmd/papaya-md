/**
 * PapayaMD Client Protection Script
 * Disables context menu (right-click) and standard developer inspection shortcut keys.
 */
(function() {
  'use strict';

  // 1. Disable Right-Click Context Menu
  document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    return false;
  }, { capture: true });

  // 2. Disable Keyboard Shortcuts (Inspect, View Source, Save Page, DevTools)
  document.addEventListener('keydown', function(e) {
    // F12 -> DevTools
    if (e.key === 'F12' || e.keyCode === 123) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
    const cmdOrCtrl = isMac ? e.metaKey : e.ctrlKey;

    if (cmdOrCtrl) {
      // Cmd/Ctrl + Shift + I (Inspect)
      // Cmd/Ctrl + Shift + J (Console)
      // Cmd/Ctrl + Shift + C (Element Inspector)
      if (e.shiftKey && (e.key === 'I' || e.key === 'i' || e.keyCode === 73 ||
                         e.key === 'J' || e.key === 'j' || e.keyCode === 74 ||
                         e.key === 'C' || e.key === 'c' || e.keyCode === 67)) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }

      // Cmd/Ctrl + U (View Source)
      if (e.key === 'U' || e.key === 'u' || e.keyCode === 85) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }

      // Cmd/Ctrl + S (Save Page)
      if (e.key === 'S' || e.key === 's' || e.keyCode === 83) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    }
  }, { capture: true });

  // 3. Disable Dragging of Images / Elements
  document.addEventListener('dragstart', function(e) {
    e.preventDefault();
    return false;
  }, { capture: true });
})();
