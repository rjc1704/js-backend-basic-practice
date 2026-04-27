// TODO 1: dotenv 와 connectDB 를 import 하세요.
//   - import dotenv from 'dotenv';
//   - import connectDB from './db.js';
import express from 'express';
import { nanoid } from 'nanoid';

// TODO 2: dotenv.config() 를 호출해서 .env 파일을 로드하세요.
//   ⚠️ 주의: 다른 코드보다 "맨 먼저" 실행되어야 해요!
//          (그래야 process.env.MONGODB_URI 같은 값을 다른 파일에서 읽을 수 있음)


const app = express();
app.use(express.json());

// TODO 3: connectDB() 를 호출해서 MongoDB 에 연결하세요.
//   서버를 띄우기 전에 DB 부터 연결하는 게 자연스러워요.


// 임시 데이터 (실습#6에서 MongoDB 로 교체할 예정이에요!)
let todos = [
  { id: 'V1StGXR8_Z5jdHi6B-myT', title: '운동하기', completed: false },
  { id: 'Uakgb_J5m9g-0JDMbcJqL', title: '책 읽기', completed: true },
  { id: 'lXKNaG4yDvCBOpMlLzGCp', title: 'Express 공부하기', completed: false },
];

// ─────────────────────────────────────────────────────────────
// 실습#1: GET 엔드포인트 (✅ 완료)
// ─────────────────────────────────────────────────────────────

app.get('/todos', (req, res) => {
  const { completed } = req.query;

  if (completed === undefined) {
    return res.json(todos);
  }

  const completedBool = completed === 'true';
  const filtered = todos.filter((todo) => todo.completed === completedBool);
  res.json(filtered);
});

app.get('/todos/:id', (req, res) => {
  const { id } = req.params;
  const todo = todos.find((t) => t.id === id);

  if (!todo) {
    return res.status(404).json({ message: `id ${id} 인 할 일을 찾을 수 없어요.` });
  }

  res.json(todo);
});

// ─────────────────────────────────────────────────────────────
// 실습#2: POST 엔드포인트 (✅ 완료)
// ─────────────────────────────────────────────────────────────

app.post('/todos', (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ message: 'title은 필수입니다.' });
  }

  const newTodo = { id: nanoid(), title, completed: false };
  todos.push(newTodo);

  res.status(201).json(newTodo);
});

// ─────────────────────────────────────────────────────────────
// 실습#3: PATCH & DELETE 엔드포인트 (✅ 완료)
// ─────────────────────────────────────────────────────────────

app.patch('/todos/:id', (req, res) => {
  const { id } = req.params;
  const index = todos.findIndex((t) => t.id === id);

  if (index === -1) {
    return res.status(404).json({ message: `id ${id} 인 할 일을 찾을 수 없어요.` });
  }

  todos[index] = { ...todos[index], ...req.body };
  res.json(todos[index]);
});

app.delete('/todos/:id', (req, res) => {
  const { id } = req.params;
  const index = todos.findIndex((t) => t.id === id);

  if (index === -1) {
    return res.status(404).json({ message: `id ${id} 인 할 일을 찾을 수 없어요.` });
  }

  const deleted = todos.splice(index, 1)[0];
  res.json({ message: '삭제되었어요.', data: deleted });
});

// ─────────────────────────────────────────────────────────────
// 서버 시작
// ─────────────────────────────────────────────────────────────

// TODO 4: PORT 를 process.env.PORT || 3000 으로 변경하세요.
//   환경변수에 PORT 값이 있으면 그걸 사용하고, 없으면 3000 을 기본값으로.
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중이에요! 🚀`);
});
