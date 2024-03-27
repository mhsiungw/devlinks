import bcrypt from 'bcrypt';

export default [
	{
		email: 'barrence@youanmi.ccc',
		password: bcrypt.hashSync('123456', 10),
	},
	{
		email: 'thepb@gasss.net',
		password: bcrypt.hashSync('123456', 10),
	},
];
