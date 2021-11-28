export default (app, conn) =>{
    app.get('/testUser', (req,res,next)=>{
        const {sibal} = req.query;
        console.log(sibal);

        conn.query("SELECT * FROM user WHERE name = ?;",
        [sibal],
        (err,result)=>{
            if(err){
                res.send(error)
                return;
            }
            return res.send(result);
        })
    });
}