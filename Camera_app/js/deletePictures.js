
/*
Event the handles the deletion 
of a picture from canvas and the DB
*/

app.Del = {

    deletePhoto: function() {
        var db = app.DB.initDB();

        $('.icons_del').on('click', function(event) {
            event.stopPropagation();
            var $target = jQuery(event.target);
            var $parent = $target.parents('.capital_box');
            var $img = $parent.find('img');
            var $city = $img.attr('id');
            var $takeIcon = $parent.find('i').attr('id');
            var $browseIcon = $parent.find('[class*="browse"]').attr('id');
            
            delSQL($city, "#" + $city, "#" + $takeIcon, "#" + $browseIcon);

            function delSQL(cityName, id , takeID, getID) {
                db.transaction(function(tx) {
                    var SQLText = "DELETE FROM Gallery WHERE City = '" + cityName + "'";
                    
                    tx.executeSql(SQLText, [], DBSuccess, DBFail);
                    
                    function DBSuccess() {
                        //$img.removeAttr('src');
                        $img.attr('src', '');
                        $img.hide();
                        $('.notificationDel').stop().fadeIn(400).delay(1000).fadeOut(400);
                        app.Events.BindButtons($parent, cityName, id, takeID, getID);
                    }

                    function DBFail() {
                        console.log(arguments);
                    }
                });
            }
        });
    }    
}