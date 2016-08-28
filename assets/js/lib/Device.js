let instance = null;

class Device {
    constructor() {
        this._isIos;
        this._isAndroid;
        this._isMobile;
        this._version;
    }

    static getInstance() {
        if (!instance) instance = new Device();

        return instance;
    }

    static isIos() {
        const instance = Device.getInstance();
        return instance.isIos();
    }

    static isAndroid() {
        const instance = Device.getInstance();
        return instance.isAndroid();
    }

    static isMobile() {
        const instance = Device.getInstance();
        return instance.isMobile();
    }

    getUserAgent() {
        let ua = '';
        if (navigator.userAgent) {
            ua = navigator.userAgent;
        }

        return ua.toLowerCase();
    }

    isMobile() {
        if (this._isMobile != null) return this._isMobile;

        this._isMobile = (this.isIos() || this.isAndroid());
        return this._isMobile;
    }

    isIos() {
        if (this._isIos != null) return this._isIos;

        let ua = this.getUserAgent();
        this._isIos = ua.indexOf('iphone') > -1 || ua.indexOf('ipod') > -1 || ua.indexOf('ipad') > -1;
        return this._isIos;
    }

    isAndroid() {
        if (this._isAndroid != null) return this._isAndroid;

        let ua = this.getUserAgent();
        this._isAndroid = ua.indexOf('mozilla/5.0') > -1 && ua.indexOf('android') > -1 && ua.indexOf('applewebkit') > -1;
        return this._isAndroid;
    }

    getVersion() {
        if (this._version != null) return this._version;

        let ua = this.getUserAgent();
        if (this.isIos()) {
            this._version = 8.0;

            let match = ua.match(/iphone os ([0-9\_]+)\s/);
            if (match) {
                match = parseFloat(match[1].replace('_', '.'));
                this._version = match;
            }
        } else if (this.isAndroid()) {
            this._version = 4.0;

            var match = ua.match(/android\s([0-9\.]*)/i);

            if (match) {
                match = parseFloat(match[1]);
                this._version = match;
            }
        }

        return this._version;
    }
}

module.exports = Device;