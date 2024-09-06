import QuestionsModel from '../models/questions.model.js'
import LikeModel from '../models/likes.model.js'

class LikeService {
    // Bosgan yoki bosmaganini bilish
    async SetLikes(questionId, payload, userId) {
        try {
            const { liked, unliked } = payload

            const question = await QuestionsModel.findById({
                _id: questionId,
            })

            if (!question) {
                return {
                    status: 'fail',
                    code: 409,
                    message: 'Question not found',
                }
            }
            const unLikedUser = question.unLikedUsers.includes(userId)
            const likedUser = question.likedUsers.includes(userId)

            // Agar foydalanuvchi like qilgan bo'lsa va yana like bossa, like'ni bekor qilish
            if (liked && likedUser) {
                await QuestionsModel.updateOne(
                    { _id: questionId },
                    {
                        $pull: { likedUsers: userId },
                        $inc: { likeCount: -1 },
                    },
                )
                question.likeCount -= 1
            }
            // Agar foydalanuvchi like qilmagan bo'lsa, like'ni qo'shish
            else if (liked && !likedUser) {
                await QuestionsModel.updateOne(
                    { _id: questionId },
                    {
                        $push: { likedUsers: userId },
                        $pull: { unLikedUsers: userId },
                        $inc: {
                            likeCount: 1,
                            ...(unLikedUser && { unlikeCount: -1 }),
                        }, // unlike'ni ham bekor qilish
                    },
                )
                question.likeCount += 1
                if (unLikedUser) {
                    question.unlikeCount -= 1
                }
            }

            return {
                status: 'success',
                code: 200,
                unLikedUser,
                likedUser,
                likeCount: question.likeCount,
                unlikeCount: question.unlikeCount,
            }
        } catch (e) {
            return {
                status: 'fail',
                code: 404,
                message: 'SetLikes error',
                error: e.message,
            }
        }
    }

    async SetUnLikes(questionId, payload, userId) {
        try {
            const { liked, unliked } = payload

            const question = await QuestionsModel.findById({
                _id: questionId,
            })

            if (!question) {
                return {
                    status: 'fail',
                    code: 409,
                    message: 'Question not found',
                }
            }
            const unLikedUser = question.unLikedUsers.includes(userId)
            const likedUser = question.likedUsers.includes(userId)

            // Agar foydalanuvchi unlike qilgan bo'lsa va yana unlike bossa, unlike'ni bekor qilish
            if (unliked && unLikedUser) {
                await QuestionsModel.updateOne(
                    { _id: questionId },
                    {
                        $pull: { unLikedUsers: userId },
                        $inc: { unlikeCount: -1 },
                    },
                )
                question.unlikeCount -= 1
            }
            // Agar foydalanuvchi unlike qilmagan bo'lsa, unlike'ni qo'shish
            else if (unliked && !unLikedUser) {
                await QuestionsModel.updateOne(
                    { _id: questionId },
                    {
                        $push: { unLikedUsers: userId },
                        $pull: { likedUsers: userId },
                        $inc: {
                            unlikeCount: 1,
                            ...(likedUser && { likeCount: -1 }),
                        },
                    },
                )
                question.unlikeCount += 1
                if (likedUser) {
                    question.likeCount -= 1
                }
            }

            return {
                status: 'success',
                code: 200,
                unLikedUser,
                likedUser,
                likeCount: question.likeCount,
                unlikeCount: question.unlikeCount,
            }
        } catch (e) {
            return {
                status: 'fail',
                code: 404,
                message: 'SetUnLikes error',
                error: e.message,
            }
        }
    }
}

export default new LikeService()
