const nodemailer = require('nodemailer')

var transport = nodemailer.createTransport({
	host: 'smtp.mailtrap.io',
	port: 2525,
	auth: {
		user: '9f7d771268a5f8',
		pass: 'e861f1ca7c997e'
	}
});

export default transport;
