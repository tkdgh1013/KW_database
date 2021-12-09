export default (app, conn) =>{
    app.get('/list', (req,res,next)=>{
        const {date,address1,address2,address3,vaccine} = req.query;
        console.log(date,address1,address2,address3,vaccine);
        const queries=["SELECT h.name,v.DateId FROM hospital as h, officedate as d, vaccineinfo as v WHERE h.name=d.hospitalName and d.DateId=v.DateId and d.Date=? and h.address1=CONCAT(?,' ',?,' ',?) and v.Pfizer>0",
        "SELECT h.name,v.DateId FROM hospital as h, officedate as d, vaccineinfo as v WHERE h.name=d.hospitalName and d.DateId=v.DateId and d.Date=? and h.address1=CONCAT(?,' ',?,' ',?) and v.Moderna>0",
        "SELECT h.name,v.DateId FROM hospital as h, officedate as d, vaccineinfo as v WHERE h.name=d.hospitalName and d.DateId=v.DateId and d.Date=? and h.address1=CONCAT(?,' ',?,' ',?) and v.AstraZeneca>0",
        "SELECT h.name,v.DateId FROM hospital as h, officedate as d, vaccineinfo as v WHERE h.name=d.hospitalName and d.DateId=v.DateId and d.Date=? and h.address1=CONCAT(?,' ',?,' ',?) and v.Janssen>0"]
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
        [date,address1,address2,address3],
        (err,result)=>{
            if(err || result.length===0){
                res.send({result:false});
                return;
            }
            return res.send(result);
        })
    });
}