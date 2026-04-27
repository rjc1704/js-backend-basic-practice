import dotenv from 'dotenv';
import express from 'express';
import connectDB from './db.js';
import Todo from './models/Todo.js';

// .env 파일 로드 (반드시 다른 코드보다 먼저!)
dotenv.config();

const app = express();
app.use(express.json());

// MongoDB 연결
connectDB();

// 기존 todos 배열은 완전히 삭제했어요!
// 이제 데이터는 MongoDB 에서 가져옵니다.
//
// 🌱 시작하기 전에 `npm run seed` 를 한 번 실행해서 샘플 데이터를 채워두세요.
//    (실습#5 에서 만든 seed.js 가 5개의 todo 를 DB 에 넣어줍니다)
//
// ⚠️ 중요한 변화:
//   - id 가 더 이상 nanoid(짧은 문자열) 가 아니라 MongoDB 의 ObjectId 문자열이에요.
//     예) "65f1a2b3c4d5e6f7a8b9c0d1"
//   - DB 작업은 모두 비동기(async) 라서 await 가 필요해요.
//   - DB 작업은 에러가 날 수 있으니 반드시 try-catch 로 감싸세요!
//     (처리하지 않으면 서버가 꺼질 수 있어요)

// ─────────────────────────────────────────────────────────────
// 실습#6: CRUD 를 MongoDB 로 전환하기
// ─────────────────────────────────────────────────────────────

// TODO 1: GET /todos  (async + try-catch 직접 작성!)
//   - Todo.find() 로 전체 조회.
//   - 쿼리스트링 completed 가 있으면 필터로 전달:
//       const filter = {};
//       if (req.query.completed !== undefined) {
//         filter.completed = req.query.completed === 'true';
//       }
//       const todos = await Todo.find(filter);
//   - 성공: res.json(todos)
//   - catch: res.status(500).json({ message: error.message })
//
//   📦 성공 응답 예시 (200 OK)  — Mongoose 가 _id, timestamps 를 자동으로 붙여줘요!
//      [
//        {
//          "_id": "65f1a2b3c4d5e6f7a8b9c0d1",
//          "title": "운동하기",
//          "completed": false,
//          "createdAt": "2026-04-27T10:00:00.000Z",
//          "updatedAt": "2026-04-27T10:00:00.000Z",
//          "__v": 0
//        }
//      ]
//
//   📦 실패 응답 예시 (500 Internal Server Error)
//      { "message": "..." }
//
// 작성 위치: 여기 아래에 app.get('/todos', async (req, res) => { ... })


// TODO 2: GET /todos/:id  (async + try-catch 직접 작성!)
//   - Todo.findById(req.params.id) 로 조회.
//   - 결과가 null 이면 404 응답.
//     예) if (!todo) return res.status(404).json({ message: '...' });
//   - 잘못된 ObjectId 형식이면 catch 블록으로 들어와요 → 400 응답:
//       res.status(400).json({ message: '잘못된 id 형식이에요.' })
//
//   📦 성공 응답 예시 (200 OK)
//      {
//        "_id": "65f1a2b3c4d5e6f7a8b9c0d1",
//        "title": "운동하기",
//        "completed": false,
//        "createdAt": "2026-04-27T10:00:00.000Z",
//        "updatedAt": "2026-04-27T10:00:00.000Z",
//        "__v": 0
//      }
//
//   📦 실패 응답 예시 (404 Not Found)  — id 형식은 맞지만 없는 항목
//      { "message": "할 일을 찾을 수 없어요." }
//
//   📦 실패 응답 예시 (400 Bad Request)  — id 형식이 잘못된 경우 (CastError)
//      { "message": "잘못된 id 형식이에요." }


// TODO 3: POST /todos  (async + try-catch 직접 작성!)
//   - Todo.create(req.body) 로 생성.
//     스키마에서 required/trim 등을 검증해주니, 별도 검증 코드 불필요!
//   - 성공: res.status(201).json(newTodo)
//   - catch: res.status(400).json({ message: error.message })
//     (Mongoose 의 ValidationError 메시지가 친절하게 들어 있어요)
//
//   📦 요청 body 예시
//      { "title": "MongoDB 공부하기" }
//
//   📦 성공 응답 예시 (201 Created)
//      {
//        "_id": "65f1a2b3c4d5e6f7a8b9c0d2",
//        "title": "MongoDB 공부하기",
//        "completed": false,
//        "createdAt": "2026-04-27T10:00:00.000Z",
//        "updatedAt": "2026-04-27T10:00:00.000Z",
//        "__v": 0
//      }
//
//   📦 실패 응답 예시 (400 Bad Request)  — title 누락 시 ValidationError
//      { "message": "Todo validation failed: title: title 은 필수예요." }


// TODO 4: PATCH /todos/:id  (async + try-catch 직접 작성!)
//   - Todo.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
//       new: true            → 수정 후의 문서를 반환 (기본은 수정 전!)
//       runValidators: true  → 수정 시에도 스키마 검증 실행
//   - 결과가 null 이면 404.
//   - catch: res.status(400).json({ message: error.message })
//
//   📦 요청 body 예시
//      { "completed": true }
//
//   📦 성공 응답 예시 (200 OK)  — updatedAt 이 갱신된 점에 주목!
//      {
//        "_id": "65f1a2b3c4d5e6f7a8b9c0d1",
//        "title": "운동하기",
//        "completed": true,
//        "createdAt": "2026-04-27T10:00:00.000Z",
//        "updatedAt": "2026-04-27T10:05:00.000Z",
//        "__v": 0
//      }
//
//   📦 실패 응답 예시 (404 Not Found)
//      { "message": "할 일을 찾을 수 없어요." }


// TODO 5: DELETE /todos/:id  (async + try-catch 직접 작성!)
//   - Todo.findByIdAndDelete(id) 로 삭제.
//   - 결과가 null 이면 404.
//   - 성공: res.json({ message: '삭제되었어요.', data: deleted })
//   - catch: res.status(500).json({ message: error.message })
//
//   📦 성공 응답 예시 (200 OK)
//      {
//        "message": "삭제되었어요.",
//        "data": {
//          "_id": "65f1a2b3c4d5e6f7a8b9c0d1",
//          "title": "운동하기",
//          "completed": false,
//          "createdAt": "2026-04-27T10:00:00.000Z",
//          "updatedAt": "2026-04-27T10:00:00.000Z",
//          "__v": 0
//        }
//      }
//
//   📦 실패 응답 예시 (404 Not Found)
//      { "message": "할 일을 찾을 수 없어요." }


// ─────────────────────────────────────────────────────────────
// 서버 시작
// ─────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중이에요! 🚀`);
});
