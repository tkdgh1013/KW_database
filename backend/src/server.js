import express from 'express';
import { init } from './config/db.js';
import cors from 'cors';
import testUser from '/users/tkdgh/desktop/db_project/kw_database/backend/src/api/user/testuser.js';
import login from './api/User/login.js';


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
app.set('port', process.env.PORT || 4000);

app.listen(app.get('port'), () => {
  console.log('Port : ' + app.get('port'));
});
