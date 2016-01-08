/*
Click events to handle the
preview for each picture from
the thumbnail.
*/
app.preview = {

    center: function () {
        jQuery.fn.center = function () {
            this.css("position", "absolute");
            this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) +
                $(window).scrollTop()) + "px");
            this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) +
                $(window).scrollLeft()) + "px");
            return this;
        }

        $('body').find('#main .capital_box .Picture img').click(function () {
            var clone = $(this).clone();
            var close = document.getElementById('close');
            var bg = jQuery('#background');
            var largePic = jQuery('#large');

            bg.css({"opacity": "0.9"}).delay(500).fadeIn("slow");

            largePic.html(clone).delay(1000).center().fadeIn("slow").append(close);

            $(close).fadeIn('fast');
        });

        $(document).keypress(function (event) {
            if (event.keyCode === 27 || target === close) {
                $("#background").fadeOut("fast");
                $("#large").fadeOut("fast");
            }
        });

        $("#background").click(function () {
            $("#background").fadeOut("fast");
            $("#large").fadeOut("fast");
        });

        $("#large").click(function () {
            $("#background").fadeOut("fast");
            $("#large").fadeOut("fast");
        });
    }
}