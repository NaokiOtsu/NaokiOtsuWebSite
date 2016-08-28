import $ from 'jquery';

class Loading {
    constructor() {
        this.$container = $('.loading-container');
        this.$name = $('.my-name-is');
        this.$line = $('.line');
        this.$site = $('.site-name');
        this.$percent = $('.percent-container');
        this.$circle = $('.loading-circle');
        this.$num = $('.percent-num');

        this.initialize();
    }

    initialize() {
        setTimeout(_ => {
            this.$circle.addClass('animating');
            this.start();
        }, 1300);
    }

    start() {
        let counter = 0;
        const timer = setInterval(_ => {
            counter++;
            this.$num.text(counter);
            if (counter >= 100) {
                clearInterval(timer);
                this.hide();
            }
        }, 10);
    }

    hide() {
        this.$percent.addClass('hide');
        this.$site.addClass('hide');
        this.$name.addClass('hide');
        this.$line.addClass('hide');
        this.$line.on('webkitAnimationEnd', _ => {
            this.$container.remove();
        });
    }
}

module.exports = Loading;