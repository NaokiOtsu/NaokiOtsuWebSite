import Device from 'Device';

class Base {
    isMobile() {
        return Device.isMobile();
    }

    getTouchStartEventName() {
        return Device.isMobile() ? 'touchstart' : 'mousedown';
    }

    getTouchMoveEventName() {
        return Device.isMobile() ? 'touchmove' : 'mousemove';
    }

    getTouchEndEventName() {
        return Device.isMobile() ? 'touchend' : 'mouseup';
    }
}

module.exports = Base;