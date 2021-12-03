export default (app, conn) =>{
    app.get('/addRes', (req,res,next)=>{
        const {DateId,Hour,RRN,vaccine,VaccineNum} = req.query;
        console.log(DateId,Hour,RRN,vaccine,VaccineNum);
        
        var sql="INSERT INTO reservationinfo(DateId,Hour,RRN,vaccine,VaccineNum) VALUES(?,?,?,?,?)"

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
