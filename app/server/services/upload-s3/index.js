import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const s3Client = new S3Client({
	region: 'ap-southeast-2'
});

export default function uploadS3(params) {
	return new Promise((resolve, reject) => {
		const command = new PutObjectCommand(params);

		s3Client
			.send(command)
			.then(() => {
				resolve(
					`https://s3.ap-southeast-2.amazonaws.com/${params.Bucket}/${params.Key}`
				);
			})
			.catch(err => {
				reject(err);
			});
	});
}
