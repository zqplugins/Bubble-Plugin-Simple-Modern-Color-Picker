function(instance, properties, context) {
    
    function hexToRgb(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? `rgb(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)})` : null;
    }
    
    instance.canvas[0].id = instance.data.divNameNew
    
    if (properties.bubble.auto_binding() == true) {
        properties.initial_color = properties.autobinding
    }
    
    if (instance.data.style !== null && instance.data.style !== undefined) {  
        instance.data.style.remove()
    }
    instance.data.style = document.createElement('style');
    instance.data.style.innerHTML = `
    
    .pcr-app {
    	position: fixed;
    	display: flex;
    	flex-direction: column;
    	z-index: 10000;
    	border-radius: 0.1em;
    	background: ${properties.background_color} !important;
		backdrop-filter: blur(10px) !important;
     	-webkit-backdrop-filter: blur(10px) !important;
     	-moz-backdrop-filter: blur(10px) !important;
	}

	${'#' + instance.data.divNameNew} .pickr .pcr-button {
		border: solid ${properties.border_width}px ${properties.border_color} !important
	}

    .pcr-app .pcr-interaction .pcr-result {
        color: ${properties.input_font_color} !important;
        background: ${properties.input_background_color} !important;
		font-family: inherit !important;
    }

    .pcr-app .pcr-interaction .pcr-save {
        background: ${properties.main_color} !important;
        border-radius: 5px !important;
		margin-left: 6px !important;
		font-family: inherit !important;
        padding-left: 8px !important;
        padding-right: 8px !important;
    }

    ${'#' + instance.data.divNameNew} .pickr {
        position: relative;
        overflow: visible;
        height: ${properties.bubble.height()}px;
		width: ${properties.bubble.width()}px;
        transform: translateY(0);
    }

    ${'#' + instance.data.divNameNew} .pickr .pcr-button {
        border-radius: ${properties.border_radius}px !important;
        width: 100% !important;
        height: 100% !important;
    }
    
    ${'#' + instance.data.divNameNew} .pickr .pcr-button::before {
        border-radius: ${properties.border_radius}px !important;
        background: none !important;
    }

    ${'#' + instance.data.divNameNew} .pickr .pcr-button::after {
        border-radius: ${properties.border_radius - properties.border_width}px !important;
    }

`;

    document.head.appendChild(instance.data.style);   

    if (instance.data.rendered !== true) {
        // Simple example, see optional options for more configuration.
        instance.data.pickr = Pickr.create({
            el: '#' + instance.data.divName,
            theme: 'nano', // or 'monolith', or 'nano'
            default: properties.initial_color,
            defaultRepresentation: 'HEX',

            //swatches: [],

            components: {

                // Main components
                preview: false,
                opacity: false,
                hue: true,

                // Input / output Options
                interaction: {
                    hex: false,
                    rgba: false,
                    hsla: false,
                    hsva: false,
                    cmyk: false,
                    input: true,
                    clear: false,
                    save: true
                }
            }
        });
        instance.data.rendered = true
        
        
        instance.publishState('value', properties.initial_color)
        
        instance.data.pickr.on('save', (color, source) => {
            
            var colorHex = '#' + color.toHEXA()[0] + color.toHEXA()[1] + color.toHEXA()[2]
            var autobindingColor = colorHex
            if (properties.use_rgb_value_for_autobinding) {
                autobindingColor = hexToRgb(colorHex)
            }

            if (instance.data.previousColor !== colorHex) {

                instance.publishState('value', colorHex)

                instance.publishState('value_rgb', hexToRgb(colorHex))

                instance.triggerEvent('value_got_saved')

                instance.publishAutobinding(autobindingColor)

                instance.data.previousColor = colorHex
            }
        })
    }
    
    instance.data.pickr.setColor(`${properties.initial_color}`, false)
}