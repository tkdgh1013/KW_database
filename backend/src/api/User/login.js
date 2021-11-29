export default (app, conn) =>{
    app.get('/login', (req,res,next)=>{
        const {userName,RRN,phoneNumber} = req.query;
        console.log(userName,RRN,phoneNumber,"머시여");
        
        conn.query("SELECT count(*) as c FROM user WHERE name=? and RRN=? and phoneNumber=?;",
        [userName,RRN,phoneNumber],
        (err,result)=>{
            if(err){
                res.send(error)
                return;
            }
            else{
                if(result.c === 1)
                    return res.send({result:true});
                else
                    return res.send({result:false});                 
            }
        })
    });
}