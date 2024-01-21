const PDF_HTML = '<iframe src="crimes-by-israel-20-jan-2024.pdf"></iframe>'
const CONTENT_CONTAINER_ID = 'contentContainer';
const PDF_CONTAINER_CLASS = 'pdf-container';
const IMAGES_CONTAINER_CLASS = 'images-container';
const PAGES_DIR = 'pages';
const PAGE_COUNT_FILE = 'page-count.txt';
const PAGE_FILE_BASE_NAME = 'page_'
const MOBILE_WIDTH_THRESHOLD = 600;

function isMobileDevice() {
    return (screen.width <= MOBILE_WIDTH_THRESHOLD) || (screen.height <= MOBILE_WIDTH_THRESHOLD);
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
