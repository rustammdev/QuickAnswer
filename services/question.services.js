class QuestionServices{
    async getQuestions(question){
        return {status : "success", code : 200, message : "Question sended!"}
    }
}


export  default  new QuestionServices()