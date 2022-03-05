import { toggleDataset } from 'react-commons-ts';

//
export function toggleAppHiddenTemp({ is_hidden = false }) {
    const html = document.getElementsByTagName('html')[0];
    toggleDataset({
        elm: html,
        attr_str: 'data-scroll-none-once',
        is_remove: is_hidden
    });
}
