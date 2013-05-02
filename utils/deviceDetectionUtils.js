/**
 * deviceDetectionUtils.js
 *
 * User: jacobs
 * Date: 4/8/13
 * Time: 2:16 PM
 *
 * Useful functions for detecting some devices.
 *
 * Currently only detects:
 *     Samsung SmartTV
 *     iPad 2
 *     iPhone 4
 *     Desktop
 *
 * Wont work with any other devices and doesn't detect
 * specific browsers like IE vs. Safari, etc.
 *
 * Requires Modernizr  - http://modernizr.com/
 *
 * Trying to stay away from User-Agent string sniffing because they are not
 * very reliable.  Also trying to avoid media query type conditions since
 * TV browsers and Desktop browsers can have the same sizes.  Samsung SmartTV browser is
 * 1280 x 609.  Usually using a combination of feature, browser size and User-Agent string.
 */

poc.DeviceDetectionUtils = {

    // detect orientation of device mostly for mobile
    // and tablet devices
    detectOrientation: function () {
        return (window.innerHeight > window.innerWidth) ? "portrait" : "landscape";
    },

    // add features required by app
    // Modernizr documentation
    // http://modernizr.com/docs/#features-css
    // details methods
    hasRequiredAppFeatures: function() {
        return Modernizr.csstransforms3d
            && Modernizr.csstransitions
            && Modernizr.hashchange
            && Modernizr.cssanimations
            && Modernizr.opacity
            && Modernizr.fontface
            && Modernizr.video
            && Modernizr.localstorage;
    },

    // User-Agent
    isSmartTV: function () {
        return navigator.userAgent.search(/TV/i) >= 0;
    },

    // using touch feature recognition, orientation and
    // browser width to detect iPad
    isIpad: function () {
        if (
            this.detectOrientation() === "portrait"
            && Modernizr.touch
            && window.innerWidth > 350
        )
        {
            return true;
        };

        if (
            this.detectOrientation() === "landscape"
            && Modernizr.touch
            && window.innerWidth > 590
        )
        {
            return true;
        };

        return false;
    },

    // The rest of these functions use the previous ones with touch
    // feature detection

    isIphone: function () {
        return Modernizr.touch
            && !this.isIpad();
    },

    isDesktop: function () {
        return !Modernizr.touch
            && !this.isSmartTV();
    },

    deviceIs: function () {
        if (this.hasRequiredAppFeatures()) {
            if (this.isSmartTV()) {
                return "SmartTV";
            }

            if (this.isIpad()) {
                return "iPad";
            }

            if (this.isIphone()) {
                return "iPhone";
            }

            if (this.isDesktop()) {
                return "Desktop";
            }

            return "Can't detect device or my detection code stinks";

        } else {
            return "Sorry this device does not support the features needed for this application";
        }
    }

};
