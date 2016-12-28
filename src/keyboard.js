(function() {
    var KeyStates = new Map();
    window.addEventListener('keydown', (e) => {
        keyStates.set(e.keyCode, 1);
    });
    window.addEventListener('keyup', (e) => {
        keyStates.set(e.keyCode, 0);
    });
    
    window.KeyHelp = {
        codes: {
            BREAK: 3, BACKSPACE: 8, TAB: 9, ENTER: 13, SHIFT: 16, CONTROL: 17, ALT: 18, PAUSE: 19, CAPS_LOCK: 20, ESCAPE: 27, SPACE: 32,
            PAGE_UP: 33, PAGE_DOWN: 34, END: 35, HOME: 36, ARROW_LEFT: 37, ARROW_UP: 38, ARROW_RIGHT: 39, ARROW_DOWN: 40, INSERT: 45,
            DELETE: 46, _0: 48, _1: 49, _2: 50, _3: 51, _4: 52, _5: 53, _6: 54, _7: 55, _8: 56, _9: 57, A: 65, B: 66, C: 67, D: 68,
            E: 69, F: 70, G: 71, H: 72, I: 73, J: 74, K: 75, L: 76, M: 77, N: 78, O: 79, P: 80, Q: 81, R: 82, S: 83, T: 84, U: 85, V: 86,
            W: 87, X: 88, Y: 89, Z: 90, NUM_0: 96, NUM_1: 97, NUM_2: 98, NUM_3: 99, NUM_4: 100, NUM_5: 101, NUM_6: 102, NUM_7: 103,
            NUM_8: 104, NUM_9: 105, NUM_MULTIPLY: 106, NUM_ADD: 107, NUM_SUBTRACT: 109, NUM_DECIMAL: 110, NUM_DIVIDE: 111, F1: 112,
            F2: 113, F3: 114, F4: 115, F5: 116, F6: 117, F7: 118, F8: 119, F9: 120, F10: 121, F11: 122, F12: 123, F13: 124, F14: 125,
            F15: 126, NUM_LOCK: 144, SCROLL_LOCK: 145, SEMICOLON: 186, EQUALS: 187, COMMA: 188, MINUS: 189, PERIOD: 190,
            FORWARD_SLASH: 191, GRAVE_ACCENT: 192, LEFT_BRACKET: 219, BACK_SLASH: 220, RIGHT_BRACKET: 221, QUOTE: 222
        },
        isKeyDown: function(k) {
            if (keyStates.has(k))
                if (keyStates.get(k) === 1)
                    return true;
            return false;
        },
        areKeysDown: function(ka) {
            for (var y in ka)
                if (keyStates.has(y))
                    if (keyStates.get(y) === 0)
                        return false;
            return true;
        },
        getKeyMap: function() {
            return keyStates;
        }
    };
})();
