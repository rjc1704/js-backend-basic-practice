import dotenv from 'dotenv';
import express from 'express';
import connectDB from './db.js';
import Todo from './models/Todo.js';
// TODO: utils/asyncHandler.js 에서 asyncHandler 를 import 하세요.
//   import { asyncHandler } from './utils/asyncHandler.js';

dotenv.config();

const app = express();
app.use(express.json());

connectDB();

// ─────────────────────────────────────────────────────────────
// 실습#6: MongoDB CRUD (✅ 완료 — 단, 모든 라우트에 try-catch 가 반복돼요)
// ─────────────────────────────────────────────────────────────
//
// 아래 5개 라우트를 보면 try-catch 가 똑같이 반복되고 있어요.
// 라우트가 늘어날수록 코드가 점점 지저분해지죠.
// 실습#7 에서 asyncHandler 래퍼로 깔끔하게 정리해 봅시다!

// GET /todos — 전체 조회 (+ completed 필터)
app.get('/todos', async (req, res) => {
  try {
    const filter = {};
    if (req.query.completed !== undefined) {
      filter.completed = req.query.completed === 'true';
    }
    const todos = await Todo.find(filter);
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /todos/:id — 단일 조회
app.get('/todos/:id', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: '할 일을 찾을 수 없어요.' });
    }
    res.json(todo);
  } catch (error) {
    res.status(400).json({ message: '잘못된 id 형식이에요.' });
  }
});

// POST /todos — 새 항목 생성
app.post('/todos', async (req, res) => {
  try {
    const newTodo = await Todo.create(req.body);
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PATCH /todos/:id — 수정
app.patch('/todos/:id', async (req, res) => {
  try {
    const updated = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) {
      return res.status(404).json({ message: '할 일을 찾을 수 없어요.' });
    }
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE /todos/:id — 삭제
app.delete('/todos/:id', async (req, res) => {
  try {
    const deleted = await Todo.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: '할 일을 찾을 수 없어요.' });
    }
    res.json({ message: '삭제되었어요.', data: deleted });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ─────────────────────────────────────────────────────────────
// 실습#7: asyncHandler 패턴 적용하기
// ─────────────────────────────────────────────────────────────
//
// 위의 5개 라우트를 보면 try-catch 가 거의 똑같이 반복되고 있죠?
// asyncHandler 래퍼로 try-catch 를 한 곳으로 모아서 코드를 깔끔하게 만들어 봐요!
//
// 사용 예시:
//   app.get('/todos', asyncHandler(async (req, res) => {
//     const todos = await Todo.find();
//     res.json(todos);
//   }));
//
// 위 라우트들과 비교해 보세요. try-catch 가 사라져서 훨씬 읽기 쉬워요!

// TODO: 위의 5개 라우트(GET, GET/:id, POST, PATCH, DELETE)를 모두 asyncHandler 로
//       감싸도록 리팩토링하세요. 위에 있는 기존 try-catch 버전 5개는 모두 삭제하고,
//       아래에 asyncHandler 버전으로 새로 작성하면 돼요.
//
//   주의 사항:
//     - 잘못된 ObjectId 형식은 CastError 로 자동 처리되니
//       직접 검사할 필요가 없어요. (asyncHandler 안에서 404 응답 처리)
//     - 단, "id 형식은 맞지만 결과가 null" 인 경우는 직접 404 응답을 보내야 해요.
//         예) const todo = await Todo.findById(req.params.id);
//             if (!todo) return res.status(404).json({ message: '...' });
//     - POST 의 ValidationError 도 asyncHandler 안에서 400 으로 자동 처리됩니다.
//
// 작성 위치: 위의 try-catch 버전 5개를 모두 삭제하고 여기에 새로 작성하세요!


// ─────────────────────────────────────────────────────────────
// 서버 시작
// ─────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중이에요! 🚀`);
});
