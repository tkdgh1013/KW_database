export default (app, conn) =>{
    app.get('/vaccine_info', (req,res,next)=>{
        const {RRN} = req.query;
        console.log(RRN);
        
        conn.query("SELECT D.hospitalName,H.contact,H.address1,H.address2, O.Hour, D.Date, R.`Index`, R.vaccine,U.name FROM hospital as H,officehour as O,officeDate as D,reservationInfo as R,user as U WHERE H.name=D.hospitalName and O.Hour=R.Hour and O.DateId=D.DateId and D.DateId=R.DateId and U.RRN=R.RRN and (R.DateId, R.Hour,U.RRN) in(SELECT R.DateId, R.Hour, U.RRN FROM reservationInfo as R, user as U WHERE U.RRN=?) Order by D.Date;",
        [RRN],
        (err,result)=>{
            if(err || result.length===0){
                res.send({result:false});
                return;
            }
            else{
                
                 return res.send(result);                 
            }
        })
    });
}