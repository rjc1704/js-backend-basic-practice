import dotenv from "dotenv";
import express from "express";
import { nanoid } from "nanoid";
import connectDB from "./db.js";
import Todo from "./models/Todo.js";

// .env 파일 로드 (반드시 다른 코드보다 먼저!)
dotenv.config();

const app = express();
app.use(express.json());

// MongoDB 연결
connectDB();

// 🌱 시작하기 전에 `npm run seed` 를 한 번 실행해서 샘플 데이터를 채워두세요.
//    (실습#5 에서 만든 seed.js 가 5개의 todo 를 DB 에 넣어줍니다)

// ─────────────────────────────────────────────────────────────
// 실습#6: 기존 배열 기반 CRUD 를 MongoDB(Mongoose) 기반으로 수정하기
// ─────────────────────────────────────────────────────────────
//
// 아래 5개 라우트는 todos 배열을 사용해서 동작해요. (실습#1~#3 에서 만든 코드)
// 이번 실습의 목표는 각 라우트를 Mongoose 모델(Todo) 사용하도록 "한 줄씩 수정"하는 거예요.
//
// ⚠️ 큰 변화 3가지:
//   1) id 가 nanoid(21자) 에서 MongoDB 의 ObjectId 문자열로 바뀌어요.
//      예) "V1StGXR8_Z5jdHi6B-myT" → "65f1a2b3c4d5e6f7a8b9c0d1"
//   2) DB 작업은 모두 비동기(async) → 핸들러 앞에 async 붙이고 await 사용.
//   3) DB 작업은 에러가 날 수 있어요 → 반드시 try-catch 로 감싸기!
//      (catch 안에서 직접 res.status(...).json(...) 호출)
//
// 💡 모든 라우트를 다 바꾸고 나면 아래 두 가지는 더 이상 필요 없으니 마지막에 삭제하세요:
//      - todos 배열
//      - import { nanoid } from 'nanoid';

// 임시 데이터 (✂️ 5개 라우트 다 바꾸고 나면 이 배열도 삭제!)
let todos = [
  { id: "V1StGXR8_Z5jdHi6B-myT", title: "운동하기", completed: false },
  { id: "Uakgb_J5m9g-0JDMbcJqL", title: "책 읽기", completed: true },
  { id: "lXKNaG4yDvCBOpMlLzGCp", title: "Express 공부하기", completed: false },
];

// ─────────────────────────────────────────────────────────────
// TODO 1: GET /todos 를 MongoDB 기반으로 바꾸세요.
//
//   📌 바꿀 방향
//      - Todo.find() 로 조회.
//      - Todo.find({}) 로 query 조건 추가 가능.
//
//   📦 성공 응답 예시 (200 OK)  — Mongoose 가 _id, timestamps 를 자동 부여
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
// ─────────────────────────────────────────────────────────────
app.get("/todos", (req, res) => {
  const { completed } = req.query;

  if (completed === undefined) {
    return res.json(todos);
  }

  const completedBool = completed === "true";
  const filtered = todos.filter((todo) => todo.completed === completedBool);
  res.json(filtered);
});

// ─────────────────────────────────────────────────────────────
// TODO 2: GET /todos/:id 를 MongoDB 기반으로 바꾸세요.
//
//   📌 바꿀 방향
//      - Todo.findById(req.params.id) 로 조회.
//      - 결과가 null 이면 404.
//      - 잘못된 ObjectId 형식이면 catch 블록으로 들어와요 → 400.
//      - async + try-catch.
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
//   📦 실패 응답 예시 (404 Not Found)  — id 형식은 맞지만 없는 항목
//      { "message": "할 일을 찾을 수 없어요." }
//   📦 실패 응답 예시 (400 Bad Request)  — id 형식 자체가 잘못된 경우 (CastError)
//      { "message": "잘못된 id 형식이에요." }
// ─────────────────────────────────────────────────────────────
app.get("/todos/:id", (req, res) => {
  const { id } = req.params;
  const todo = todos.find((t) => t.id === id);

  if (!todo) {
    return res
      .status(404)
      .json({ message: `id ${id} 인 할 일을 찾을 수 없어요.` });
  }

  res.json(todo);
});

// ─────────────────────────────────────────────────────────────
// TODO 3: POST /todos 를 MongoDB 기반으로 바꾸세요.
//
//   📌 바꿀 방향
//      - Todo.create(req.body) 로 생성.
//        스키마에서 required/trim 등을 검증해주니, 직접 title 검증 코드는 더 이상 필요 없어요.
//        (지금 여기 있는 if (!title) {...} 검증 로직은 삭제!)
//      - nanoid() 도 더 이상 필요 없어요. _id 는 Mongoose 가 자동으로 부여해요.
//      - 성공 시 201, 실패 시 catch 에서 400 (Mongoose 의 ValidationError 메시지가 친절해요).
//
//   📦 요청 body 예시
//      { "title": "MongoDB 공부하기" }
//   📦 성공 응답 예시 (201 Created)
//      {
//        "_id": "65f1a2b3c4d5e6f7a8b9c0d2",
//        "title": "MongoDB 공부하기",
//        "completed": false,
//        "createdAt": "2026-04-27T10:00:00.000Z",
//        "updatedAt": "2026-04-27T10:00:00.000Z",
//        "__v": 0
//      }
//   📦 실패 응답 예시 (400 Bad Request)  — title 누락 시 ValidationError
//      { "message": "Todo validation failed: title: title 은 필수예요." }
// ─────────────────────────────────────────────────────────────
app.post("/todos", (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ message: "title은 필수입니다." });
  }

  const newTodo = { id: nanoid(), title, completed: false };
  todos.push(newTodo);

  res.status(201).json(newTodo);
});

// ─────────────────────────────────────────────────────────────
// TODO 4: PATCH /todos/:id 를 MongoDB 기반으로 바꾸세요.
//
//   📌 바꿀 방향
//      - Todo.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
//          new: true            → 수정 후의 문서를 반환 (기본은 수정 전!)
//          runValidators: true  → 수정 시에도 스키마 검증 실행
//      - 결과가 null 이면 404.
//      - catch 에서 400 응답.
//
//   📦 요청 body 예시
//      { "completed": true }
//   📦 성공 응답 예시 (200 OK)  — updatedAt 이 갱신된 점에 주목!
//      {
//        "_id": "65f1a2b3c4d5e6f7a8b9c0d1",
//        "title": "운동하기",
//        "completed": true,
//        "createdAt": "2026-04-27T10:00:00.000Z",
//        "updatedAt": "2026-04-27T10:05:00.000Z",
//        "__v": 0
//      }
//   📦 실패 응답 예시 (404 Not Found)
//      { "message": "할 일을 찾을 수 없어요." }
// ─────────────────────────────────────────────────────────────
app.patch("/todos/:id", (req, res) => {
  const { id } = req.params;
  const index = todos.findIndex((t) => t.id === id);

  if (index === -1) {
    return res
      .status(404)
      .json({ message: `id ${id} 인 할 일을 찾을 수 없어요.` });
  }

  todos[index] = { ...todos[index], ...req.body };
  res.json(todos[index]);
});

// ─────────────────────────────────────────────────────────────
// TODO 5: DELETE /todos/:id 를 MongoDB 기반으로 바꾸세요.
//
//   📌 바꿀 방향
//      - Todo.findByIdAndDelete(req.params.id) 로 삭제.
//      - 결과가 null 이면 404.
//      - 성공 시 삭제된 항목을 응답.
//      - catch 에서 500 응답.
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
//   📦 실패 응답 예시 (404 Not Found)
//      { "message": "할 일을 찾을 수 없어요." }
// ─────────────────────────────────────────────────────────────
app.delete("/todos/:id", (req, res) => {
  const { id } = req.params;
  const index = todos.findIndex((t) => t.id === id);

  if (index === -1) {
    return res
      .status(404)
      .json({ message: `id ${id} 인 할 일을 찾을 수 없어요.` });
  }

  const deleted = todos.splice(index, 1)[0];
  res.json({ message: "삭제되었어요.", data: deleted });
});

// ─────────────────────────────────────────────────────────────
// 서버 시작
// ─────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중이에요! 🚀`);
});
