import mongoose from 'mongoose'

class DataBase {
    constructor() {
        this.mongoDataBase()
    }
    mongoDataBase() {
        this.mongoDBConnection = mongoose.connect('mongodb+srv://admin:123@cluster0.dw7bq.mongodb.net/lagrangeanos?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => {
            console.log("Conexão com MongoDB realizada com sucesso!")
        }).catch((erro) => {
            console.log("Erro: Conexão com MongoDB não foi realizado com sucesso: " + erro)
        })
    }
}

export default new DataBase()
