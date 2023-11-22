import Prompt from '@/models/Prompt';
import { connectDB } from '@/utils/database.js';

const POST = async function (req, res) {
	const { userId, prompt, tag } = await req.json();

	try {
		await connectDB();
		const newPrompt = new Prompt({
			creator: userId,
			prompt: prompt,
			tag: tag,
		});

		await newPrompt.save();

		return new Response(JSON.stringify(newPrompt), { status: 201 });
	} catch (error) {
		console.log(error);
		return new Response('Failed to create a new prompt', { status: 500 });
	}
};
export { POST };
