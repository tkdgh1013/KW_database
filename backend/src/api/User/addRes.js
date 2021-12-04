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


        conn.query(sql1+sql2+sql3+sql4+sql5,
        [DateId,Hour,vaccine,RRN,DateId,Hour,RRN,DateId,RRN,RRN,DateId,Hour],
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
