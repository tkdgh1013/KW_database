export default (app, conn) =>{
    app.get('/Hsearch', (req,res,next)=>{
        const {Date,address1,address2,address3} = req.query;
        console.log(Date,address1,address2,address3);
        conn.query("SELECT H.name, H.address1, D.Date FROM hospital as H, officeDate as D, vaccineinfo as V WHERE H.name=D.hospitalName and D.DateId=V.DateId and D.Date=? and H.address1=CONCAT(?,' ',?,' ',?);",
        [Date,address1,address2,address3],
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