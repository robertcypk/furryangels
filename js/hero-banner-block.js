(function (blocks, element, blockEditor, components, i18n) {
    var el = element.createElement;
    var __ = i18n.__;
    var useBlockProps = blockEditor.useBlockProps;
    var InnerBlocks = blockEditor.InnerBlocks;
    var InspectorControls = blockEditor.InspectorControls;
    var HERO_ALLOWED_BLOCKS = [
        'core/heading',
        'core/paragraph',
        'core/image',
        'core/buttons',
        'core/button',
        'core/group',
        'core/columns',
        'core/column',
        'core/list',
        'core/spacer',
    ];
    var HERO_TEMPLATE = [
        ['core/columns', { verticalAlignment: 'center', className: 'hero-banner-columns' }, [
            ['core/column', { verticalAlignment: 'center', width: '55%' }, [
                ['core/heading', { level: 1, content: 'Furry Angels Banner' }],
                ['core/paragraph', { content: 'Add your hero text, image, and call to action here.' }],
                ['core/buttons', {}, [
                    ['core/button', { text: 'Contact Us', className: 'btn' }],
                ]],
            ]],
            ['core/column', { verticalAlignment: 'center', width: '45%' }, [
                ['core/image', {}],
            ]],
        ]],
    ];

    blocks.registerBlockType('furryangels/hero-banner', {
        title: __('Hero Banner', 'furryangels'),
        description: __('Create a hero banner with editable images, headings, text, and buttons.', 'furryangels'),
        icon: 'cover-image',
        category: 'design',

        attributes: {
            backgroundImage: { type: 'object', default: null },
            backgroundRepeat: { type: 'string', default: 'no-repeat' },
            backgroundPosition: { type: 'string', default: 'center center' },
            backgroundSize: { type: 'string', default: 'cover' },
            backgroundColor: { type: 'string', default: '' },
            overlayOpacity: { type: 'number', default: 0 },
        },

        edit: function (props) {
            var blockProps = useBlockProps({
                className: 'furryangels-hero-banner-editor',
            });
            var backgroundStyle = {};
            if (props.attributes.backgroundImage && props.attributes.backgroundImage.url) {
                backgroundStyle.backgroundImage = 'url(' + props.attributes.backgroundImage.url + ')';
                backgroundStyle.backgroundRepeat = props.attributes.backgroundRepeat;
                backgroundStyle.backgroundPosition = props.attributes.backgroundPosition;
                backgroundStyle.backgroundSize = props.attributes.backgroundSize;
            }
            if (props.attributes.backgroundColor) {
                backgroundStyle.backgroundColor = props.attributes.backgroundColor;
            }

            return el(
                'div',
                blockProps,
                el(
                    InspectorControls,
                    null,
                    el(
                        'div',
                        { className: 'components-panel__body', style: { padding: '16px' } },
                        el('p', { style: { fontWeight: 'bold', marginBottom: '12px' } }, __('Background Settings', 'furryangels')),
                        el('p', { className: 'components-base-control__label' }, __('Background Image', 'furryangels')),
                        props.attributes.backgroundImage ? el(
                            'div',
                            null,
                            el('img', { src: props.attributes.backgroundImage.url, style: { maxWidth: '100%', height: 'auto', border: '1px solid #ddd', padding: '4px' } }),
                            el('button', {
                                onClick: function () { props.setAttributes({ backgroundImage: null }); },
                                style: { marginTop: '8px', padding: '6px 12px', cursor: 'pointer' }
                            }, __('Remove Image', 'furryangels'))
                        ) : el(
                            'div',
                            { style: { border: '2px dashed #ccc', padding: '20px', textAlign: 'center' } },
                            el('input', {
                                type: 'file',
                                accept: 'image/*',
                                onChange: function (e) {
                                    var file = e.target.files[0];
                                    if (file) {
                                        var reader = new FileReader();
                                        reader.onload = function (event) {
                                            props.setAttributes({ backgroundImage: { url: event.target.result, id: null } });
                                        };
                                        reader.readAsDataURL(file);
                                    }
                                },
                                style: { marginBottom: '8px' }
                            }),
                            el('p', { style: { margin: 0 } }, __('Click to upload background image', 'furryangels'))
                        ),
                        props.attributes.backgroundImage && el(
                            'div',
                            { style: { marginTop: '16px' } },
                            el('p', { className: 'components-base-control__label' }, __('Background Repeat', 'furryangels')),
                            el('select', {
                                value: props.attributes.backgroundRepeat,
                                onChange: function (e) { props.setAttributes({ backgroundRepeat: e.target.value }); },
                                style: { width: '100%', padding: '8px' }
                            }, [
                                el('option', { value: 'no-repeat' }, 'No Repeat'),
                                el('option', { value: 'repeat' }, 'Repeat'),
                                el('option', { value: 'repeat-x' }, 'Repeat X'),
                                el('option', { value: 'repeat-y' }, 'Repeat Y'),
                            ]),
                            el('p', { className: 'components-base-control__label', style: { marginTop: '12px' } }, __('Background Position', 'furryangels')),
                            el('select', {
                                value: props.attributes.backgroundPosition,
                                onChange: function (e) { props.setAttributes({ backgroundPosition: e.target.value }); },
                                style: { width: '100%', padding: '8px' }
                            }, [
                                el('option', { value: 'center center' }, 'Center Center'),
                                el('option', { value: 'center left' }, 'Center Left'),
                                el('option', { value: 'center right' }, 'Center Right'),
                                el('option', { value: 'top center' }, 'Top Center'),
                                el('option', { value: 'top left' }, 'Top Left'),
                                el('option', { value: 'top right' }, 'Top Right'),
                                el('option', { value: 'bottom center' }, 'Bottom Center'),
                                el('option', { value: 'bottom left' }, 'Bottom Left'),
                                el('option', { value: 'bottom right' }, 'Bottom Right'),
                            ]),
                            el('p', { className: 'components-base-control__label', style: { marginTop: '12px' } }, __('Background Size', 'furryangels')),
                            el('select', {
                                value: props.attributes.backgroundSize,
                                onChange: function (e) { props.setAttributes({ backgroundSize: e.target.value }); },
                                style: { width: '100%', padding: '8px' }
                            }, [
                                el('option', { value: 'cover' }, 'Cover'),
                                el('option', { value: 'contain' }, 'Contain'),
                                el('option', { value: 'auto' }, 'Auto'),
                                el('option', { value: '100% 100%' }, '100% 100%'),
                            ])
                        ),
                        el('p', { className: 'components-base-control__label', style: { marginTop: '16px' } }, __('Background Color', 'furryangels')),
                        el('input', {
                            type: 'color',
                            value: props.attributes.backgroundColor || '#ffffff',
                            onChange: function (e) { props.setAttributes({ backgroundColor: e.target.value }); },
                            style: { width: '100%', height: '40px' }
                        }),
                        el('p', { className: 'components-base-control__label', style: { marginTop: '12px' } }, __('Overlay Opacity', 'furryangels')),
                        el('input', {
                            type: 'range',
                            min: 0,
                            max: 100,
                            value: props.attributes.overlayOpacity || 0,
                            onChange: function (e) { props.setAttributes({ overlayOpacity: parseInt(e.target.value, 10) }); },
                            style: { width: '100%' }
                        })
                    )
                ),
                el(
                    'section',
                    { className: 'hero hero-banner-block', style: backgroundStyle },
                    props.attributes.overlayOpacity > 0 && el('div', {
                        className: 'hero-overlay',
                        style: { opacity: props.attributes.overlayOpacity / 100, backgroundColor: '#000000' }
                    }),
                    el(
                        'div',
                        { className: 'container hero-banner-block__content' },
                        el(InnerBlocks, {
                            allowedBlocks: HERO_ALLOWED_BLOCKS,
                            template: HERO_TEMPLATE,
                            templateLock: false,
                        })
                    )
                )
            );
        },

        save: function (props) {
            var backgroundStyle = {};
            if (props.attributes.backgroundImage && props.attributes.backgroundImage.url) {
                backgroundStyle.backgroundImage = 'url(' + props.attributes.backgroundImage.url + ')';
                backgroundStyle.backgroundRepeat = props.attributes.backgroundRepeat;
                backgroundStyle.backgroundPosition = props.attributes.backgroundPosition;
                backgroundStyle.backgroundSize = props.attributes.backgroundSize;
            }
            if (props.attributes.backgroundColor) {
                backgroundStyle.backgroundColor = props.attributes.backgroundColor;
            }

            var blockProps = blockEditor.useBlockProps.save({
                className: 'hero hero-banner-block',
                style: backgroundStyle,
            });

            return el(
                'section',
                blockProps,
                props.attributes.overlayOpacity > 0 && el('div', {
                    className: 'hero-overlay',
                    style: { opacity: props.attributes.overlayOpacity / 100, backgroundColor: '#000000' }
                }),
                el(
                    'div',
                    { className: 'container hero-banner-block__content' },
                    el(InnerBlocks.Content)
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
            var blockProps = useBlockProps({
                className: 'furryangels-services-section-editor',
            });

            return el(
                'section',
                Object.assign({}, blockProps, { id: 'services' }),
                el('div', { className: 'bubble-1' }),
                el('div', { className: 'bubble-2' }),
                el('div', { className: 'bubble-3' }),
                el(
                    'div',
                    { className: 'container' },
                    el(blockEditor.InnerBlocks, {
                        allowedBlocks: [
                            'core/heading',
                            'core/paragraph',
                            'core/group',
                            'core/columns',
                            'core/column',
                            'core/buttons',
                            'core/button',
                            'core/list',
                            'core/image',
                        ],
                        template: [
                            ['core/heading', { level: 2, className: 'section-title', content: 'Our Services' }],
                            ['core/group', { className: 'services-grid', style: { spacing: { blockGap: '30px' } }, layout: { type: 'grid', columns: 4 } }, [
                                ['core/group', { className: 'service-card', style: { layout: { selfStretch: 'fit' } } }, [
                                    ['core/paragraph', { className: 'icon', content: 'Pet Care' }],
                                    ['core/heading', { level: 3, content: 'Veterinary Care' }],
                                    ['core/paragraph', { content: 'Professional health checkups and medical services for your beloved pets.' }],
                                ]],
                                ['core/group', { className: 'service-card' }, [
                                    ['core/paragraph', { className: 'icon', content: 'Grooming' }],
                                    ['core/heading', { level: 3, content: 'Grooming' }],
                                    ['core/paragraph', { content: 'Professional grooming services to keep your pets looking their best.' }],
                                ]],
                                ['core/group', { className: 'service-card' }, [
                                    ['core/paragraph', { className: 'icon', content: 'Nutrition' }],
                                    ['core/heading', { level: 3, content: 'Nutrition' }],
                                    ['core/paragraph', { content: 'Expert advice on diet and nutrition for optimal pet health.' }],
                                ]],
                                ['core/group', { className: 'service-card', style: { layout: { selfStretch: 'fit' } } }, [
                                    ['core/paragraph', { className: 'icon', content: 'Pet Care' }],
                                    ['core/heading', { level: 3, content: 'Veterinary Care' }],
                                    ['core/paragraph', { content: 'Professional health checkups and medical services for your beloved pets.' }],
                                ]],
                                ['core/group', { className: 'service-card', style: { layout: { selfStretch: 'fit' } } }, [
                                    ['core/paragraph', { className: 'icon', content: 'Grooming' }],
                                    ['core/heading', { level: 3, content: 'Grooming' }],
                                    ['core/paragraph', { content: 'Professional grooming services to keep your pets looking their best.' }],
                                ]],
                                ['core/group', { className: 'service-card', style: { layout: { selfStretch: 'fit' } } }, [
                                    ['core/paragraph', { className: 'icon', content: 'Nutrition' }],
                                    ['core/heading', { level: 3, content: 'Nutrition' }],
                                    ['core/paragraph', { content: 'Expert advice on diet and nutrition for optimal pet health.' }],
                                ]],
                                ['core/group', { className: 'service-card', style: { layout: { selfStretch: 'fit' } } }, [
                                    ['core/paragraph', { className: 'icon', content: 'Training' }],
                                    ['core/heading', { level: 3, content: 'Training' }],
                                    ['core/paragraph', { content: 'Professional dog training for all ages and breeds.' }],
                                ]],
                            ]],
                        ],
                        templateLock: false,
                    })
                )
            );
        },

        save: function () {
            var blockProps = blockEditor.useBlockProps.save({
                className: 'section furryangels-services-section',
                id: 'services',
            });

            return el(
                'section',
                blockProps,
                el('div', { className: 'bubble-1' }),
                el('div', { className: 'bubble-2' }),
                el('div', { className: 'bubble-3' }),
                el(
                    'div',
                    { className: 'container' },
                    el(blockEditor.InnerBlocks.Content)
                )
            );
        },
    });
})(window.wp.blocks, window.wp.element, window.wp.blockEditor, window.wp.components, window.wp.i18n);
