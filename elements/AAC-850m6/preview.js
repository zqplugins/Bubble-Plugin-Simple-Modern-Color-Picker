function(instance, properties) {
    // Create a container for the color picker
    const pickerContainer = document.createElement("div");
    pickerContainer.style.position = "relative";
    pickerContainer.style.width = "100%";
    pickerContainer.style.height = "100%";
    pickerContainer.style.display = "flex";
    pickerContainer.style.justifyContent = "center";
    pickerContainer.style.alignItems = "center";

    // Create the color picker input
    const colorPicker = document.createElement("input");
    colorPicker.type = "color";
    colorPicker.style.width = "50px";
    colorPicker.style.height = "50px";
    colorPicker.style.border = "none";
    colorPicker.style.cursor = "pointer";

    // Append the color picker to the container
    pickerContainer.appendChild(colorPicker);
    instance.canvas.append(pickerContainer);

    // Event listener to capture selected color and set it as an exposed state
    colorPicker.addEventListener("input", function() {
        instance.publishState("selected_color", colorPicker.value);
    });

    // Initialize the color picker with a default color if specified in properties
    if (properties.defaultColor) {
        colorPicker.value = properties.defaultColor;
        instance.publishState("selected_color", properties.defaultColor);
    }
}
