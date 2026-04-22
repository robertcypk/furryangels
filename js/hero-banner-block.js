(function(wp) {
    'use strict';
    
    var blocks = wp.blocks;
    var element = wp.element;
    var blockEditor = wp.blockEditor;
    var i18n = wp.i18n;
    
    var registerBlockType = blocks.registerBlockType;
    var createElement = element.createElement;
    var useBlockProps = blockEditor.useBlockProps;
    var useBlockPropsSave = useBlockProps.save;
    var __ = i18n.__;
    
    registerBlockType('furryangels/hero-banner', {
        title: __('Hero Banner', 'furryangels'),
        description: __('Hero banner with image and content side by side', 'furryangels'),
        icon: 'cover-image',
        category: 'design',
        
        attributes: {
            heading: { type: 'string', default: '' },
            content: { type: 'string', default: '' },
            buttonText: { type: 'string', default: '' },
            buttonUrl: { type: 'string', default: '#' },
            imageUrl: { type: 'string', default: '' },
            imageAlt: { type: 'string', default: '' },
            alignment: { type: 'string', default: 'center' },
            bgColor: { type: 'string', default: '#ffffff' },
            textColor: { type: 'string', default: '#000000' }
        },
        
        edit: function(props) {
            var attrs = props.attributes;
            var blockProps = useBlockProps({ className: 'hero-banner-editor' });
            
            return createElement('div', blockProps,
                createElement('div', { className: 'settings-panel', style: { padding: '15px', background: '#fff', border: '1px solid #ddd' } },
                    createElement('h4', null, 'Hero Banner Settings'),
                    
                    createElement('label', null, 'Heading'),
                    createElement('input', {
                        type: 'text',
                        value: attrs.heading,
                        onChange: function(e) { props.setAttributes({ heading: e.target.value }); },
                        placeholder: 'Enter heading',
                        style: { width: '100%', marginBottom: '10px' }
                    }),
                    
                    createElement('label', null, 'Content'),
                    createElement('textarea', {
                        value: attrs.content,
                        onChange: function(e) { props.setAttributes({ content: e.target.value }); },
                        placeholder: 'Enter content',
                        style: { width: '100%', marginBottom: '10px' }
                    }),
                    
                    createElement('label', null, 'Button Text'),
                    createElement('input', {
                        type: 'text',
                        value: attrs.buttonText,
                        onChange: function(e) { props.setAttributes({ buttonText: e.target.value }); },
                        placeholder: 'Click Here',
                        style: { width: '100%', marginBottom: '10px' }
                    }),
                    
                    createElement('label', null, 'Button URL'),
                    createElement('input', {
                        type: 'text',
                        value: attrs.buttonUrl,
                        onChange: function(e) { props.setAttributes({ buttonUrl: e.target.value }); },
                        placeholder: '#',
                        style: { width: '100%', marginBottom: '10px' }
                    }),
                    
                    createElement('label', null, 'Image URL'),
                    createElement('input', {
                        type: 'text',
                        value: attrs.imageUrl,
                        onChange: function(e) { props.setAttributes({ imageUrl: e.target.value }); },
                        placeholder: 'https://example.com/image.jpg',
                        style: { width: '100%', marginBottom: '10px' }
                    }),
                    
                    createElement('label', null, 'Image Alt'),
                    createElement('input', {
                        type: 'text',
                        value: attrs.imageAlt,
                        onChange: function(e) { props.setAttributes({ imageAlt: e.target.value }); },
                        placeholder: 'Image description',
                        style: { width: '100%', marginBottom: '10px' }
                    }),
                    
                    createElement('label', null, 'Alignment'),
                    createElement('select', {
                        value: attrs.alignment,
                        onChange: function(e) { props.setAttributes({ alignment: e.target.value }); },
                        style: { width: '100%', marginBottom: '10px' }
                    },
                        createElement('option', { value: 'left' }, 'Left'),
                        createElement('option', { value: 'center' }, 'Center'),
                        createElement('option', { value: 'right' }, 'Right')
                    ),
                    
                    createElement('label', null, 'Background Color'),
                    createElement('input', {
                        type: 'color',
                        value: attrs.bgColor || '#ffffff',
                        onChange: function(e) { props.setAttributes({ bgColor: e.target.value }); },
                        style: { width: '100%', height: '30px', marginBottom: '10px' }
                    }),
                    
                    createElement('label', null, 'Text Color'),
                    createElement('input', {
                        type: 'color',
                        value: attrs.textColor || '#000000',
                        onChange: function(e) { props.setAttributes({ textColor: e.target.value }); },
                        style: { width: '100%', height: '30px', marginBottom: '10px' }
                    })
                ),
                
                createElement('div', { 
                    className: 'hero-banner-preview',
                    style: { padding: '30px', backgroundColor: attrs.bgColor, color: attrs.textColor }
                },
                    createElement('div', { style: { display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '20px' } },
                        attrs.imageUrl ? createElement('div', { style: { flex: '1 1 300px' } },
                            createElement('img', {
                                src: attrs.imageUrl,
                                alt: attrs.imageAlt,
                                style: { width: '100%', display: 'block' }
                            })
                        ) : null,
                        createElement('div', { 
                            style: { 
                                flex: '1 1 300px', 
                                textAlign: attrs.alignment 
                            } 
                        },
                            createElement('h2', { style: { marginBottom: '10px' } }, attrs.heading || 'Heading'),
                            createElement('p', { marginBottom: '15px' }, attrs.content || 'Content'),
                            attrs.buttonText ? createElement('a', {
                                href: attrs.buttonUrl,
                                style: { 
                                    padding: '10px 20px', 
                                    backgroundColor: '#0073aa', 
                                    color: '#fff',
                                    textDecoration: 'none'
                                }
                            }, attrs.buttonText) : null
                        )
                    )
                )
            );
        },
        
        save: function(props) {
            var attrs = props.attributes;
            var blockProps = useBlockPropsSave({ className: 'hero-banner-block' });
            
            return createElement('section', Object.assign({}, blockProps, { style: { backgroundColor: attrs.bgColor, color: attrs.textColor, padding: '40px' } }),
                createElement('div', { style: { display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '20px' } },
                    attrs.imageUrl ? createElement('div', { style: { flex: '1 1 300px' } },
                        createElement('img', {
                            src: attrs.imageUrl,
                            alt: attrs.imageAlt,
                            style: { width: '100%', display: 'block' }
                        })
                    ) : null,
                    createElement('div', { 
                        style: { 
                            flex: '1 1 300px', 
                            textAlign: attrs.alignment 
                        } 
                    },
                        attrs.heading ? createElement('h2', { style: { marginBottom: '10px' } }, attrs.heading) : null,
                        attrs.content ? createElement('p', { marginBottom: '15px' }, attrs.content) : null,
                        attrs.buttonText ? createElement('a', {
                            href: attrs.buttonUrl,
                            style: { 
                                padding: '10px 20px', 
                                backgroundColor: '#0073aa', 
                                color: '#fff',
                                textDecoration: 'none'
                            }
                        }, attrs.buttonText) : null
                    )
                )
            );
        }
    });
})(window.wp);