class Slideshow {
    constructor(nid) {
        this.currentSlide = 0;
        this.container = document.querySelector('#mount');
        this.slides = [];

        this.loadImages(nid)
            .then(slides => {
                this.slides = slides;
                this.showLoader();
                this.render().then(() => {
                    this.update();
                    this.hideLoader();
                });
            });
    }

    loadImages(nid) {
        return fetch('https://kolping-dietfurt.de/api/news/' + nid)
            .then(response => response.json())
            .then(data => data.images.map(image => image.chromecast))
    }

    render() {
        return new Promise((resolve, reject) => {
            let promises = [];

            this.slides.map(slide => {
                promises.push(new Promise((resolve, reject) => {
                    let image = new Image();
                    image.onload = resolve;
                    image.src = slide;
                }));
            });

            Promise.all(promises)
                .then(events => {
                    events.map(event => {
                        this.container.appendChild(event.path[0]);
                    });
                    resolve();
                });
        });


    }

    update() {
        let old = this.container.querySelector(`img.active`);
        let current = this.container.querySelector(`img:nth-of-type(${this.currentSlide + 1})`);

        if (old)
            old.classList.remove('active');

        current.classList.add('active');
    }

    next() {
        if (this.currentSlide + 2 > this.slides.length) {
            this.currentSlide = -1;
        }

        this.currentSlide++;
        this.update();
    }

    prev() {
        if (this.currentSlide == 0) {
            this.currentSlide = this.slides.length;
        }

        this.currentSlide--;
        this.update();
    }


    showLoader() {
        this.container.innerHTML = '<div class="loader">Laden...</div>'
    }
    hideLoader() {
        this.container.querySelector('.loader').remove();
    }
}
