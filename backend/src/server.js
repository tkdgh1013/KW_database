import express from 'express';
import { init } from './config/db.js';
import cors from 'cors';
import testUser from './api/user/testuser.js';
import login from './api/User/login.js';
import join from './api/User/join.js';
import list from './api/User/hospital/list.js';
import vaccine_info from './api/User/vaccine_info.js';
import hinfo from './api/User/hospital/hinfo.js';
import Hsearch from './api/User/hospital/Hsearch.js';
import count from './api/User/count.js';
import addRes from './api/User/addRes.js';
import subRes from './api/User/subRes.js';

const conn = init();

const app = express();

let corsOption = {
  origin: 'http://localhost:3000', // 허락하는 요청 주소
  credentials: true, // true로 하면 설정한 내용을 response 헤더에 추가 해줍니다.
};
app.use(cors(corsOption)); // CORS 미들웨어 추가
app.use(
  express.json({
    limit: '1000mb',
  }),
);

const router = express.Router();
testUser(app,conn);
login(app,conn);
join(app,conn);
list(app,conn);
hinfo(app,conn);
vaccine_info(app,conn);
Hsearch(app,conn);
count(app,conn);
addRes(app,conn);
subRes(app,conn);
app.set('port', process.env.PORT || 4000);

app.listen(app.get('port'), () => {
  console.log('Port : ' + app.get('port'));
});
