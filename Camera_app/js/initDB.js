//Initialize the database

app.DB = {
    
    initDB: function() {
        var db;
        
        if (window.navigator.simulator === true) {
            db = window.openDatabase("Capitals.db", "1", "CapitalsGallery", "200000"); 
        }else {
            db = window.sqlitePlugin.openDatabase({name: "Capitals.db"});
        }
        
        if (db) {
            db.transaction(function(tx) {
                tx.executeSql("CREATE TABLE IF NOT EXISTS Gallery (dataURL text, City text)");
            });
        }else {
            alert("Table was not created");
        }
        return db;
    }
}
