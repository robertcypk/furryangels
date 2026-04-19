(function (blocks, element, blockEditor, i18n) {
    var el = element.createElement;
    var useBlockProps = blockEditor.useBlockProps;
    var useBlockPropsSave = useBlockProps.save;

    blocks.registerBlockType('furryangels/hero-banner', {
        title: 'Hero Banner',
        description: 'Hero banner with background image',
        icon: 'cover-image',
        category: 'design',

        edit: function () {
            return el('div', { style: { padding: '20px', background: '#f0f0f0' } }, 'Hero Banner');
        },

        save: function () {
            var blockProps = useBlockPropsSave({ className: 'hero hero-banner-block' });
            return el('section', blockProps, el('div', { className: 'container' }, 'Hero Banner'));
        },
    });
})(window.wp.blocks, window.wp.element, window.wp.blockEditor, window.wp.i18n);