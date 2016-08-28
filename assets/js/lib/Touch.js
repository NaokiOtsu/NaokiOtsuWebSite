import $ from 'jquery';
import Base from 'Base';

const CLASS_NAME = {
    touching: 'touching'
};

class Touch extends Base {
    constructor() {
        super();
        this.$body = $('body');
        this.eventListeners();
    }

    eventListeners() {
        this.$body.on(this.getTouchStartEventName(), this.onTouchStart.bind(this));
    }

    onTouchStart(event) {
        const $div = $('<div></div>');
        
        let x = this.isMobile() ? event.changedTouches[0].clientX : event.clientX;
        let y = this.isMobile() ? event.changedTouches[0].clientY : event.clientY;
        x = Math.floor(x);
        y = Math.floor(y);

        $div.addClass(CLASS_NAME.touching).css({
            top: y,
            left: x,
            transform: 'scale(0)',
            opacity: 1
        });
        $div.one('webkitAnimationEnd', function() {
            $(this).remove();
        });

        this.$body.append($div);
    }
}

module.exports = Touch;