function socials(selector, data) {
    const DOM = document.querySelector(selector);       // null
    if (!DOM) {
        console.error('ERROR: nerasta norima vieta');
        return false;
    }

    let HTML = '';

    for (const social of data) {
        const { href, icon } = social;
        HTML += `<a href="${href}" target="_blank" class="fa fa-${icon} icon"></a>`;
    }

    DOM.innerHTML = HTML;
}

export { socials }