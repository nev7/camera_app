
/*
button event for takeing and browsing 
pictures then saving it into DB,
and binding click event if no src is present
else it unbinds it until picture is deleted
*/

app.Events = {
    takeBrowse: function() {
        $('.iconsTB').unbind('click');
        $('.iconsTB').off('click');
        $('.iconsTB').on('click', function(event) {
            var $target = $(event.target);
            var $parent = $target.parents('.capital_box');
            var $img = $parent.find('img');
            var $city = $img.attr('id');
            var $takeIcon = $parent.find('i').attr('id');
            var $browseIcon = $parent.find('[class*="browse"]').attr('id');
            
            var src = $img[0].src;
            
            if (src.length < 1) {
                onTakeBrowseClick($city, $takeIcon, $browseIcon);
            }
            
            function onTakeBrowseClick(cityName, takeID, getID) {
                if (!$("#" + cityName).attr('src')) {
                    if ($target.hasClass('take')) {
                        $('#' + cityName).show();
                        app.camera.capturePhoto(cityName);   
                    }
                    if ($target.hasClass('browse')) {
                        $('#' + cityName).show();
                        app.camera.getPhoto(cityName);
                    } 
                    
                    if ($img.attr('src')) {
                        $parent.find('.iconsTB').off('click');
                        $parent.find(takeID).off('click');
                        $parent.find(getID).off('click');
                    }
                }
            }
        });
    },
    
           
    BindButtons: function($parent, colName, id, takeID, getID) {
        $parent.find(takeID).off('click');
        $parent.find(getID).off('click');
        var pic = $parent.find('img').attr('src');

        if (pic.length < 1) {
            $parent.find(takeID).on('click', function() {

                $(id).show();
                app.camera.capturePhoto(colName);
                /*var src = jQuery(id)[0].src;

                if (src.length < 1) {
                    app.camera.capturePhoto(colName);
                }*/
            });
            
            $parent.find(getID).on('click', function() {

                $(id).show();
                
                var src = jQuery(id)[0].src;
                
                if (src.length < 1) {
                    app.camera.getPhoto(colName);
                }
            });
        } else if (pic.length > 0) {
            $parent.find('.iconsTB').off('click');
        }
    }
} 
