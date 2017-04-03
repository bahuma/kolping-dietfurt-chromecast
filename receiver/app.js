class App {
    constructor() {
        this.currentNews = null;
        this.slideshow = null;
        this.mount = document.querySelector('#mount');
        this.placeholder = document.querySelector('#placeholder');
    }

    show(nid) {
        this.currentNews = nid;
        this.slideshow = new Slideshow(nid);
        this.mount.classList.remove('hidden');
        this.placeholder.classList.add('hidden');
    }

    clear() {
        this.currentNews = null;
        this.slideshow = null;
        this.mount.classList.add('hidden');
        this.mount.innerHTML = '';
        this.placeholder.classList.remove('hidden');
    }
}