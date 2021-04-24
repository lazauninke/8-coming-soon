/*
1. sugeneruoti HTML
2. stebeti kada ivyksta scroll'as
    - gal jau patomas kazkuris is progress-bar?
        - jei taip: tai animuojam jo loading'a
            - bet jei jau buvo suanimuotas, tai daugiau to paties nebekartojame
        - jei ne: tai nieko... laukiam :)
*/

function progressBar(selector, data) {
    // 1. generuojame HTML
    const DOM = document.querySelector(selector);
    let HTML = '';

    for (let i = 0; i < data.length; i++) {
        const bar = data[i];
        HTML += `<div class="progress-bar">
                    <div class="top">
                        <div class="label">${bar.label}</div>
                        <div class="value">${bar.value}%</div>
                    </div>
                    <div class="bottom">
                        <div class="progress" style="width: ${bar.value}%;">
                            <div class="bar"></div>
                        </div>
                    </div>
                </div>`;
    }

    DOM.innerHTML += HTML;

    // 2. stebime scroll'a
    const progressBarsDOM = DOM.querySelectorAll('.progress-bar');

    for (const progressBarDOM of progressBarsDOM) {
        addEventListener('scroll', () => {
            const elementTop = progressBarDOM.offsetTop;
            const elementHeight = progressBarDOM.clientHeight;

            const isVisible = scrollY + innerHeight >= elementTop + elementHeight;

            if (isVisible) {
                progressBarDOM.classList.add('animate');
            }
        })
    }

}

export { progressBar }