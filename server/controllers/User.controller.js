import UserModel from '../models/User.model.js'

const createUser = async (req, res) => {
        const user = new UserModel({
        username: req.body.username,
        password: req.body.password
    })

    try {
        const response = await user.save()   
        res.status(201).send(response)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}


const getAllUsers = async (req, res) => {
    try {
    const response =  await UserModel.find()
    res.status(200).send(response)
} catch (error) {
    res.status(500).send({ message: error.message })
}
}


const getUserWithId = async (req, res) => {
    try{
        const response = await UserModel.findById(req.params.userId)
        res.status(200).send(response)
    } catch (error) {
       res.status(500).send({
           message: 'Hittade inte användaren' + req.params.userId,
           error: error.message
       })
    }
}
 
const getUserWithUsernameQuery = async (req, res) => {
    try{
        const response = await UserModel.find({ username: req.query.username})
        response.length !== 0
         ? res.status(200).send(response)
         : res.status(404).send({ message: 'Kunde inte hitta användaren ' + req.query.username })
      
    } catch (error) {
        res.status(500).send({
            message: 'Lyckades inte hitta någon med detta: ' + req.query.userId,
            error: error.message
        })

    }

}

const updateUser = async (req, res) => {
    try{
        if(!req.body) {return res.status(400).send({message: 'Kan inte uppdatera tomma värden' }) }
        const response = await UserModel.findByIdAndUpdate(req.params.userId, {
            username: req.body.username,
            password: req.body.password
        }, { new: true })
        res.status(200).send(response)
    } catch(error) {
        res.status(500).send({
            message: 'fel inträffade vid uppdatering av användarens ID: ' + req.params.userId, 
            error: error.message
        })

    }
}

const deleteUser = async (req, res) => {
    try {
    const response = await UserModel.findByIdAndDelete(req.params.userId)
     res.status(200).send({
     message: `Användaren med användarnamnet: ${response.username} och ID: ${req.params.userId} har tagits bort`
     })
    } catch (error) {
        res.status(500).send({
            message: 'Det gick inte att ta bort användaren med ID: ' + req.params.userId,
            error: error.message
        })

    }
}
export default {
    createUser,
    getAllUsers,
    getUserWithId,
    getUserWithUsernameQuery,
    updateUser,
    deleteUser
}