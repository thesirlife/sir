'use client';

import {
	Avatar,
	Box,
	LinearProgress,
	Input,
	Typography,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';

type ChatBotProps = {
	sessionId: string;
};

type Message = {
	id: string;
	content: string;
	role: string;
};

const ChatBot = ({ sessionId }: ChatBotProps) => {
	const [initialScreen, setInitialScreen] = useState(true);
	const [loading, setIsLoading] = useState(false);
	const [messages, setMessages] = useState([{
		id: 'assistant-1',
		content: "Welcome, I&apos;m your AI chat confidant!\n\nType in your thoughts or questions as if you&apos;re talking to a friend. The AI is here to listen and support you. Your conversations are private and confidential. No one else can see or access what you share.",
		role: 'assistant'
	}]);
	const [latestMessages, setLatestMessages] = useState(null);

	const [input, setInput] = useState('');

	const handleSendMessage = async (newInput = input) => {
		setInitialScreen(false);
		const trimmedText = newInput.trim();
		if (!trimmedText) return;

		const userMessage = {
				id: `user-${messages.length + 1}`,
				content: trimmedText,
				role: 'user'
		};
		const newMessages = [...messages, userMessage];
		setMessages(newMessages);
		setInput('');
		setIsLoading(true);

		const apiResponse = await fetch(`${process.env.NEXT_PUBLIC_CHATBOT_IP}/message`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				// @TODO Deal with this
				Authorization: `Bearer ${process.env.NEXT_PUBLIC_CHATBOT_API_KEY}`,
			},
			body: JSON.stringify({
				session_id: sessionId,
				stream: true,
				message: trimmedText,
			}),
		});

		if (!apiResponse.body) return;

		const reader = apiResponse.body.getReader();
		const decoder = new TextDecoder('utf-8');
		let buffer = '';
		let incomingMessage = '';

		while (true) {
			const { done, value } = await reader.read();
			if (done) {
				setMessages((messages) => {
					return [
						...messages,
						{
							id: `assistant-${messages.length + 1}`,
							role: "assistant",
							content: incomingMessage
						},
					];
				});
				setIsLoading(false);
				break;
			};
			buffer += decoder.decode(value, { stream: true });

			let boundary;
			while ((boundary = buffer.indexOf('\n\n')) >= 0) {
				const chunk = buffer.slice(0, boundary + 1).trim();
				buffer = buffer.slice(boundary + 2);
				if (chunk.startsWith('data:')) {
					const jsonData = chunk.slice(5).trim();
					try {
						const data = JSON.parse(jsonData);
						console.log('Received:', data);
						incomingMessage += data;
					} catch (error) {
						console.error('Error parsing JSON:', error);
					}
				}
			}
		}
	};

	return (
		<div className="bg-green-primary h-full flex flex-col items-center justify-center py-10 sm:py-20 px-3">
			<div className="max-w-[600px] w-full flex flex-col">
				{messages &&
					messages.length > 0 &&
					messages.map((m: Message, index) => (
						<div
							key={`${m.role}-${index}`}
							className={`sm:max-w-70 mb-6 ${m.role === 'user' ? 'self-end bg-blueGrey-dark rounded-2xl p-3 text-right' : 'self-start flex gap-4'}`}
						>
							{m.role !== 'user' && (
								<Avatar
									sx={{
										backgroundColor: 'transparent',
										border: '1px solid #868686',
										borderRadius: '100%',
										height: 30,
										width: 30
									}}
								>
									<svg xmlns="http://www.w3.org/2000/svg" width="20" height="14" fill="none"><path fill="#fff" d="M15.913 8.657c.004.2.01.377.016.542-.006-.165-.012-.341-.016-.542ZM15.931 9.231c.03.656.083 1.046.121 1.244.025.059.04.118.04.178 0 .875-2.73 1.589-6.085 1.589-3.365 0-6.091-.714-6.091-1.589 0-.06.015-.119.04-.178.046-.25.12-.806.136-1.837-.003.22-.01.415-.018.593C1.608 9.707 0 10.47 0 11.334c0 1.44 4.481 2.614 10.007 2.614 5.52 0 9.993-1.174 9.993-2.614 0-.864-1.604-1.626-4.069-2.103ZM2.995 2.057c.047.094.142.215.3.334.331.227.881.435 1.565.594.68.169 1.497.286 2.375.385.88.107 1.812.182 2.769.202 1.888.037 3.793-.142 5.166-.493a6.42 6.42 0 0 0 .918-.3c.267-.106.48-.236.645-.356.156-.135.245-.26.286-.36l.036-.166.022.004c0-1.021-3.169-1.849-7.071-1.849-3.907 0-7.08.828-7.08 1.849h.022l.047.156Z"/><path fill="#fff" d="M17 2.207a1.18 1.18 0 0 1-.219.272 3.112 3.112 0 0 1-.648.4 6.444 6.444 0 0 1-.92.347c-1.379.43-3.292.664-5.213.696a22.88 22.88 0 0 1-2.817-.099 12.953 12.953 0 0 1-2.419-.504 5.8 5.8 0 0 1-.922-.376 2.791 2.791 0 0 1-.645-.433 1.367 1.367 0 0 1-.174-.218c.186.808.598.638.897 4.404.137 1.72.178.717.175 1.647a.462.462 0 0 0-.03.156c0 .048.012.094.027.14.264.81 2.808 1.449 5.914 1.449 3.075 0 5.612-.63 5.907-1.431a.444.444 0 0 0-.004-.325c-.003-.93.038.075.174-1.636.314-3.91.745-3.753.918-4.489Z"/></svg>
								</Avatar>
							)}
							<Box
								sx={{
									'& p': {
										margin: m.role !== 'user' ? '0 0 1rem' : '0',
									},
									'& a': {
										textDecoration: 'underline',
										fontWeight: 700,
									}
								}}
							>
								<ReactMarkdown>{m.content}</ReactMarkdown>
							</Box>
						</div>
					))}

					{latestMessages}
				</div>

				{initialScreen && (
					<div className="sm:max-w-70 w-full pt-6 pb-6 mt-6 mb-6 border-t-2 border-b-2">
						<h2 className="text-xl font-bold text-center">
							Start With A Topic Or Send A Message
						</h2>
						<div className="grid grid-cols-4 gap-2 mt-6">
							<button
								className="bg-blueGrey-dark rounded-lg p-3 text-left hover:underline"
								onClick={() => {
									setInput('Ask me some questions about my health');
									setInitialScreen(false);
									handleSendMessage('Ask me some questions about my health');
								}}
							>
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" height="24px"  width="24px" viewBox="0 0 24 24"><path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 2a2 2 0 0 0-2 2v5H4a2 2 0 0 0-2 2v2c0 1.1.9 2 2 2h5v5c0 1.1.9 2 2 2h2a2 2 0 0 0 2-2v-5h5a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-5V4a2 2 0 0 0-2-2h-2Z"/></svg>
								<p className="pt-3">Ask me some questions about my health</p>
							</button>
							<button
								className="bg-blueGrey-dark rounded-lg p-3 text-left hover:underline"
								onClick={() => {
									setInput('Tell me interesting historical facts');
									setInitialScreen(false);
									handleSendMessage('Tell me interesting historical facts');
								}}
							>
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"><g stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2V3ZM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7V3Z"/></g></svg>
								<p className="pt-3">Tell me interesting historical facts</p>
							</button>
							<button
								className="bg-blueGrey-dark rounded-lg p-3 text-left hover:underline"
								onClick={() => {
									setInput('Explain the coolest scientific discoveries');
									setInitialScreen(false);
									handleSendMessage('Explain the coolest scientific discoveries');
								}}
							>
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"><g stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path d="M6 18h8M3 22h18M14 22a7 7 0 1 0 0-14h-1M9 14h2M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2H9ZM12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3"/></g></svg>
								<p className="pt-3">Explain the coolest scientific discoveries</p>
							</button>
							<button
								className="bg-blueGrey-dark rounded-lg p-3 text-left hover:underline"
								onClick={() => {
									setInput('Tell me interesting facts about sports');
									setInitialScreen(false);
									handleSendMessage('Tell me interesting facts about sports');
								}}
							>
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"><g stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path d="M7.21 15 2.66 7.14a2 2 0 0 1 .13-2.2L4.4 2.8A2 2 0 0 1 6 2h12a2 2 0 0 1 1.6.8l1.6 2.14a2 2 0 0 1 .14 2.2L16.79 15M11 12 5.12 2.2M13 12l5.88-9.8M8 7h8"/><path d="M12 22a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z"/><path d="M12 18v-2h-.5"/></g></svg>
								<p className="pt-3">Tell me interesting facts about sports</p>
							</button>
						</div>
					</div>
				)}

				{loading ? (
					<Box
						sx={{
							px: '20px',
							py: '20px',
							width: '100px',
						}}
					>
						<LinearProgress />
					</Box>
				) : null}

				<Box className="max-w-[600px] w-full">
					<Input
						placeholder="send a message"
						value={input}
						onChange={(e) => setInput(e.target.value)}
						disableUnderline={true}
						style={{
							backgroundColor: '#263238',
							borderRadius: '8px',
							color: '#fff',
							padding: '10px 20px',
							width: '100%',
						}}
						onKeyDown={event => event.key === 'Enter' ? handleSendMessage() : null}
						endAdornment={<SendIcon />}
					/>
					<Typography variant="caption" style={{ display: 'block', marginTop: '10px', textAlign: 'center', width: '100%' }}>
						The assistant will do its best to provide accurate answers.
					</Typography>
				</Box>

				<div id="anchor" style={{ overflowAnchor: 'auto', height: '1px' }}></div>
		</div>
	);
};

export default ChatBot;
