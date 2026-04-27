import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Todo from './models/Todo.js';

dotenv.config();

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
