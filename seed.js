import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Todo from './models/Todo.js';

// .env 파일 로드 (반드시 다른 코드보다 먼저!)
dotenv.config();

// ─────────────────────────────────────────────────────────────
// 실습#5 (이어서): 시드 데이터 만들기
// ─────────────────────────────────────────────────────────────
//
// 시드(Seed) 데이터 = 개발/테스트용으로 DB 에 미리 넣어두는 샘플 데이터
//
// 왜 필요한가요?
//   - DB 를 처음 연결하면 데이터가 텅 비어있어요.
//   - GET 요청을 테스트하려면 조회할 데이터가 있어야 해요.
//   - 매번 POST 로 하나씩 추가하기엔 번거로워요.
// → 이 스크립트를 한 번 실행하면 샘플 Todo 들이 한꺼번에 DB 에 들어가요!
//
// 실행 방법:
//   npm run seed
//   (package.json 의 scripts 에 "seed": "node seed.js" 가 등록돼 있어요)

const seedData = [
  { title: '운동하기', completed: false },
  { title: '책 읽기', completed: true },
  { title: 'Express 공부하기', completed: false },
  { title: 'MongoDB 익히기', completed: false },
  { title: '백엔드 마스터하기', completed: false },
];

// TODO: seed 함수의 본문을 채우세요!
//
//   순서:
//     1) await mongoose.connect(process.env.MONGODB_URI)  ← DB 연결
//        성공 후 console.log('✅ DB 연결 성공')
//
//     2) await Todo.deleteMany({})                         ← 기존 데이터 전체 삭제
//        성공 후 console.log('🗑️  기존 데이터 삭제 완료')
//        💡 deleteMany({}) 를 먼저 실행하는 이유:
//           시드를 여러 번 실행해도 데이터가 중복으로 쌓이지 않게!
//           실행할 때마다 깨끗하게 초기화 후 삽입해요.
//
//     3) await Todo.insertMany(seedData)                   ← 샘플 데이터 한 번에 삽입
//        성공 후 console.log(`🌱 시드 데이터 ${seedData.length}개 삽입 완료`)
//
//     4) await mongoose.disconnect()                       ← DB 연결 해제
//        성공 후 console.log('👋 DB 연결 종료')
//
//   📦 실행 결과 예시 (npm run seed)
//      ✅ DB 연결 성공
//      🗑️  기존 데이터 삭제 완료
//      🌱 시드 데이터 5개 삽입 완료
//      👋 DB 연결 종료
//
//   💡 try-catch 는 없어도 돼요! 에러가 나면 그냥 출력하고 종료되도록.
//      (이 스크립트는 우리가 직접 실행하는 도구이지, 사용자 요청을 받는 서버가 아니에요)

async function seed() {
  // 여기를 채우세요!
}

seed();
