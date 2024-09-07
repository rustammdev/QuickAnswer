import QuestionsModel from '../models/questions.model.js'

class LikeService {
    async SetLikes(questionId, userId) {
        try {
            const question = await QuestionsModel.findById(questionId)

            if (!question) {
                return {
                    status: 'fail',
                    code: 409,
                    message: 'Question not found',
                }
            }

            let unLikedUser = question.unLikedUsers.includes(userId)
            let likedUser = question.likedUsers.includes(userId)

            if (likedUser) {
                await QuestionsModel.updateOne(
                    { _id: questionId },
                    {
                        $pull: { likedUsers: userId },
                        $inc: { likeCount: -1 },
                    },
                )
            } else if (!likedUser) {
                await QuestionsModel.updateOne(
                    { _id: questionId },
                    {
                        $push: { likedUsers: userId },
                        $pull: { unLikedUsers: userId },
                        $inc: {
                            likeCount: 1,
                            ...(unLikedUser && { unlikeCount: -1 }),
                        },
                    },
                )
            }

            // Yangilangan ma'lumotni qayta olish
            const updatedQuestion = await QuestionsModel.findById(questionId)

            return {
                status: 'success',
                code: 200,
                userId,
                unLikedUser: updatedQuestion.unLikedUsers,
                likedUser: updatedQuestion.likedUsers,
                likeCount: updatedQuestion.likeCount,
                unlikeCount: updatedQuestion.unlikeCount,
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

    async SetUnLikes(questionId, userId) {
        try {
            const question = await QuestionsModel.findById(questionId)

            if (!question) {
                return {
                    status: 'fail',
                    code: 409,
                    message: 'Question not found',
                }
            }

            let likedUser = question.likedUsers.includes(userId)
            let unLikedUser = question.unLikedUsers.includes(userId)

            if (unLikedUser) {
                await QuestionsModel.updateOne(
                    { _id: questionId },
                    {
                        $pull: { unLikedUsers: userId },
                        $inc: { unlikeCount: -1 },
                    },
                )
            } else if (!unLikedUser) {
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
            }

            // Yangilangan ma'lumotni qayta olish
            const updatedQuestion = await QuestionsModel.findById(questionId)

            return {
                status: 'success',
                code: 200,
                userId,
                unLikedUser: updatedQuestion.unLikedUsers,
                likedUser: updatedQuestion.likedUsers,
                likeCount: updatedQuestion.likeCount,
                unlikeCount: updatedQuestion.unlikeCount,
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
