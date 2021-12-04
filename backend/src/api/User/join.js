export default (app, conn) =>{
    app.get('/join', (req,res,next)=>{
        const {userName,RRN,phoneNumber,address} = req.query;
        console.log(userName,RRN,phoneNumber,address);
        var age;
        if(RRN[7]==='1'||RRN[7]==='2'){
            age=122-parseInt(RRN.substr(0,2));
        }
        if(RRN[7]==='3'||RRN[7]==='4'){
            age=22-parseInt(RRN.substr(0,2));
        }
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