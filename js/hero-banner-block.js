(function (blocks, element, blockEditor, i18n) {
    var el = element.createElement;
    var __ = i18n.__;
    var useBlockProps = blockEditor.useBlockProps;
    var InnerBlocks = blockEditor.InnerBlocks;

    blocks.registerBlockType('furryangels/hero-banner', {
        title: __('Hero Banner', 'furryangels'),
        description: __('Create a hero banner with editable images, headings, text, and buttons.', 'furryangels'),
        icon: 'cover-image',
        category: 'design',

        attributes: {
            backgroundImage: { type: 'string', default: '' },
            backgroundRepeat: { type: 'string', default: 'no-repeat' },
            backgroundPosition: { type: 'string', default: 'center center' },
            backgroundSize: { type: 'string', default: 'cover' },
            backgroundColor: { type: 'string', default: '' },
            overlayOpacity: { type: 'number', default: 0 },
        },

        edit: function (props) {
            var blockProps = useBlockProps({ className: 'furryangels-hero-banner-editor' });
            var bgStyle = {};
            if (props.attributes.backgroundImage) bgStyle.backgroundImage = 'url(' + props.attributes.backgroundImage + ')';
            if (props.attributes.backgroundRepeat) bgStyle.backgroundRepeat = props.attributes.backgroundRepeat;
            if (props.attributes.backgroundPosition) bgStyle.backgroundPosition = props.attributes.backgroundPosition;
            if (props.attributes.backgroundSize) bgStyle.backgroundSize = props.attributes.backgroundSize;
            if (props.attributes.backgroundColor) bgStyle.backgroundColor = props.attributes.backgroundColor;

            return el('div', blockProps,
                el('div', { className: 'hero-banner-preview', style: Object.assign({ padding: '40px', minHeight: '300px' }, bgStyle) },
                    el('div', { className: 'hero-banner-settings', style: { background: '#fff', padding: '15px', marginBottom: '15px', border: '1px solid #ccc' } },
                        el('p', { style: { margin: '0 0 10px', fontWeight: 'bold' } }, 'Background Settings'),
                        el('label', { style: { display: 'block', marginBottom: '10px' } }, 'Image URL: ',
                            el('input', {
                                type: 'text',
                                value: props.attributes.backgroundImage,
                                onChange: function (e) { props.setAttributes({ backgroundImage: e.target.value }); },
                                style: { width: '100%', padding: '5px' }
                            })
                        ),
                        el('label', { style: { display: 'block', marginBottom: '10px' } }, 'Repeat: ',
                            el('select', {
                                value: props.attributes.backgroundRepeat,
                                onChange: function (e) { props.setAttributes({ backgroundRepeat: e.target.value }); }
                            }, [
                                el('option', { value: 'no-repeat' }, 'No Repeat'),
                                el('option', { value: 'repeat' }, 'Repeat'),
                                el('option', { value: 'repeat-x' }, 'Repeat X'),
                                el('option', { value: 'repeat-y' }, 'Repeat Y')
                            ])
                        ),
                        el('label', { style: { display: 'block', marginBottom: '10px' } }, 'Position: ',
                            el('select', {
                                value: props.attributes.backgroundPosition,
                                onChange: function (e) { props.setAttributes({ backgroundPosition: e.target.value }); }
                            }, [
                                el('option', { value: 'center center' }, 'Center Center'),
                                el('option', { value: 'center left' }, 'Center Left'),
                                el('option', { value: 'center right' }, 'Center Right'),
                                el('option', { value: 'top center' }, 'Top Center'),
                                el('option', { value: 'top left' }, 'Top Left'),
                                el('option', { value: 'top right' }, 'Top Right'),
                                el('option', { value: 'bottom center' }, 'Bottom Center'),
                                el('option', { value: 'bottom left' }, 'Bottom Left'),
                                el('option', { value: 'bottom right' }, 'Bottom Right')
                            ])
                        ),
                        el('label', { style: { display: 'block', marginBottom: '10px' } }, 'Size: ',
                            el('select', {
                                value: props.attributes.backgroundSize,
                                onChange: function (e) { props.setAttributes({ backgroundSize: e.target.value }); }
                            }, [
                                el('option', { value: 'cover' }, 'Cover'),
                                el('option', { value: 'contain' }, 'Contain'),
                                el('option', { value: 'auto' }, 'Auto')
                            ])
                        ),
                        el('label', { style: { display: 'block', marginBottom: '10px' } }, 'Color: ',
                            el('input', {
                                type: 'color',
                                value: props.attributes.backgroundColor || '#ffffff',
                                onChange: function (e) { props.setAttributes({ backgroundColor: e.target.value }); }
                            })
                        ),
                        el('label', { style: { display: 'block' } }, 'Overlay: ',
                            el('input', {
                                type: 'range',
                                min: 0,
                                max: 100,
                                value: props.attributes.overlayOpacity || 0,
                                onChange: function (e) { props.setAttributes({ overlayOpacity: parseInt(e.target.value, 10) }); }
                            })
                        )
                    ),
                    el(InnerBlocks, { allowedBlocks: ['core/heading', 'core/paragraph', 'core/image', 'core/buttons', 'core/button', 'core/group', 'core/columns', 'core/column', 'core/list', 'core/spacer'] })
                )
            );
        },

        save: function (props) {
            var bgStyle = {};
            if (props.attributes.backgroundImage) bgStyle.backgroundImage = 'url(' + props.attributes.backgroundImage + ')';
            if (props.attributes.backgroundRepeat) bgStyle.backgroundRepeat = props.attributes.backgroundRepeat;
            if (props.attributes.backgroundPosition) bgStyle.backgroundPosition = props.attributes.backgroundPosition;
            if (props.attributes.backgroundSize) bgStyle.backgroundSize = props.attributes.backgroundSize;
            if (props.attributes.backgroundColor) bgStyle.backgroundColor = props.attributes.backgroundColor;

            var blockProps = blockEditor.useBlockProps.save({ className: 'hero hero-banner-block', style: bgStyle });

            return el('section', blockProps,
                props.attributes.overlayOpacity > 0 ? el('div', { className: 'hero-overlay', style: { opacity: props.attributes.overlayOpacity / 100, backgroundColor: '#000', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 } }) : null,
                el('div', { className: 'container hero-banner-block__content', style: { position: 'relative', zIndex: 1 } },
                    el(blockEditor.InnerBlocks.Content)
                )
            );
        },
    });

    blocks.registerBlockType('furryangels/services-section', {
        title: __('Services Section', 'furryangels'),
        description: __('Editable services section wrapped with the existing #services section markup.', 'furryangels'),
        icon: 'screenoptions',
        category: 'design',

        edit: function () {
            var blockProps = useBlockProps({ className: 'furryangels-services-section-editor' });

            return el('section', Object.assign({}, blockProps, { id: 'services' }),
                el('div', { className: 'bubble-1' }),
                el('div', { className: 'bubble-2' }),
                el('div', { className: 'bubble-3' }),
                el('div', { className: 'container' },
                    el(blockEditor.InnerBlocks, {
                        allowedBlocks: ['core/heading', 'core/paragraph', 'core/group', 'core/columns', 'core/column', 'core/buttons', 'core/button', 'core/list', 'core/image'],
                        template: [
                            ['core/heading', { level: 2, className: 'section-title', content: 'Our Services' }]
                        ],
                        templateLock: false
                    })
                )
            );
        },

        save: function () {
            var blockProps = blockEditor.useBlockProps.save({ className: 'section furryangels-services-section', id: 'services' });

            return el('section', blockProps,
                el('div', { className: 'bubble-1' }),
                el('div', { className: 'bubble-2' }),
                el('div', { className: 'bubble-3' }),
                el('div', { className: 'container' },
                    el(blockEditor.InnerBlocks.Content)
                )
            );
        },
    });
})(window.wp.blocks, window.wp.element, window.wp.blockEditor, window.wp.i18n);