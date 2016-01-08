
/*
button event for takeing and browsing 
pictures then saving it into DB,
and binding click event if no src is present
else it unbinds it until picture is deleted
*/

app.Events = {
    takeBrowse: function() {
        $('.iconsTB').off('click').on('click', function(e) {
            var $target = $(e.target);
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
                if (!jQuery("#" + cityName).attr('src')) {
                    if ($target.hasClass('take')) {
                        jQuery('#' + cityName).show();
                        app.camera.capturePhoto(cityName, takeID, getID);   
                    }
                    if ($target.hasClass('browse')) {
                        jQuery('#' + cityName).show();
                        app.camera.getPhoto(cityName, takeID, getID);
                    } 
                }
            }
        });
    },
           
    BindButtons: function($parent, colName, id, takeID, getID) {
        $parent.find(takeID).off('click');
        $parent.find(getID).off('click');
        
        bindings();
        
        function bindings() {
            $parent.find(takeID).on('click', function() {
                $(id).show();
                app.camera.capturePhoto(colName, takeID, getID)
            });
            $parent.find(getID).on('click', function() {
                $(id).show();                
                app.camera.getPhoto(colName, takeID, getID);
            });
        }
    }
}
