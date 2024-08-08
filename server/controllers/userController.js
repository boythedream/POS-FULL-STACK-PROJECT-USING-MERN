import userModel from '../models/userModel.js'

export const registerController = async (req, res) => {
    try {

        const user = await userModel({ ...req.body, varified: true })
        await user.save()
        res.status(200).send({
            message: "User registerd Successfully",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
export const LoginController = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await userModel.findOne({ email, password, varified: true })
        if (user) {
            res.status(200).send(user)

        } else {
            res.json({
                message: "Login fail",
                user,
            })
        }
        await user.save()
        res.status(200).send({
            message: "User login Successfully",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

