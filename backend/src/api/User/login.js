export default (app, conn) =>{
    app.get('/login', (req,res,next)=>{
        const {userName,RRN,phoneNumber} = req.query;
        console.log(userName,RRN,phoneNumber);
        
        conn.query("SELECT count(*) as c FROM user WHERE name=? and RRN=? and phoneNumber=?",
        [userName,RRN,phoneNumber],
        (err,result)=>{
            if(err || result.length===0){
                res.send({result:false});
                return;
            }
            else{
                if(result[0].c === 1)
                    return res.send({result:true});
                else
                    return res.send({result:false});                 
            }
        })
    });
}