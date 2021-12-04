export default (app, conn) =>{
    app.get('/subRes', (req,res,next)=>{
        const {Index,RRN,vaccine} = req.query;
        console.log(Index,RRN,vaccine);
        
        var sql1="UPDATE user as U SET isVaccinated=isVaccinated-1 WHERE U.RRN IN (SELECT R.RRN FROM reservationinfo as R WHERE `Index`=?);";

        var sql2="UPDATE officehour as O SET `reservation limit`=`reservation limit`+1 WHERE (O.DateId,O.Hour) IN (SELECT R.DateId,R.Hour FROM reservationinfo as R WHERE `Index`=?);";

        var sql3;
        if(vaccine==="Pfizer")
            sql3="UPDATE vaccineinfo as V set Pfizer=Pfizer+1  WHERE V.DateId IN (SELECT R.DateId FROM reservationinfo as R WHERE `Index`=?);";
        else if(vaccine==="Moderna")
            sql3="UPDATE vaccineinfo as V set Moderna=Moderna+1  WHERE V.DateId IN (SELECT R.DateId FROM reservationinfo as R WHERE `Index`=?);";
        else if(vaccine==="AstraZeneca")
            sql3="UPDATE vaccineinfo as V set AstraZeneca=AstraZeneca+1  WHERE V.DateId IN (SELECT R.DateId FROM reservationinfo as R WHERE `Index`=?);";
        else
            sql3="UPDATE vaccineinfo as V set Janssen=Janssen+1  WHERE V.DateId IN (SELECT R.DateId FROM reservationinfo as R WHERE `Index`=?);";


        var sql4="UPDATE officehour as O set CanBeReserved=1  WHERE `reservation limit`>0 and (O.DateId,O.Hour) IN (SELECT R.DateId,R.Hour FROM reservationinfo as R WHERE `Index`=?);";

        var sql5="DELETE FROM reservationinfo WHERE `Index`=?;";

        var sql6="UPDATE reservationinfo SET VaccineNum=1 WHERE `Index`>=0 and RRN=?;";

        conn.query(sql1+sql2+sql3+sql4+sql5+sql6,
        [Index,Index,Index,Index,Index,Index,Index,Index,RRN],
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
