export default (app, conn) =>{
    app.get('/subRes', (req,res,next)=>{
        const {DateId,Hour,RRN} = req.query;
        console.log(DateId,Hour,RRN,vaccine,VaccineNum);
        
        var sql="INSERT INTO reservationinfo(DateId,Hour,RRN,vaccine,VaccineNum) VALUES(?,?, '981013-1000001', 'Pfizer',2)"

        conn.query(sql,
        [DateId,Hour,RRN,vaccine,VaccineNum],
        (err,result)=>{
            if(err){
                res.send({result:false});
                return;
            }
            else{
                return res.send({result:true});                 
            }
        })
    });
}
