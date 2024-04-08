import Input from '@/components/input';
import IconUploadImage from '@/images/icon-upload-image.svg';

export default function EditDetail({ profile }) {
	const { email, firstName, lastName } = profile;

	return (
		<>
			<div className='mb-10 space-y-2'>
				<h2 className='text-3xl text-dark-gray'>Profile Details</h2>
				<div className='text-grey text-base'>
					Add your details to create a personal touch to your profile.
				</div>
			</div>
			<div className='space-y-6'>
				<div className='bg-light-grey text-grey p-5 space-y-3'>
					<div className='flex items-center'>
						<div className='text-xs mb-[2px] text-dark-gray basis-60'>
							Profile picture
						</div>
						<div className='flex items-center flex-1'>
							<div>
								<label
									className='w-48 h-48 px-10 py-14 bg-light-purple flex flex-col items-center justify-end cursor-pointer'
									htmlFor='fileInput'
								>
									<IconUploadImage />{' '}
									<div className='whitespace-nowrap text-purple font-bold'>
										+ Upload Image
									</div>
								</label>
								<input
									id='fileInput'
									className='hidden'
									type='file'
								/>
							</div>
							<div className='text-xs px-6 break-words'>
								Image must be below 1024x1024px. Use PNG or JPG
								format.
							</div>
						</div>
					</div>
				</div>
				<div className='bg-light-grey text-grey p-5 space-y-3'>
					<div className='flex items-center'>
						<label
							className='text-xs mb-[2px] text-dark-gray basis-60'
							htmlFor='firstName'
						>
							First name
						</label>
						<div className='flex-1'>
							<Input
								isRequired
								name='firstName'
								defaultValue={firstName}
								placeholder='e.g. John'
							/>
						</div>
					</div>
					<div className='flex items-center'>
						<label
							className='text-xs mb-[2px] text-dark-gray basis-60'
							htmlFor='lastName'
						>
							Last name
						</label>
						<div className='flex-1'>
							<Input
								isRequired
								name='lastName'
								defaultValue={lastName}
								placeholder='e.g. Appleseed'
							/>
						</div>
					</div>
					<div className='flex items-center'>
						<label
							className='text-xs mb-[2px] text-dark-gray basis-60'
							htmlFor='email'
						>
							Email
						</label>
						<div className='flex-1'>
							<Input
								isRequired
								name='email'
								defaultValue={email}
								placeholder='e.g. email@example.com'
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
