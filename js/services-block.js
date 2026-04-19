(function (blocks, element, blockEditor, i18n) {
    var el = element.createElement;
    var useBlockProps = blockEditor.useBlockProps;
    var useBlockPropsSave = useBlockProps.save;

    blocks.registerBlockType('furryangels/services-block', {
        title: 'Services Block',
        description: 'Services section with grid layout',
        icon: 'screenoptions',
        category: 'design',

        edit: function () {
            return el('div', { style: { padding: '20px', background: '#f0f0f0' } }, 'Services Block');
        },

        save: function () {
            var blockProps = useBlockPropsSave({ className: 'section', id: 'services' });
            return el('section', blockProps,
                el('div', { className: 'container' },
                    el('h2', { className: 'section-title' }, 'Our Services'),
                    el('div', { className: 'services-grid' },
                        el('div', { className: 'service-card' }, el('p', {}, 'Service 1')),
                        el('div', { className: 'service-card' }, el('p', {}, 'Service 2')),
                        el('div', { className: 'service-card' }, el('p', {}, 'Service 3')),
                        el('div', { className: 'service-card' }, el('p', {}, 'Service 4'))
                    )
                )
            );
        },
    });
})(window.wp.blocks, window.wp.element, window.wp.blockEditor, window.wp.i18n);