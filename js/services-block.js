(function (blocks, element, blockEditor, i18n) {
    var el = element.createElement;
    var __ = i18n.__;
    var useBlockProps = blockEditor.useBlockProps;
    var useBlockPropsSave = useBlockProps.save;
    var InnerBlocks = blockEditor.InnerBlocks;
    var InnerBlocksContent = InnerBlocks.Content;

    blocks.registerBlockType('furryangels/services-block', {
        title: __('Services Block', 'furryangels'),
        description: __('Editable services section with custom content and images.', 'furryangels'),
        icon: 'screenoptions',
        category: 'design',

        edit: function () {
            var blockProps = useBlockProps({ className: 'furryangels-services-block-editor' });

            return el('div', blockProps,
                el('section', { className: 'section', id: 'services', style: { padding: '40px', background: '#f5f5f5' } },
                    el('div', { className: 'bubble-1' }),
                    el('div', { className: 'bubble-2' }),
                    el('div', { className: 'bubble-3' }),
                    el('div', { className: 'container' },
                        el('h2', { className: 'section-title', style: { textAlign: 'center', marginBottom: '30px' } }, 'Our Services'),
                        el(InnerBlocks, {
                            allowedBlocks: ['core/columns', 'core/group', 'core/image', 'core/heading', 'core/paragraph', 'core/buttons', 'core/button'],
                            template: [
                                ['core/columns', { layout: { type: 'grid', columns: 4 } }, [
                                    ['core/group', { className: 'service-card' }, [
                                        ['core/image', { placeholder: 'Icon or Image' }],
                                        ['core/heading', { level: 3, placeholder: 'Service Title' }],
                                        ['core/paragraph', { placeholder: 'Service description...' }]
                                    ]],
                                    ['core/group', { className: 'service-card' }, [
                                        ['core/image', { placeholder: 'Icon or Image' }],
                                        ['core/heading', { level: 3, placeholder: 'Service Title' }],
                                        ['core/paragraph', { placeholder: 'Service description...' }]
                                    ]],
                                    ['core/group', { className: 'service-card' }, [
                                        ['core/image', { placeholder: 'Icon or Image' }],
                                        ['core/heading', { level: 3, placeholder: 'Service Title' }],
                                        ['core/paragraph', { placeholder: 'Service description...' }]
                                    ]],
                                    ['core/group', { className: 'service-card' }, [
                                        ['core/image', { placeholder: 'Icon or Image' }],
                                        ['core/heading', { level: 3, placeholder: 'Service Title' }],
                                        ['core/paragraph', { placeholder: 'Service description...' }]
                                    ]]
                                ]]
                            ],
                            templateLock: false
                        })
                    )
                )
            );
        },

        save: function () {
            var blockProps = useBlockPropsSave({ className: 'section', id: 'services' });

            return el('section', blockProps,
                el('div', { className: 'bubble-1' }),
                el('div', { className: 'bubble-2' }),
                el('div', { className: 'bubble-3' }),
                el('div', { className: 'container' },
                    el('h2', { className: 'section-title' }, 'Our Services'),
                    el(InnerBlocksContent)
                )
            );
        },
    });
})(window.wp.blocks, window.wp.element, window.wp.blockEditor, window.wp.i18n);