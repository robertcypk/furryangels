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

        edit: function () {
            var blockProps = useBlockProps({
                className: 'furryangels-hero-banner-editor',
            });

            return el(
                'div',
                blockProps,
                el(
                    'section',
                    { className: 'hero hero-banner-block' },
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

        save: function () {
            var blockProps = blockEditor.useBlockProps.save({
                className: 'hero hero-banner-block',
            });

            return el(
                'section',
                blockProps,
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
                            ['core/group', { className: 'services-grid' }, [
                                ['core/group', { className: 'service-card' }, [
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
                                ['core/group', { className: 'service-card' }, [
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
                el(
                    'div',
                    { className: 'container' },
                    el(blockEditor.InnerBlocks.Content)
                )
            );
        },
    });
})(window.wp.blocks, window.wp.element, window.wp.blockEditor, window.wp.components, window.wp.i18n);
