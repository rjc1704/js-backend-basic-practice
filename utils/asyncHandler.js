// ─────────────────────────────────────────────────────────────
// 실습#7: asyncHandler 패턴
// ─────────────────────────────────────────────────────────────
//
// asyncHandler 는 async 라우트 핸들러를 감싸서 에러를 자동으로 처리해주는
// "래퍼(wrapper) 함수" 입니다.
//
// MongoDB 작업에서 자주 발생하는 에러 3가지를 처리해요:
//   - ValidationError → 스키마 유효성 검사 실패 (예: title 누락) → 400 Bad Request
//   - CastError       → 잘못된 ObjectId 형식 → 404 Not Found
//   - 그 외           → 예상치 못한 서버 오류 → 500 Internal Server Error
//
// 💡 이번 교안에서는 "에러 핸들러 미들웨어" 는 사용하지 않아요.
//    asyncHandler 가 직접 res 로 응답을 보내는 방식이에요.

// TODO: asyncHandler 함수를 완성하세요.
//
//   요구사항:
//     1) 매개변수: fn (async 함수, 라우트 핸들러)
//     2) 반환값: 새로운 (req, res) => { ... } 함수
//     3) 새 함수 안에서 fn(req, res) 를 await 하고 try-catch 로 감싸세요.
//     4) catch 블록에서 e.name 에 따라 분기 처리:
//          - 'ValidationError' → res.status(400).json({ message: e.message })
//          - 'CastError'       → res.status(404).json({ message: 'Cannot find given id.' })
//          - 그 외             → res.status(500).json({ message: e.message })
//
//   완성 예시 사용:
//     app.get('/todos', asyncHandler(async (req, res) => {
//       const todos = await Todo.find();
//       res.json(todos);  // try-catch 없이 깔끔!
//     }));
//
//   📦 ValidationError 응답 예시 (400 Bad Request)
//      — POST /todos 에 title 없이 보내면 자동으로 이렇게 응답돼요
//      { "message": "Todo validation failed: title: title 은 필수예요." }
//
//   📦 CastError 응답 예시 (404 Not Found)
//      — GET /todos/이건_잘못된_id 같이 ObjectId 형식이 아닐 때
//      { "message": "Cannot find given id." }
//
//   📦 그 외 에러 응답 예시 (500 Internal Server Error)
//      { "message": "..." }

export const asyncHandler = (fn) => {
  // 여기를 채우세요!
};
