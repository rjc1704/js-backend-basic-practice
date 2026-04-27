import mongoose from 'mongoose';

// ─────────────────────────────────────────────────────────────
// 실습#5: Mongoose 스키마/모델 만들기
// ─────────────────────────────────────────────────────────────
//
// 스키마(Schema) = 데이터의 "설계도"
//   어떤 필드가 있는지, 타입은 뭔지, 필수인지 등을 정의해요.
//   여기에 맞지 않는 데이터는 저장이 안 돼요! (자동 검증)

// TODO 1: todoSchema 를 정의하세요.
//
//   필드 (첫 번째 인자):
//     - title: String 타입, 필수(required), trim 적용 (앞뒤 공백 자동 제거)
//         → { type: String, required: true, trim: true }
//         → required 에 메시지를 줄 수도 있어요:
//            { type: String, required: [true, 'title 은 필수예요.'], trim: true }
//
//     - completed: Boolean 타입, 기본값 false
//         → { type: Boolean, default: false }
//
//   옵션 (두 번째 인자):
//     - timestamps: true
//         → createdAt, updatedAt 필드가 자동으로 생기고 관리돼요!

const todoSchema = new mongoose.Schema(
  {
    // 여기를 채우세요!
  },
  {
    // 여기에 옵션!
  }
);

// TODO 2: 모델을 만들어서 default export 하세요.
//   - mongoose.model('Todo', todoSchema) 로 모델 생성
//   - export default 로 내보내기
//
//   💡 모델 이름은 첫 글자 대문자로 ('Todo') — 컬렉션 이름은 자동으로
//      소문자 복수형으로 바뀌어요. ('todos')


// 여기에 export default 작성!
