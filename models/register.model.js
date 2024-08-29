import { model, Schema } from 'mongoose'

const UserSchema = new Schema(
    {
        firstname: {
            type: String,
            trim: true,
            required: true,
        },
        bio: {
            type: String,
            default: 'No bio',
        },
        username: {
            type: String,
            unique: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },

        moderators: [{ type: Schema.Types.ObjectId, ref: 'Events' }],
    },
    { timestamps: true },
)

UserSchema.pre('save', async function (next) {
    if (!this.username || this.username.trim() === '') {
        let username = this.firstname.toLowerCase().replace(/\s+/g, '')
        let isUnique = false
        let counter = 0

        while (!isUnique) {
            const tempUsername =
                counter === 0 ? username : `${username}${counter}`
            const existingUser = await this.constructor.findOne({
                username: tempUsername,
            })
            if (!existingUser) {
                this.username = tempUsername
                isUnique = true
            } else {
                counter++
            }
        }
    }
    next()
})

export default model('User', UserSchema)
