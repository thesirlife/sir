import { OpenAIStream, StreamingTextResponse } from 'ai';
// import { getServerSession } from 'next-auth/next';

// import { authOptions } from '@/api/auth/[...nextauth]';

export async function POST(req) {
	// const session = await getServerSession(authOptions);
	// const { userId } = session.user;

	// if (session) {

		// Extract the `messages` and `context` from the body of the request
		const result = await req.json();
		const { message, session_id } = result;
		// const { messages, session_id } = result;
		// const lastInput = messages.slice(-1)[0].content;

		let responseStream = new TransformStream();
		const writer = responseStream.writable.getWriter();
		const encoder = new TextEncoder();

		writer.write(encoder.encode('Vercel is a platform for....'));

		try {
			const response = await fetch(`http://54.69.12.63/message`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Content-Encoding': 'none',
					Authorization: 'Bearer ' + process.env.CHATBOT_API_KEY,
				},
				body: JSON.stringify({
					session_id,
					stream: true,
					message,
				}),
			});

			return new Response(response.readable, {
				headers: {
					'Content-Type': 'text/event-stream',
					Connection: 'keep-alive',
					'Cache-Control': 'no-cache, no-transform',
					'Content-Encoding': 'none',
				},
			});

			// const stream = OpenAIStream(response, {
			// 	onCompletion: async (completion) => {
			// 		console.log(completion);
			// 	},
			// });

			// return new StreamingTextResponse(stream);
		} catch (error) {
				console.error('Error calling API:', error);
				return 'There was an error processing your request. Please try again later.';
		}
	// }
}
