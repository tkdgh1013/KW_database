export default (app, conn) =>{
    app.get('/hinfo', (req,res,next)=>{
        const {name,DateId} = req.query;
        console.log(name,DateId);
        
        conn.query("SELECT * FROM hospital as h join officedate as d join officehour as t WHERE h.name=d.hospitalname and d.DateId=t.DateId and t.CanBeReserved=1 and h.name=? and t.DateId=?  ",
        [name,DateId],
        (err,result)=>{
            if(err || result.length===0){
                res.send({result:false});
                return;
            }
            return res.send(result);
        })
    });
}