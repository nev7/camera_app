app.Resume = {
    
    onResume: function() {
        var db = app.DB.initDB();

        fetchDB("Paris");
        fetchDB("London");
        fetchDB("Madrid");
        fetchDB("Berlin");
        fetchDB("Vienna");
        fetchDB("Sofia");
        
        function fetchDB(city) {
            db.transaction(function(tx) {
                var SQLtext = "SELECT * FROM Gallery WHERE City = '" + city + "'";
                
                tx.executeSql(SQLtext, [], function(tx, res) {  //onSuccess
                    try {
                        var imgData = res.rows.item(0).dataURL;
                      
                        $('#' + city).attr('src', imgData);  
                    } catch (ex) {
                    }
                }, function(err) {                              //onErr
                    console.log('Error: ' + err);
                });
            }); 
        }
    }
}