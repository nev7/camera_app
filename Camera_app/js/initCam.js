/*
These are two functions which handle 
events when user wants to take a photo
or browse from already taken photos
using the device camera API
*/

app.camera = {
    
    capturePhoto: function(id, takeID, getID) {
        var db = app.DB.initDB();
        var that = this;

        that.pictureSource = navigator.camera.PictureSourceType;
        that.destinationType = navigator.camera.DestinationType;

        navigator.camera.getPicture(onSuccess, onErr, {
                                        quality: 50,
                                        destinationType: that.destinationType.DATA_URL,
                                        saveToPhotoAlbum: true,
                                        targetHeight: 600,
                                        targetWidth: 800                                      
                                    });
        
        function onSuccess(imageData) {
            createThumbnail(imageData);
            $(takeID).off('click');
            $(getID).off('click');
        }
        function onErr(msg) {
            alert("FAILED BACAUSE: " + msg);
        }
        
        function createThumbnail(URL) {
            var img = document.getElementById(id);
            var fullSrc = "data:image/jpeg;base64," + URL;
            img.src = fullSrc;
            
            img.onload = function() {
                $('.notification').stop().fadeIn(400).delay(1000).fadeOut(400);
                saveToSQL(fullSrc, id);
                
                img.onload = null;
            }
            
            function saveToSQL(source, colName) {
                var canvas = document.createElement('canvas');
                var ctx = canvas.getContext('2d');
                
                var image = new Image();
                image.src = source;
                
                image.onload = function() {
                    canvas.width = image.width;
                    canvas.height = image.height;
                
                    ctx.drawImage(image, 0, 0);
                
                    var dataURL = canvas.toDataURL('image/jpeg');
                
                    db.transaction(function(tx) {
                        tx.executeSql("INSERT INTO Gallery (dataURL, City) VALUES(?, ?)", [dataURL, colName]);
                    }); 
                }
            }
        }
    },
    
    getPhoto: function(id, takeID, getID) {
        var db = app.DB.initDB();
        // Retrieve image file location from specified source
        navigator.camera.getPicture(onPhotoURISuccess, onFail, {
                                        quality: 45,
                                        destinationType: navigator.camera.PictureSourceType.FILE_URI,
                                        sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
                                    });
        
        function onPhotoURISuccess(imageURI) {
            createThumbnail(imageURI);
            $(takeID).off('click');
            $(getID).off('click');
        }
        
        function createThumbnail(URL) {
            var img = document.getElementById(id);
            img.src = URL;
            
            img.onload = function() {
                $('.notification').stop().fadeIn(400).delay(1000).fadeOut(400);
                saveToSQL(URL, id);
                
                img.onload = null;
            }
            
            function saveToSQL(source, colName) {
                var canvas = document.createElement('canvas');
                var ctx = canvas.getContext('2d');
                
                var image = new Image();
                image.src = source;
                
                image.onload = function() {
                    canvas.width = image.width;
                    canvas.height = image.height;
                
                    ctx.drawImage(image, 0, 0);  
                
                    var dataURL = canvas.toDataURL('image/jpeg');
                
                    db.transaction(function(tx) {
                        tx.executeSql("INSERT INTO Gallery (dataURL, City) VALUES(?, ?)", [dataURL, colName]);
                    }); 
                }
            }
        }
        
        function onFail(msg) {
            console.log("Failed because: " + msg);
        }
    }
}
