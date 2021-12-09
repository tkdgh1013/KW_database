export default (app, conn) =>{
    app.get('/check', (req,res,next)=>{
        const {RRN} = req.query;
        console.log(RRN);
        
        conn.query("SELECT  D.Date FROM officedate as D, reservationinfo as R WHERE D.DateId=R.DateId and R.RRN=?;",
        [RRN],
        (err,result)=>{
            if(err || result.length===0){
                res.send({result:false});
                return;
            }
            else{
                
                return res.send({result:true});
                        
            }
        })
    });
}