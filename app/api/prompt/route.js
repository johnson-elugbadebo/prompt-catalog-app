import Prompt from '@/models/Prompt';
import { connectDB } from '@/utils/database.js';

const GET = async function (request) {
	try {
		await connectDB();
		const prompts = await Prompt.find({}).populate({ path: 'creator' });
		return new Response(JSON.stringify(prompts), { status: 200 });
	} catch (error) {
		console.log(error);
		return new Response('Failed to fetch prompts.', { status: 500 });
	}
};
export { GET };
