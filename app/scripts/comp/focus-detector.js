const Backbone = require('backbone');
const FeatureDetector = require('../util/feature-detector');
const Launcher = require('../comp/launcher');

const FocusDetector = {
    init() {
        this.isFocused = true;
        this.detectsFocusWithEvents = !FeatureDetector.isDesktop && !FeatureDetector.isMobile;
        window.addEventListener('focus', () => {
            if (!FocusDetector.isFocused) {
                FocusDetector.isFocused = true;
                Backbone.trigger('focus');
            }
        });
        window.addEventListener('blur', () => {
            if (FocusDetector.isFocused) {
                FocusDetector.isFocused = false;
                Backbone.trigger('blur');
            }
        });
    },

    hasFocus() {
        if (this.detectsFocusWithEvents) {
            return this.isFocused;
        } else if (Launcher) {
            return Launcher.isAppFocused();
        } else {
            return true;
        }
    }
};

module.exports = FocusDetector;
