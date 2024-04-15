import Link from 'next/link';
import LogoDevlinksLarge from '@/images/logo-devlinks-large.svg';
import SignupForm from './signup-form';

export default function Signup() {
	return (
		<div className='flex justify-center items-center h-full'>
			<div className='w-1/3 min-w-[425px]'>
				<div className='flex justify-center mb-14'>
					<LogoDevlinksLarge />
				</div>
				<div className='bg-white p-10 rounded-xl'>
					<div className='mb-10'>
						<h2 className='text-dark-gray text-3xl font-bold mb-2'>
							Create account
						</h2>
						<div className='text-gray text-base'>
							{"Let's"} get you started sharing your links!
						</div>
					</div>
					<SignupForm />
					<div className='text-base mt-6 flex justify-center'>
						<span className='text-gray mr-1'>
							Already have an account?
						</span>
						<Link className='text-purple' href='/login'>
							Login
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
