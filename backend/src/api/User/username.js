export default (app, conn) =>{
    app.get('/username', (req,res,next)=>{
        const {RRN} = req.query;
        console.log(RRN);

        conn.query("SELECT name FROM user WHERE RRN = ?;",
        [RRN],
        (err,result)=>{
            if(err){
                res.send(error)
                return;
            }
            return res.send(result);
        })
    });
}