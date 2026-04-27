import mongoose from 'mongoose';

// 🚀 시작 전 준비 (한 번만 하면 돼요):
//   1. https://www.mongodb.com/cloud/atlas 에서 무료 계정 생성
//   2. 클러스터(M0 Free) 생성 → Database Access 에서 사용자 추가 (ID/비밀번호 꼭 기억!)
//   3. Network Access 에서 IP 0.0.0.0/0 추가 (모든 IP 허용)
//   4. Connect → Drivers → 연결 문자열 복사
//   5. 프로젝트 루트에 .env 파일을 만들고 MONGODB_URI 에 붙여넣기
//      (.env.example 파일을 참고하세요)

// TODO: connectDB 함수의 본문을 채우세요.
//   - mongoose.connect(process.env.MONGODB_URI) 를 await 하세요.
//   - 성공하면: console.log('✅ MongoDB 연결 성공!')
//   - 실패하면: console.error('❌ MongoDB 연결 실패:', error.message) 후
//               process.exit(1) 로 서버 종료
//   - try-catch 로 감싸야 해요!

async function connectDB() {
  // 여기를 채우세요!
}

export default connectDB;
