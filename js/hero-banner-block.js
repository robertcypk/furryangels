(function(wp) {
    'use strict';
    
    var blocks = wp.blocks;
    var element = wp.element;
    var blockEditor = wp.blockEditor;
    var i18n = wp.i18n;
    var components = wp.components;
    
    var registerBlockType = blocks.registerBlockType;
    var createElement = element.createElement;
    var useBlockProps = blockEditor.useBlockProps;
    var useBlockPropsSave = useBlockProps.save;
    var InspectorControls = blockEditor.InspectorControls;
    var PanelBody = components.PanelBody;
    var TextControl = components.TextControl;
    var SelectControl = components.SelectControl;
    var __ = i18n.__;
    
    function getStyledHeading(heading, style, colors, textColor, fontSize, lineHeight) {
        if (!heading) return null;
        
        var headingStyle = { 
            marginBottom: '10px', 
            fontSize: fontSize || '2.5rem',
            lineHeight: lineHeight || '1.2'
        };
        
        var colorArray = (style !== 'normal' && colors) ? colors.split(',').map(function(c) { return c.trim(); }) : [];
        
        if (style === 'gradient') {
            var words = heading.split(' ');
            var styledElements = words.map(function(word, i) {
                var color = colorArray[i] || textColor;
                return createElement('span', { key: i, style: { background: '-webkit-linear-gradient(45deg, ' + color + ', ' + color + ')', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' } }, word);
            });
            return createElement('h2', { style: headingStyle }, styledElements);
        }
        
        if (style === 'multicolor') {
            var letters = heading.split('');
            var styledElements = letters.map(function(letter, i) {
                var color = colorArray[i % colorArray.length] || textColor;
                return createElement('span', { key: i, style: { color: color } }, letter);
            });
            return createElement('h2', { style: headingStyle }, styledElements);
        }
        
        if (style === 'split') {
            var words = heading.split(' ');
            var half = Math.ceil(words.length / 2);
            var firstHalf = words.slice(0, half).join(' ');
            var secondHalf = words.slice(half).join(' ');
            
            var firstColor = colorArray[0] || textColor;
            var secondColor = colorArray[1] || textColor;
            
            return createElement('h2', { style: headingStyle },
                createElement('span', { style: { color: firstColor } }, firstHalf + ' '),
                createElement('span', { style: { color: secondColor } }, secondHalf)
            );
        }
        
        return createElement('h2', { style: headingStyle }, heading);
    }
    
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
            textColor: { type: 'string', default: '#000000' },
            buttonColor: { type: 'string', default: '#0073aa' },
            imageWidth: { type: 'number', default: 50 },
            padding: { type: 'number', default: 40 },
            reverseOrder: { type: 'boolean', default: false },
            useContainer: { type: 'boolean', default: true },
            containerWidth: { type: 'string', default: '1200px' },
            innerWidth: { type: 'string', default: '100%' },
            gap: { type: 'number', default: 20 },
            headingStyle: { type: 'string', default: 'normal' },
            headingColors: { type: 'string', default: '' },
            headingSize: { type: 'string', default: '2.5rem' },
            headingLineHeight: { type: 'string', default: '1.2' }
        },
        
        edit: function(props) {
            var attrs = props.attributes;
            var blockProps = useBlockProps({ className: 'hero-banner-editor' });
            
            var inspectorControls = createElement(InspectorControls, null,
                createElement(PanelBody, { title: 'Content', initialOpen: true },
                    createElement(TextControl, {
                        label: 'Heading',
                        value: attrs.heading,
                        onChange: function(value) { props.setAttributes({ heading: value }); },
                        placeholder: 'Enter heading'
                    }),
                    createElement('label', { style: { display: 'block', marginBottom: '8px' } }, 'Content'),
                    createElement('textarea', {
                        value: attrs.content,
                        onChange: function(e) { props.setAttributes({ content: e.target.value }); },
                        placeholder: 'Enter content',
                        style: { width: '100%', minHeight: '80px' }
                    })
                ),
                
                createElement(PanelBody, { title: 'Heading Style', initialOpen: false },
                    createElement(TextControl, {
                        label: 'Heading',
                        value: attrs.heading,
                        onChange: function(value) { props.setAttributes({ heading: value }); },
                        placeholder: 'Enter heading'
                    }),
                    createElement(SelectControl, {
                        label: 'Heading Style',
                        value: attrs.headingStyle,
                        options: [
                            { label: 'Normal', value: 'normal' },
                            { label: 'Gradient (Each Word)', value: 'gradient' },
                            { label: 'Multi-Color (Each Letter)', value: 'multicolor' },
                            { label: 'Split Words', value: 'split' }
                        ],
                        onChange: function(value) { props.setAttributes({ headingStyle: value }); }
                    }),
                    attrs.headingStyle !== 'normal' ? [
                        createElement('p', { style: { marginBottom: '8px', fontSize: '12px', color: '#666' } }, 
                            'Enter colors separated by comma'
                        ),
                        createElement(TextControl, {
                            label: 'Colors',
                            value: attrs.headingColors,
                            onChange: function(value) { props.setAttributes({ headingColors: value }); },
                            placeholder: '#ff0000, #00ff00, #0000ff'
                        })
                    ] : null,
                    createElement('hr', { style: { margin: '15px 0' } }),
                    createElement(TextControl, {
                        label: 'Font Size',
                        value: attrs.headingSize,
                        onChange: function(value) { props.setAttributes({ headingSize: value }); },
                        placeholder: '2.5rem'
                    }),
                    createElement(TextControl, {
                        label: 'Line Height',
                        value: attrs.headingLineHeight,
                        onChange: function(value) { props.setAttributes({ headingLineHeight: value }); },
                        placeholder: '1.2'
                    })
                ),
                
                createElement(PanelBody, { title: 'Button', initialOpen: false },
                    createElement(TextControl, {
                        label: 'Button Text',
                        value: attrs.buttonText,
                        onChange: function(value) { props.setAttributes({ buttonText: value }); },
                        placeholder: 'Click Here'
                    }),
                    createElement(TextControl, {
                        label: 'Button URL',
                        value: attrs.buttonUrl,
                        onChange: function(value) { props.setAttributes({ buttonUrl: value }); },
                        placeholder: '#'
                    }),
                    createElement('label', { style: { display: 'block', marginBottom: '8px' } }, 'Button Color'),
                    createElement('input', {
                        type: 'color',
                        value: attrs.buttonColor || '#0073aa',
                        onChange: function(e) { props.setAttributes({ buttonColor: e.target.value }); },
                        style: { width: '100%', height: '40px' }
                    })
                ),
                
                createElement(PanelBody, { title: 'Image', initialOpen: false },
                    createElement(TextControl, {
                        label: 'Image URL',
                        value: attrs.imageUrl,
                        onChange: function(value) { props.setAttributes({ imageUrl: value }); },
                        placeholder: 'https://example.com/image.jpg'
                    }),
                    createElement(TextControl, {
                        label: 'Image Alt Text',
                        value: attrs.imageAlt,
                        onChange: function(value) { props.setAttributes({ imageAlt: value }); },
                        placeholder: 'Image description'
                    }),
                    createElement(SelectControl, {
                        label: 'Image Width (%)',
                        value: String(attrs.imageWidth),
                        options: [
                            { label: '25%', value: '25' },
                            { label: '33%', value: '33' },
                            { label: '50%', value: '50' },
                            { label: '66%', value: '66' },
                            { label: '75%', value: '75' }
                        ],
                        onChange: function(value) { props.setAttributes({ imageWidth: parseInt(value, 10) }); }
                    }),
                    createElement('div', { style: { marginTop: '10px' } },
                        createElement('label', null,
                            createElement('input', {
                                type: 'checkbox',
                                checked: attrs.reverseOrder,
                                onChange: function(e) { props.setAttributes({ reverseOrder: e.target.checked }); }
                            }),
                            createElement('span', { marginLeft: '8px' }, 'Reverse Order')
                        )
                    )
                ),
                
                createElement(PanelBody, { title: 'Layout', initialOpen: false },
                    createElement(SelectControl, {
                        label: 'Content Alignment',
                        value: attrs.alignment,
                        options: [
                            { label: 'Left', value: 'left' },
                            { label: 'Center', value: 'center' },
                            { label: 'Right', value: 'right' }
                        ],
                        onChange: function(value) { props.setAttributes({ alignment: value }); }
                    }),
                    createElement(SelectControl, {
                        label: 'Padding',
                        value: String(attrs.padding),
                        options: [
                            { label: '20px', value: '20' },
                            { label: '40px', value: '40' },
                            { label: '60px', value: '60' },
                            { label: '80px', value: '80' },
                            { label: '100px', value: '100' }
                        ],
                        onChange: function(value) { props.setAttributes({ padding: parseInt(value, 10) }); }
                    }),
                    createElement(TextControl, {
                        label: 'Gap (px)',
                        type: 'number',
                        value: attrs.gap,
                        onChange: function(value) { props.setAttributes({ gap: parseInt(value, 10) }); }
                    })
                ),
                
                createElement(PanelBody, { title: 'Container', initialOpen: false },
                    createElement('label', null,
                        createElement('input', {
                            type: 'checkbox',
                            checked: attrs.useContainer,
                            onChange: function(e) { props.setAttributes({ useContainer: e.target.checked }); }
                        }),
                        createElement('span', { marginLeft: '8px' }, 'Use Container')
                    ),
                    attrs.useContainer ? [
                        createElement(TextControl, {
                            label: 'Container Width',
                            value: attrs.containerWidth,
                            onChange: function(value) { props.setAttributes({ containerWidth: value }); },
                            placeholder: '1200px'
                        }),
                        createElement(TextControl, {
                            label: 'Inner Width',
                            value: attrs.innerWidth,
                            onChange: function(value) { props.setAttributes({ innerWidth: value }); },
                            placeholder: '100%'
                        })
                    ] : null
                ),
                
                createElement(PanelBody, { title: 'Colors', initialOpen: false },
                    createElement('label', { style: { display: 'block', marginBottom: '8px' } }, 'Background Color'),
                    createElement('input', {
                        type: 'color',
                        value: attrs.bgColor || '#ffffff',
                        onChange: function(e) { props.setAttributes({ bgColor: e.target.value }); },
                        style: { width: '100%', height: '40px' }
                    }),
                    createElement('label', { style: { display: 'block', marginBottom: '8px', marginTop: '15px' } }, 'Text Color'),
                    createElement('input', {
                        type: 'color',
                        value: attrs.textColor || '#000000',
                        onChange: function(e) { props.setAttributes({ textColor: e.target.value }); },
                        style: { width: '100%', height: '40px' }
                    })
                )
            );
            
            var imagePart = null;
            if (attrs.imageUrl) {
                imagePart = createElement('div', { style: { flex: '0 0 ' + attrs.imageWidth + '%' } },
                    createElement('img', {
                        src: attrs.imageUrl,
                        alt: attrs.imageAlt,
                        style: { width: '100%', display: 'block' }
                    })
                );
            }
            
            var contentPart = createElement('div', { style: { flex: '1', textAlign: attrs.alignment } },
                getStyledHeading(attrs.heading, attrs.headingStyle, attrs.headingColors, attrs.textColor, attrs.headingSize, attrs.headingLineHeight),
                createElement('p', { marginBottom: '15px', color: attrs.textColor }, attrs.content || 'Content'),
                attrs.buttonText ? createElement('a', {
                    href: attrs.buttonUrl,
                    style: { 
                        padding: '10px 20px', 
                        backgroundColor: attrs.buttonColor, 
                        color: '#fff',
                        textDecoration: 'none'
                    }
                }, attrs.buttonText) : null
            );
            
            var previewContent = attrs.reverseOrder ? [contentPart, imagePart] : [imagePart, contentPart];
            
            var containerStyle = attrs.useContainer ? { maxWidth: attrs.containerWidth, margin: '0 auto', width: attrs.innerWidth } : { width: '100%' };
            var innerContainerStyle = { display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: attrs.gap + 'px' };
            
            var previewSection = createElement('div', { 
                style: { 
                    padding: attrs.padding + 'px', 
                    backgroundColor: attrs.bgColor 
                }
            },
                createElement('div', { style: containerStyle },
                    createElement('div', { style: innerContainerStyle }, previewContent)
                )
            );
            
            return createElement('div', blockProps, inspectorControls, previewSection);
        },
        
        save: function(props) {
            var attrs = props.attributes;
            var blockProps = useBlockPropsSave({ className: 'hero-banner-block' });
            
            var imagePart = null;
            if (attrs.imageUrl) {
                imagePart = createElement('div', { style: { flex: '0 0 ' + attrs.imageWidth + '%' } },
                    createElement('img', {
                        src: attrs.imageUrl,
                        alt: attrs.imageAlt,
                        style: { width: '100%', display: 'block' }
                    })
                );
            }
            
            var contentPart = createElement('div', { style: { flex: '1', textAlign: attrs.alignment } },
                attrs.heading ? getStyledHeading(attrs.heading, attrs.headingStyle, attrs.headingColors, attrs.textColor) : null,
                attrs.content ? createElement('p', { marginBottom: '15px', color: attrs.textColor }, attrs.content) : null,
                attrs.buttonText ? createElement('a', {
                    href: attrs.buttonUrl,
                    style: { 
                        padding: '10px 20px', 
                        backgroundColor: attrs.buttonColor, 
                        color: '#fff',
                        textDecoration: 'none'
                    }
                }, attrs.buttonText) : null
            );
            
            var content = attrs.reverseOrder ? [contentPart, imagePart] : [imagePart, contentPart];
            
            var containerStyle = attrs.useContainer ? { maxWidth: attrs.containerWidth, margin: '0 auto', width: attrs.innerWidth } : { width: '100%' };
            var innerContainerStyle = { display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: attrs.gap + 'px' };
            
            return createElement('section', Object.assign({}, blockProps, { style: { backgroundColor: attrs.bgColor, padding: attrs.padding + 'px' } }),
                createElement('div', { style: containerStyle },
                    createElement('div', { style: innerContainerStyle }, content)
                )
            );
        }
    });
})(window.wp);