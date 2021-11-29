export default (app, conn) =>{
    app.get('/hinfo', (req,res,next)=>{
        const {name} = req.query;
        console.log(name);
        
        conn.query("SELECT * FROM hospital as h, officedate as d, officehour as t WHERE h.name=d.hospitalname and d.DateId=t.DateId and t.CanBeReserved=1 and h.name=?",
        [name],
        (err,result)=>{
            if(err || result.length===0){
                res.send({result:false});
                return;
            }
            return res.send(result);
        })
    });
}