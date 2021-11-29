export default (app, conn) =>{
    app.get('/join', (req,res,next)=>{
        const {userName,RRN,phoneNumber,address,age} = req.query;
        console.log(userName,RRN,phoneNumber,address,age);
        
        conn.query("INSERT INTO user(name,RRN,phoneNumber,address,age) VALUES(?,?,?,?,?)",
        [userName,RRN,phoneNumber,address,age],
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