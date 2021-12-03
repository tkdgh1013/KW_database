export default (app, conn) =>{
    app.get('/Hsearch', (req,res,next)=>{
        const {Date,adress1,adress2,adress3} = req.query;
        console.log(Date,adress1,adress2,adress3);
        conn.query("SELECT H.name, H.address1, D.Date FROM hospital as H, officeDate as D, vaccineinfo as V WHERE H.name=D.hospitalName and D.DateId=V.DateId and D.Date='2021-11-01' and H.address1=CONCAT('서울시',' ','금천구',' ','독산동');",
        [Date,adress1,adress2,adress3],
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