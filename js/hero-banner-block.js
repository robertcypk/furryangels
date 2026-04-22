(function (blocks, element, blockEditor, i18n) {
    var el = element.createElement;
    var __ = i18n.__;
    var useBlockProps = blockEditor.useBlockProps;
    var useBlockPropsSave = useBlockProps.save;
    var InspectorControls = blockEditor.InspectorControls;
    var RichText = blockEditor.RichText;
    var PanelBody = blockEditor.PanelBody;
    var TextControl = blockEditor.TextControl;
    var ColorPalette = blockEditor.ColorPalette;

    blocks.registerBlockType('furryangels/hero-banner', {
        title: __('Hero Banner', 'furryangels'),
        description: __('Hero banner with image and content side by side.', 'furryangels'),
        icon: 'cover-image',
        category: 'design',

        attributes: {
            imageUrl: { type: 'string', default: '' },
            imageAlt: { type: 'string', default: '' },
            heading: { type: 'string', default: '' },
            content: { type: 'string', default: '' },
            buttonText: { type: 'string', default: '' },
            buttonUrl: { type: 'string', default: '#' },
            contentAlignment: { type: 'string', default: 'center' },
            textColor: { type: 'string', default: '#000000' },
            backgroundColor: { type: 'string', default: '#ffffff' },
        },

        edit: function (props) {
            var blockProps = useBlockProps({ className: 'furryangels-hero-banner-editor' });

            return el('section', blockProps,
                el(InspectorControls, { key: 'inspector' },
                    el(PanelBody, { title: 'Content Settings', initialOpen: true },
                        el(RichText, {
                            tagName: 'h2',
                            value: props.attributes.heading,
                            onChange: function (value) { props.setAttributes({ heading: value }); },
                            placeholder: 'Enter heading...',
                            className: 'hero-banner-heading-input'
                        }),
                        el(RichText, {
                            tagName: 'p',
                            value: props.attributes.content,
                            onChange: function (value) { props.setAttributes({ content: value }); },
                            placeholder: 'Enter content...',
                            className: 'hero-banner-content-input'
                        }),
                        el(TextControl, {
                            label: 'Button Text',
                            value: props.attributes.buttonText,
                            onChange: function (value) { props.setAttributes({ buttonText: value }); },
                            placeholder: 'Learn More'
                        }),
                        el(TextControl, {
                            label: 'Button URL',
                            value: props.attributes.buttonUrl,
                            onChange: function (value) { props.setAttributes({ buttonUrl: value }); },
                            placeholder: '#'
                        })
                    ),
                    el(PanelBody, { title: 'Image Settings', initialOpen: true },
                        el(TextControl, {
                            label: 'Image URL',
                            value: props.attributes.imageUrl,
                            onChange: function (value) { props.setAttributes({ imageUrl: value }); },
                            placeholder: 'https://example.com/image.jpg'
                        }),
                        el(TextControl, {
                            label: 'Image Alt Text',
                            value: props.attributes.imageAlt,
                            onChange: function (value) { props.setAttributes({ imageAlt: value }); },
                            placeholder: 'Image description'
                        })
                    ),
                    el(PanelBody, { title: 'Style Settings', initialOpen: false },
                        el('p', { style: { marginBottom: '10px' } }, 'Content Alignment:'),
                        el('select', {
                            value: props.attributes.contentAlignment,
                            onChange: function (e) { props.setAttributes({ contentAlignment: e.target.value }); },
                            style: { width: '100%', padding: '8px', marginBottom: '15px' }
                        }, [
                            el('option', { value: 'left' }, 'Left'),
                            el('option', { value: 'center' }, 'Center'),
                            el('option', { value: 'right' }, 'Right')
                        ]),
                        el('p', { style: { marginBottom: '10px' } }, 'Text Color:'),
                        el('input', {
                            type: 'color',
                            value: props.attributes.textColor || '#000000',
                            onChange: function (e) { props.setAttributes({ textColor: e.target.value }); },
                            style: { width: '100%', height: '40px', marginBottom: '15px' }
                        }),
                        el('p', { style: { marginBottom: '10px' } }, 'Background Color:'),
                        el('input', {
                            type: 'color',
                            value: props.attributes.backgroundColor || '#ffffff',
                            onChange: function (e) { props.setAttributes({ backgroundColor: e.target.value }); },
                            style: { width: '100%', height: '40px', marginBottom: '15px' }
                        })
                    )
                ),
                el('section', { className: 'hero-banner-preview', style: { backgroundColor: props.attributes.backgroundColor, padding: '40px' } },
                    el('div', { className: 'container' },
                        el('div', { className: 'hero-banner-row', style: { display: 'flex', alignItems: 'center', gap: '30px', flexWrap: 'wrap' } },
                            props.attributes.imageUrl ? el('div', { className: 'hero-banner-image', style: { flex: '1', minWidth: '300px' } },
                                el('img', { src: props.attributes.imageUrl, alt: props.attributes.imageAlt, style: { width: '100%', height: 'auto', display: 'block' } })
                            ) : null,
                            el('div', { className: 'hero-banner-content', style: { flex: '1', minWidth: '300px', textAlign: props.attributes.contentAlignment, color: props.attributes.textColor } },
                                props.attributes.heading ? el('h1', { className: 'hero-banner-heading', style: { fontSize: '2.5rem', marginBottom: '15px' } }, props.attributes.heading) : null,
                                props.attributes.content ? el('p', { className: 'hero-banner-text', style: { fontSize: '1.1rem', marginBottom: '20px' } }, props.attributes.content) : null,
                                props.attributes.buttonText ? el('a', { href: props.attributes.buttonUrl, className: 'hero-banner-button', style: { display: 'inline-block', padding: '12px 30px', backgroundColor: '#0073aa', color: '#fff', textDecoration: 'none', borderRadius: '5px' } }, props.attributes.buttonText) : null
                            )
                        )
                    )
                )
            );
        },

        save: function (props) {
            var blockProps = useBlockPropsSave({ className: 'hero hero-banner-block' });

            return el('section', Object.assign({}, blockProps, { style: { backgroundColor: props.attributes.backgroundColor } }),
                el('div', { className: 'container' },
                    el('div', { className: 'hero-banner-row', style: { display: 'flex', alignItems: 'center', gap: '30px', flexWrap: 'wrap' } },
                        props.attributes.imageUrl ? el('div', { className: 'hero-banner-image', style: { flex: '1', minWidth: '300px' } },
                            el('img', { src: props.attributes.imageUrl, alt: props.attributes.imageAlt, style: { width: '100%', height: 'auto', display: 'block' } })
                        ) : null,
                        el('div', { className: 'hero-banner-content', style: { flex: '1', minWidth: '300px', textAlign: props.attributes.contentAlignment, color: props.attributes.textColor } },
                            props.attributes.heading ? el('h1', { className: 'hero-banner-heading', style: { fontSize: '2.5rem', marginBottom: '15px' } }, props.attributes.heading) : null,
                            props.attributes.content ? el('p', { className: 'hero-banner-text', style: { fontSize: '1.1rem', marginBottom: '20px' } }, props.attributes.content) : null,
                            props.attributes.buttonText ? el('a', { href: props.attributes.buttonUrl, className: 'hero-banner-button', style: { display: 'inline-block', padding: '12px 30px', backgroundColor: '#0073aa', color: '#fff', textDecoration: 'none', borderRadius: '5px' } }, props.attributes.buttonText) : null
                        )
                    )
                )
            );
        },
    });
})(window.wp.blocks, window.wp.element, window.wp.blockEditor, window.wp.i18n);