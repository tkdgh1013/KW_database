export default (app, conn) =>{
    app.get('/addRes', (req,res,next)=>{
        const {DateId,Hour,RRN,vaccine} = req.query;
        console.log(DateId,Hour,RRN,vaccine);
        

        var sql1="INSERT INTO reservationinfo(DateId,Hour,RRN,vaccine,VaccineNum) select ?,?,U.RRN,?,U.isVaccinated+1 from user as U where U.RRN=? and U.isVaccinated<2;";

    
        var sql2="UPDATE officehour set `reservation limit`=`reservation limit`-1 WHERE DateId=? and Hour=?  and exists(SELECT *FROM user WHERE RRN=? and isVaccinated<2);";

        var sql3; 
        if(vaccine==="Pfizer")
            sql3="UPDATE vaccineinfo set Pfizer=Pfizer-1 WHERE DateId=? and exists( SELECT * FROM user WHERE RRN=? and isVaccinated<2);";
        else if(vaccine==="Moderna")
            sql3="UPDATE vaccineinfo set Moderna=Moderna-1 WHERE DateId=? and exists( SELECT * FROM user WHERE RRN=? and isVaccinated<2);";
        else if(vaccine==="AstraZeneca")
            sql3="UPDATE vaccineinfo set AstraZeneca=AstraZeneca-1 WHERE DateId=? and exists( SELECT * FROM user WHERE RRN=? and isVaccinated<2);";
        else
            sql3="UPDATE vaccineinfo set Janssen=Janssen-1 WHERE DateId=? and exists( SELECT * FROM user WHERE RRN=? and isVaccinated<2);";

        var sql4="UPDATE user set isVaccinated=isVaccinated+1  WHERE RRN=? and isVaccinated<2;";

        var sql5="UPDATE officehour set CanBeReserved=0 WHERE DateId=? and Hour=? and `reservation limit`<=0;";

        var sql6="UPDATE reservationinfo SET VaccineNum = 2 WHERE RRN = (SELECT * FROM (SELECT COALESCE(MAX(?), 1) FROM reservationinfo  ) AS temp)ORDER BY DateId, Hour DESC LIMIT 1;";

        var sql7="UPDATE reservationinfo SET VaccineNum = 1 WHERE RRN = (SELECT * FROM (SELECT COALESCE(MAX(?), 1) FROM reservationinfo  ) AS temp)ORDER BY DateId, Hour ASC LIMIT 1;";
  

        conn.query(sql1+sql2+sql3+sql4+sql5+sql6+sql7,
        [DateId,Hour,vaccine,RRN,DateId,Hour,RRN,DateId,RRN,RRN,DateId,Hour,RRN,RRN],
        (err,results,field)=>{
            if(err){
                res.send({results:false});
                return;
            }
            else{
                return res.send(results);                 
            }
        })
    });
}
