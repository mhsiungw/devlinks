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
		links: {
			github: 'http://123'
		}
	}
];
