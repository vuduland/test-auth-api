const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// TODO: "We are going to need name, DOB, SSN, sex, and insurance to go to a separate API in the future." - Jae

const profileSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true,
	},
    sex: {
        type: String,
        required: true,
        trim: true,
    },
    race: {
        type: String,
        required: true,
        trim: true,
    },
	dob: {
		type: Date,
		required: true,
		unique: true,
		lowercase: true,
		validate: (value) => {
			if (!validator.isDate(value)) {
				throw new Error({ error: 'Invalid Date Of Birth' });
			}
		},
	},
    ssn: {
        type: String,
        required: true,
        unique: true,
        validate: (value) => {
            if (!validator.isLength(9, 9)) {
                throw new Error({ error: 'Invalid SSN'  });
            }
        },
    },
    insurance: {
        type: String,
        required: true,
        trim: true,
    },
	tokens: [
		{
			token: {
				type: String,
				required: true,
			},
		},
	],
});

// userSchema.pre('save', async function (next) {
// 	// Hash the password before saving the user model
// 	const user = this;
// 	if (user.isModified('password')) {
// 		user.password = await bcrypt.hash(user.password, 8);
// 	}
// 	next();
// });


const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
