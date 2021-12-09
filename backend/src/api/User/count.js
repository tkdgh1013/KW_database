export default (app, conn) =>{
    app.get('/count', (req,res,next)=>{
    
        
        //날짜별 누적 1차백신 접종자수 카운트
        
        
        conn.query("with first as (SELECT D.Date, COUNT(R.RRN) as cnt1,SUM(COUNT(*)) OVER(ORDER BY D.Date) as sumcnt1 FROM officedate as D, reservationinfo as R, user as U WHERE D.DateId=R.DateId and U.RRN=R.RRN GROUP BY D.Date Order by D.Date), second as (SELECT D.Date,COUNT(R.RRN) as cnt2, SUM(COUNT(*)) OVER(ORDER BY D.Date) as sumcnt2 FROM officedate as D, reservationinfo as R, user as U WHERE D.DateId=R.DateId and U.RRN=R.RRN and VaccineNum=2 GROUP BY D.Date Order by D.Date) select first.Date, first.cnt1,first.sumcnt1,second.cnt2,second.sumcnt2 From first left join second on first.Date=second.Date Order by first.Date;",
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