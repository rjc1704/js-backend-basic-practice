import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Todo from './models/Todo.js';

// .env 파일 로드 (반드시 다른 코드보다 먼저!)
dotenv.config();

// ─────────────────────────────────────────────────────────────
// 실습#5 (이어서): 시드 데이터 (✅ 완료)
// ─────────────────────────────────────────────────────────────
//
// 시드(Seed) 데이터 = 개발/테스트용으로 DB 에 미리 넣어두는 샘플 데이터.
// 실행 방법: npm run seed
//
// deleteMany({}) → insertMany() 순서로 실행해서
// 시드 스크립트를 여러 번 돌려도 데이터가 중복으로 쌓이지 않아요.

const seedData = [
  { title: '운동하기', completed: false },
  { title: '책 읽기', completed: true },
  { title: 'Express 공부하기', completed: false },
  { title: 'MongoDB 익히기', completed: false },
  { title: '백엔드 마스터하기', completed: false },
];

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('✅ DB 연결 성공');

  await Todo.deleteMany({});
  console.log('🗑️  기존 데이터 삭제 완료');

  await Todo.insertMany(seedData);
  console.log(`🌱 시드 데이터 ${seedData.length}개 삽입 완료`);

  await mongoose.disconnect();
  console.log('👋 DB 연결 종료');
}

seed();
