import mysql from 'mysql'

export function init(){
    return mysql.createConnection({
        host:'localhost',
        port:'3306',
        user:'root',
        password:'1234',
        database:'vaccine_reservation',
        dateStrings:'date',
        multipleStatements: true 

    });
}

export function tryConnect(con){
    con.connect((err) =>{if(err){
        console.error("mysql connection error : " + err);
    }
    else{
      console.info("mysql is connected successfully.");  
    }
});
}