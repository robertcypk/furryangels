(function (blocks, element, blockEditor, components, i18n) {
    var el = element.createElement;
    var __ = i18n.__;
    var useBlockProps = blockEditor.useBlockProps;
    var useBlockPropsSave = useBlockProps.save;
    var MediaUpload = components.MediaUpload;
    var InspectorControls = blockEditor.InspectorControls;

    blocks.registerBlockType('furryangels/hero-banner', {
        title: __('Hero Banner', 'furryangels'),
        description: __('Create a hero banner with background image and content.', 'furryangels'),
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
                el(
                    InspectorControls,
                    null,
                    el('div', { style: { padding: '16px' } },
                        el('p', { style: { margin: '0 0 10px', fontWeight: 'bold' } }, 'Background Settings'),
                        el('p', { style: { margin: '0 0 5px' } }, 'Background Image:'),
                        el(MediaUpload, {
                            onSelect: function (media) {
                                props.setAttributes({ backgroundImage: media.url });
                            },
                            type: 'image',
                            value: props.attributes.backgroundImage,
                            render: function (open) {
                                return props.attributes.backgroundImage ? el('div', null,
                                    el('img', { src: props.attributes.backgroundImage, style: { width: '100%', height: '150px', objectFit: 'cover', marginBottom: '8px' } }),
                                    el('button', { onClick: open, style: { marginRight: '8px' } }, 'Change'),
                                    el('button', { onClick: function () { props.setAttributes({ backgroundImage: '' }); } }, 'Remove')
                                ) : el('button', { onClick: open, style: { padding: '20px', width: '100%', cursor: 'pointer' } }, 'Select Image');
                            }
                        }),
                        el('label', { style: { display: 'block', marginTop: '15px', marginBottom: '5px' } }, 'Repeat:'),
                        el('select', {
                            value: props.attributes.backgroundRepeat,
                            onChange: function (e) { props.setAttributes({ backgroundRepeat: e.target.value }); },
                            style: { width: '100%', padding: '5px' }
                        }, [
                            el('option', { value: 'no-repeat' }, 'No Repeat'),
                            el('option', { value: 'repeat' }, 'Repeat'),
                            el('option', { value: 'repeat-x' }, 'Repeat X'),
                            el('option', { value: 'repeat-y' }, 'Repeat Y')
                        ]),
                        el('label', { style: { display: 'block', marginTop: '15px', marginBottom: '5px' } }, 'Position:'),
                        el('select', {
                            value: props.attributes.backgroundPosition,
                            onChange: function (e) { props.setAttributes({ backgroundPosition: e.target.value }); },
                            style: { width: '100%', padding: '5px' }
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
                        ]),
                        el('label', { style: { display: 'block', marginTop: '15px', marginBottom: '5px' } }, 'Size:'),
                        el('select', {
                            value: props.attributes.backgroundSize,
                            onChange: function (e) { props.setAttributes({ backgroundSize: e.target.value }); },
                            style: { width: '100%', padding: '5px' }
                        }, [
                            el('option', { value: 'cover' }, 'Cover'),
                            el('option', { value: 'contain' }, 'Contain'),
                            el('option', { value: 'auto' }, 'Auto')
                        ]),
                        el('label', { style: { display: 'block', marginTop: '15px', marginBottom: '5px' } }, 'Color:'),
                        el('input', {
                            type: 'color',
                            value: props.attributes.backgroundColor || '#ffffff',
                            onChange: function (e) { props.setAttributes({ backgroundColor: e.target.value }); },
                            style: { width: '100%', height: '30px' }
                        }),
                        el('label', { style: { display: 'block', marginTop: '15px', marginBottom: '5px' } }, 'Overlay Opacity:'),
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
                el('div', { className: 'hero-banner-preview', style: Object.assign({ padding: '40px', minHeight: '200px' }, bgStyle) })
            );
        },

        save: function (props) {
            var bgStyle = {};
            if (props.attributes.backgroundImage) bgStyle.backgroundImage = 'url(' + props.attributes.backgroundImage + ')';
            if (props.attributes.backgroundRepeat) bgStyle.backgroundRepeat = props.attributes.backgroundRepeat;
            if (props.attributes.backgroundPosition) bgStyle.backgroundPosition = props.attributes.backgroundPosition;
            if (props.attributes.backgroundSize) bgStyle.backgroundSize = props.attributes.backgroundSize;
            if (props.attributes.backgroundColor) bgStyle.backgroundColor = props.attributes.backgroundColor;

            var blockProps = useBlockPropsSave({ className: 'hero hero-banner-block' });
            var sectionStyle = Object.assign({}, blockProps.style, bgStyle);

            return el('section', Object.assign({}, blockProps, { style: sectionStyle }),
                props.attributes.overlayOpacity > 0 ? el('div', { style: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: '#000', opacity: props.attributes.overlayOpacity / 100 } }) : null,
                el('div', { className: 'container', style: { position: 'relative', zIndex: 1 } },
                    props.attributes.backgroundImage ? el('img', { src: props.attributes.backgroundImage, style: { display: 'none' } }) : null
                )
            );
        },
    });
})(window.wp.blocks, window.wp.element, window.wp.blockEditor, window.wp.components, window.wp.i18n);