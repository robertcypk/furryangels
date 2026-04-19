(function (blocks, element, blockEditor, i18n) {
    var el = element.createElement;
    var __ = i18n.__;
    var useBlockProps = blockEditor.useBlockProps;
    var useBlockPropsSave = useBlockProps.save;

    blocks.registerBlockType('furryangels/services-block', {
        title: __('Services Block', 'furryangels'),
        description: __('Editable services section with custom content and images.', 'furryangels'),
        icon: 'screenoptions',
        category: 'design',

        edit: function () {
            var blockProps = useBlockProps({ className: 'furryangels-services-block-editor' });

            return el('div', blockProps,
                el('div', { style: { padding: '20px', background: '#f5f5f5', border: '1px dashed #ccc' } },
                    el('h3', { style: { margin: '0 0 10px' } }, 'Services Block'),
                    el('p', { style: { margin: 0, color: '#666' } }, 'This block displays the services section. Edit the content in the content area below.')
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
                    el('div', { className: 'services-grid' },
                        el('div', { className: 'service-card' },
                            el('p', { className: 'icon' }, 'Pet Care'),
                            el('h3', {}, 'Veterinary Care'),
                            el('p', {}, 'Professional health checkups and medical services for your beloved pets.')
                        ),
                        el('div', { className: 'service-card' },
                            el('p', { className: 'icon' }, 'Grooming'),
                            el('h3', {}, 'Grooming'),
                            el('p', {}, 'Professional grooming services to keep your pets looking their best.')
                        ),
                        el('div', { className: 'service-card' },
                            el('p', { className: 'icon' }, 'Nutrition'),
                            el('h3', {}, 'Nutrition'),
                            el('p', {}, 'Expert advice on diet and nutrition for optimal pet health.')
                        ),
                        el('div', { className: 'service-card' },
                            el('p', { className: 'icon' }, 'Training'),
                            el('h3', {}, 'Training'),
                            el('p', {}, 'Professional dog training for all ages and breeds.')
                        )
                    )
                )
            );
        },
    });
})(window.wp.blocks, window.wp.element, window.wp.blockEditor, window.wp.i18n);