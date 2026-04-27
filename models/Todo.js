import mongoose from 'mongoose';

// ─────────────────────────────────────────────────────────────
// 실습#5: Mongoose 스키마/모델 (✅ 완료)
// ─────────────────────────────────────────────────────────────

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'title 은 필수예요.'],
      trim: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // createdAt, updatedAt 자동 생성/갱신
  }
);

const Todo = mongoose.model('Todo', todoSchema);

export default Todo;
