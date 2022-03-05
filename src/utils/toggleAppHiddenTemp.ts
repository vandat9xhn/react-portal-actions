//
export function toggleAppHiddenTemp({ is_hidden = false }) {
    const html = document.getElementsByTagName('html')[0];
    const c_count_hidden = parseInt(html.dataset.scrollNoneOnce || '0');

    const new_count_hidden = (c_count_hidden || 0) + (is_hidden ? 1 : -1);

    if (new_count_hidden > 0) {
        html.dataset.scrollNoneOnce = `${new_count_hidden}`;
    } else {
        html.removeAttribute('data-scroll-none-once');
    }
}
