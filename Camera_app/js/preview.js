/*
Click events to handle the
preview for each picture from
the thumbnail.
*/

app.preview = {
    
    center: function() {
        jQuery.fn.center = function () {
            this.css("position", "absolute");
            this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) + 
                                        $(window).scrollTop()) + "px");
            this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) + 
                                         $(window).scrollLeft()) + "px");
            return this;
        }

        $('body').click(function(event) {
            var target = $(event.target);
            
            var parisClone = $('#Paris').clone();
            var londonClone = $('#London').clone();
            var madridClone = $('#Madrid').clone();
            var berlinClone = $('#Berlin').clone();
            var viennaClone = $('#Vienna').clone();
            var sofiaClone = $('#Sofia').clone();
            
            var close = document.getElementById('close');
            
            var bg = jQuery('#background');
            var largePic = jQuery('#large');
            
            preview("Paris", bg, parisClone, largePic);
            preview("London", bg, londonClone, largePic);
            preview("Madrid", bg, madridClone, largePic);
            preview("Berlin", bg, berlinClone, largePic);
            preview("Vienna", bg, viennaClone, largePic);
            preview("Sofia", bg, sofiaClone, largePic);
            
            function preview(id, bgID, clone, largeID) {
                //var $winWidth = $(window).width();
                //var $winHeight = $(window).height();
                
                //if (clone.width() > $winWidth && clone.height() > $winHeight) {
                

                if (target[0].id === id) {
              
                    bgID.css({"opacity" : "0.9"}).delay(500)
                        .fadeIn("slow");			
						
                    largeID.html(clone).delay(1000)
                        .center()
                        .fadeIn("slow").append(close);
                    
                    $(close).fadeIn('fast');

                    return false;
                }
            }
            
        });
			
        $(document).keypress(function(event) {
            if (event.keyCode === 27 || target === close) {
                $("#background").fadeOut("fast");
                $("#large").fadeOut("fast");
            }
        });
		
        $("#background").click(function() {
            $("#background").fadeOut("fast");
            $("#large").fadeOut("fast");   
        });
		
        $("#large").click(function() {
            $("#background").fadeOut("fast");
            $("#large").fadeOut("fast");
        });
    }
}