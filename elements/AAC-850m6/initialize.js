function(instance, context) {

    instance.data.divName = "id"+Math.round(Math.random()*1000000) + 1;
    instance.data.divNameNew = "id"+Math.round(Math.random()*1000000) + 1;
    var newDiv = $('<div id="'+instance.data.divName+'"></div>');
    instance.canvas.append(newDiv);
    instance.data.savedcanvas = instance.canvas
    instance.canvas[0].style['overflow'] = 'visible'
}