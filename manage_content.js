const PDF_HTML = '<iframe src="crimes-by-israel-30-dec-2023.pdf"></iframe>'
const WIDTH_THRESHOLD = 600;
const CONTENT_CONTAINER_ID = 'contentContainer';
const PDF_CONTAINER_CLASS = 'pdf-container';
const IMAGES_CONTAINER_CLASS = 'images-container';
const PAGES_DIR = 'pages';
const PAGE_COUNT_FILE = 'page-count.txt';
const PAGE_FILE_BASE_NAME = 'page_'

var prevWidth = screen.width;
var prevHeight = screen.height;
var prevIsLandscape = isLandscape();

function isLandscape() {
    return window.matchMedia("(orientation: landscape)").matches;
}

function isMobileDevice() {
    return (screen.width <= WIDTH_THRESHOLD) || (isLandscape() && screen.height <= WIDTH_THRESHOLD);
}

function prevIsMobileDevice() {
    return (prevWidth <= WIDTH_THRESHOLD) || (prevIsLandscape && prevHeight <= WIDTH_THRESHOLD);
}

function mobileThresholdCrossed() {
    if (isMobileDevice() == prevIsMobileDevice()) {
        return false;
    } else {
        prevWidth = screen.width;
        prevHeight = screen.height;
        prevIsLandscape = isLandscape();
        return true;
    }
}

function loadImages(pageCount) {
    const container = document.getElementById(CONTENT_CONTAINER_ID);
    container.innerHTML = ''; // clear existing content
    container.className = IMAGES_CONTAINER_CLASS;
    for (let i=1; i<=pageCount; i++) {
        const img = document.createElement('img');
        img.src = `${PAGES_DIR}/${PAGE_FILE_BASE_NAME}${i}.png`;
        container.appendChild(img);
    }
}

function setup() {
    if (isMobileDevice()) {
        fetch(`${PAGES_DIR}/${PAGE_COUNT_FILE}`)
            .then(response => response.text())
            .then(text => {
                const pageCount = parseInt(text, 10);
                if (!isNaN(pageCount)) {
                    loadImages(pageCount);
                }
            });
    } else {
        const container = document.getElementById(CONTENT_CONTAINER_ID);
        container.innerHTML = PDF_HTML;
        container.className = PDF_CONTAINER_CLASS;
    }
}

window.onload = setup;
window.onresize = () => { if (mobileThresholdCrossed()) {setup();} };
