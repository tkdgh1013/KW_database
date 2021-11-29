export default (app, conn) =>{
    app.get('/list', (req,res,next)=>{
        const {date,address,vaccine} = req.query;
        console.log(date,address,vaccine);
        const queries=["SELECT h.name FROM hospital as h, officedate as d, vaccineinfo as v WHERE h.name=d.hospitalName and d.DateId=v.DateId and d.Date=? and h.address1=? and v.Pfizer>0",
        "SELECT h.name FROM hospital as h, officedate as d, vaccineinfo as v WHERE h.name=d.hospitalName and d.DateId=v.DateId and d.Date=? and h.address1=? and v.Moderna>0",
        "SELECT h.name FROM hospital as h, officedate as d, vaccineinfo as v WHERE h.name=d.hospitalName and d.DateId=v.DateId and d.Date=? and h.address1=? and v.AstraZeneca>0",
        "SELECT h.name FROM hospital as h, officedate as d, vaccineinfo as v WHERE h.name=d.hospitalName and d.DateId=v.DateId and d.Date=? and h.address1=? and v.Janssen>0"]
        var query;
        if(vaccine==="Pfizer")
            query=queries[0];
        else if(vaccine==="Moderna")
            query=queries[1];
        else if(vaccine==="AstraZeneca")
            query=queries[2];
        else
            query=queries[3];
        
        conn.query(query,
        [date,address],
        (err,result)=>{
            if(err || result.length===0){
                res.send({result:false});
                return;
            }
            return res.send(result);
        })
    });
}