// id SERIAL PRIMARY KEY,
// user_id INT REFERENCES users(id) ON DELETE CASCADE,
// name VARCHAR( 255 ) NOT NULL,
// email VARCHAR ( 255 ) NOT NULL,
// links JSONB
// CONSTRAINT check_links_structure CHECK (
// 	jsonb_typeof(links) = 'object'
// );
export default [
	{
		userId: 1,
		name: 'Test Wang',
		email: '123@example.com',
		links: [
			{
				id: 1,
				type: 'github',
				url: 'http://github'
			},
			{
				id: 2,
				type: 'facebook',
				url: 'http://facebook'
			},
			{
				id: 3,
				type: 'linkedin',
				url: 'http://linkedin'
			}
		]
	}
];
