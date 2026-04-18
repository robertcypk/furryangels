(function (blocks, element, blockEditor, components, i18n) {
    var el = element.createElement;
    var __ = i18n.__;
    var useBlockProps = blockEditor.useBlockProps;
    var InnerBlocks = blockEditor.InnerBlocks;
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
                    components.InspectorControls,
                    null,
                    el(
                        components.PanelBody,
                        { title: __('Background Settings', 'furryangels'), initialOpen: true },
                        el('p', { className: 'components-base-control__label' }, __('Background Image', 'furryangels')),
                        props.attributes.backgroundImage ? el(
                            'div',
                            { className: 'components-placeholder__preview' },
                            el('img', { src: props.attributes.backgroundImage.url, style: { maxWidth: '100%', height: 'auto' } }),
                            el(components.Button, {
                                isDestructive: true,
                                onClick: function () { props.setAttributes({ backgroundImage: null }); },
                                style: { marginTop: '8px' }
                            }, __('Remove Image', 'furryangels'))
                        ) : el(components.MediaPlaceholder, {
                            onSelect: function (media) {
                                props.setAttributes({ backgroundImage: { url: media.url, id: media.id } });
                            },
                            accept: 'image/*',
                            allowedTypes: ['image'],
                            addToStack: true,
                        }),
                        props.attributes.backgroundImage && el(
                            'div',
                            { style: { marginTop: '16px' } },
                            el('p', { className: 'components-base-control__label' }, __('Background Repeat', 'furryangels')),
                            el(components.SelectControl, {
                                value: props.attributes.backgroundRepeat,
                                options: [
                                    { label: 'No Repeat', value: 'no-repeat' },
                                    { label: 'Repeat', value: 'repeat' },
                                    { label: 'Repeat X', value: 'repeat-x' },
                                    { label: 'Repeat Y', value: 'repeat-y' },
                                ],
                                onChange: function (value) { props.setAttributes({ backgroundRepeat: value }); },
                            }),
                            el('p', { className: 'components-base-control__label', style: { marginTop: '12px' } }, __('Background Position', 'furryangels')),
                            el(components.SelectControl, {
                                value: props.attributes.backgroundPosition,
                                options: [
                                    { label: 'Center Center', value: 'center center' },
                                    { label: 'Center Left', value: 'center left' },
                                    { label: 'Center Right', value: 'center right' },
                                    { label: 'Top Center', value: 'top center' },
                                    { label: 'Top Left', value: 'top left' },
                                    { label: 'Top Right', value: 'top right' },
                                    { label: 'Bottom Center', value: 'bottom center' },
                                    { label: 'Bottom Left', value: 'bottom left' },
                                    { label: 'Bottom Right', value: 'bottom right' },
                                ],
                                onChange: function (value) { props.setAttributes({ backgroundPosition: value }); },
                            }),
                            el('p', { className: 'components-base-control__label', style: { marginTop: '12px' } }, __('Background Size', 'furryangels')),
                            el(components.SelectControl, {
                                value: props.attributes.backgroundSize,
                                options: [
                                    { label: 'Cover', value: 'cover' },
                                    { label: 'Contain', value: 'contain' },
                                    { label: 'Auto', value: 'auto' },
                                    { label: '100% 100%', value: '100% 100%' },
                                ],
                                onChange: function (value) { props.setAttributes({ backgroundSize: value }); },
                            })
                        ),
                        el('p', { className: 'components-base-control__label', style: { marginTop: '16px' } }, __('Background Color', 'furryangels')),
                        el(components.ColorPicker, {
                            value: props.attributes.backgroundColor || '',
                            onChange: function (value) { props.setAttributes({ backgroundColor: value }); },
                        }),
                        el('p', { className: 'components-base-control__label', style: { marginTop: '12px' } }, __('Overlay Opacity', 'furryangels')),
                        el(components.RangeControl, {
                            value: props.attributes.overlayOpacity || 0,
                            min: 0,
                            max: 100,
                            onChange: function (value) { props.setAttributes({ overlayOpacity: value }); },
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
                className: 'section section-dark furryangels-services-section',
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
