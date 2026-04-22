(function (blocks, element, blockEditor, i18n) {
    var el = element.createElement;
    var __ = i18n.__;
    var useBlockProps = blockEditor.useBlockProps;
    var useBlockPropsSave = useBlockProps.save;

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

            return el('div', blockProps,
                el('div', { style: { padding: '20px', background: '#fff', border: '1px solid #ccc', marginBottom: '10px' } },
                    el('h3', { style: { marginBottom: '15px' } }, 'Hero Banner Settings'),
                    
                    el('label', { style: { display: 'block', marginBottom: '5px', fontWeight: 'bold' } }, 'Heading:'),
                    el('input', {
                        type: 'text',
                        value: props.attributes.heading,
                        onChange: function (e) { props.setAttributes({ heading: e.target.value }); },
                        placeholder: 'Enter heading...',
                        style: { width: '100%', padding: '8px', marginBottom: '15px' }
                    }),
                    
                    el('label', { style: { display: 'block', marginBottom: '5px', fontWeight: 'bold' } }, 'Content:'),
                    el('textarea', {
                        value: props.attributes.content,
                        onChange: function (e) { props.setAttributes({ content: e.target.value }); },
                        placeholder: 'Enter content...',
                        style: { width: '100%', padding: '8px', marginBottom: '15px', minHeight: '60px' }
                    }),
                    
                    el('label', { style: { display: 'block', marginBottom: '5px', fontWeight: 'bold' } }, 'Button Text:'),
                    el('input', {
                        type: 'text',
                        value: props.attributes.buttonText,
                        onChange: function (e) { props.setAttributes({ buttonText: e.target.value }); },
                        placeholder: 'Learn More',
                        style: { width: '100%', padding: '8px', marginBottom: '15px' }
                    }),
                    
                    el('label', { style: { display: 'block', marginBottom: '5px', fontWeight: 'bold' } }, 'Button URL:'),
                    el('input', {
                        type: 'text',
                        value: props.attributes.buttonUrl,
                        onChange: function (e) { props.setAttributes({ buttonUrl: e.target.value }); },
                        placeholder: '#',
                        style: { width: '100%', padding: '8px', marginBottom: '15px' }
                    }),
                    
                    el('label', { style: { display: 'block', marginBottom: '5px', fontWeight: 'bold' } }, 'Image URL:'),
                    el('input', {
                        type: 'text',
                        value: props.attributes.imageUrl,
                        onChange: function (e) { props.setAttributes({ imageUrl: e.target.value }); },
                        placeholder: 'https://example.com/image.jpg',
                        style: { width: '100%', padding: '8px', marginBottom: '15px' }
                    }),
                    
                    el('label', { style: { display: 'block', marginBottom: '5px', fontWeight: 'bold' } }, 'Image Alt:'),
                    el('input', {
                        type: 'text',
                        value: props.attributes.imageAlt,
                        onChange: function (e) { props.setAttributes({ imageAlt: e.target.value }); },
                        placeholder: 'Image description',
                        style: { width: '100%', padding: '8px', marginBottom: '15px' }
                    }),
                    
                    el('label', { style: { display: 'block', marginBottom: '5px', fontWeight: 'bold' } }, 'Alignment:'),
                    el('select', {
                        value: props.attributes.contentAlignment,
                        onChange: function (e) { props.setAttributes({ contentAlignment: e.target.value }); },
                        style: { width: '100%', padding: '8px', marginBottom: '15px' }
                    }, [
                        el('option', { value: 'left' }, 'Left'),
                        el('option', { value: 'center' }, 'Center'),
                        el('option', { value: 'right' }, 'Right')
                    ]),
                    
                    el('label', { style: { display: 'block', marginBottom: '5px', fontWeight: 'bold' } }, 'Background Color:'),
                    el('input', {
                        type: 'color',
                        value: props.attributes.backgroundColor || '#ffffff',
                        onChange: function (e) { props.setAttributes({ backgroundColor: e.target.value }); },
                        style: { width: '100%', height: '40px', marginBottom: '15px' }
                    }),
                    
                    el('label', { style: { display: 'block', marginBottom: '5px', fontWeight: 'bold' } }, 'Text Color:'),
                    el('input', {
                        type: 'color',
                        value: props.attributes.textColor || '#000000',
                        onChange: function (e) { props.setAttributes({ textColor: e.target.value }); },
                        style: { width: '100%', height: '40px', marginBottom: '15px' }
                    })
                ),
                
                el('section', { style: { backgroundColor: props.attributes.backgroundColor, padding: '40px' } },
                    el('div', { style: { display: 'flex', gap: '30px', alignItems: 'center', flexWrap: 'wrap' } },
                        props.attributes.imageUrl ? el('div', { style: { flex: '1 1 300px' } },
                            el('img', { src: props.attributes.imageUrl, alt: props.attributes.imageAlt, style: { width: '100%', display: 'block' } })
                        ) : null,
                        el('div', { style: { flex: '1 1 300px', textAlign: props.attributes.contentAlignment, color: props.attributes.textColor } },
                            el('h1', { style: { marginBottom: '15px' } }, props.attributes.heading || 'Heading'),
                            el('p', { style: { marginBottom: '20px' } }, props.attributes.content || 'Content'),
                            props.attributes.buttonText ? el('a', { href: props.attributes.buttonUrl, style: { padding: '12px 30px', backgroundColor: '#0073aa', color: '#fff', textDecoration: 'none', borderRadius: '5px' } }, props.attributes.buttonText) : null
                        )
                    )
                )
            );
        },

        save: function (props) {
            var blockProps = useBlockPropsSave({ className: 'hero hero-banner-block' });

            return el('section', Object.assign({}, blockProps, { style: { backgroundColor: props.attributes.backgroundColor } }),
                el('div', { style: { display: 'flex', gap: '30px', alignItems: 'center', flexWrap: 'wrap' } },
                    props.attributes.imageUrl ? el('div', { style: { flex: '1 1 300px' } },
                        el('img', { src: props.attributes.imageUrl, alt: props.attributes.imageAlt, style: { width: '100%', display: 'block' } })
                    ) : null,
                    el('div', { style: { flex: '1 1 300px', textAlign: props.attributes.contentAlignment, color: props.attributes.textColor } },
                        props.attributes.heading ? el('h1', { style: { marginBottom: '15px' } }, props.attributes.heading) : null,
                        props.attributes.content ? el('p', { style: { marginBottom: '20px' } }, props.attributes.content) : null,
                        props.attributes.buttonText ? el('a', { href: props.attributes.buttonUrl, style: { padding: '12px 30px', backgroundColor: '#0073aa', color: '#fff', textDecoration: 'none', borderRadius: '5px' } }, props.attributes.buttonText) : null
                    )
                )
            );
        },
    });
})(wp.blocks, wp.element, wp.blockEditor, wp.i18n);