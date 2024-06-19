import { auth } from "@/auth";
import { redirect } from "next/navigation";

import Breadcrumbs from "@/app/components/Breadcrumbs/Breadcrumbs";
import ChatBot from "@/app/components/ChatBot/ChatBot";

type Session = {
	message: string,
	session_id: string,
};

const getChatSession = async (userId: number) => {
	try {
		const result = await fetch(`${process.env.CHATBOT_IP}/sessions`, {
			method: 'POST',
			body: JSON.stringify({
				user_id: userId,
			}),
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' +  process.env.CHATBOT_API_KEY,
			},
		});

		const response: Session = await result.json();
		return response.session_id;
	} catch (error) {
		console.error('Request error', error);
		return '';
	}
};

const AIChatBot = async () => {
	const session = await auth();
	if (!session?.user.email) {
		redirect(`/`);
	}

	const sessionId = await getChatSession(session?.user.id);

	return (
		<>
			<div className="bg-navy-primary h-full flex flex-col items-center justify-center">
				<div className="container">
					<div className="py-10 px-4 sm:px-0">
						<Breadcrumbs />
						<h1 className="text-3xl font-bold">Personal AI Confidant</h1>
					</div>
				</div>
			</div>
			<ChatBot sessionId={sessionId} />
		</>
	);
};

export default AIChatBot;
