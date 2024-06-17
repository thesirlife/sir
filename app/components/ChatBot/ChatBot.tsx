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

// this will change eventually when we get the response from the server
type ChatBot = {
	sessionId: string;
};
//

const ChatBot = ({ sessionId }: ChatBot) => {
	const [loading, setIsLoading] = useState(false);
	const [messages, setMessages] = useState([{
		id: 1,
		content: "Welcome, I&apos;m your AI chat confidant!\n\nType in your thoughts or questions as if you&apos;re talking to a friend. The AI is here to listen and support you. Your conversations are private and confidential. No one else can see or access what you share.",
		role: 'assistannt'
	}]);

	const [input, setInput] = useState('');

	const handleSendMessage = async () => {
		const trimmedText = input.trim();
		if (!trimmedText) return;

		const userMessage = {
				id: messages.length + 1,
				content: trimmedText,
				role: 'user'
		};
		const newMessages = [...messages, userMessage];
		setMessages(newMessages);
		setInput('');
		setIsLoading(true);

		const apiResponse = await fetch('http://54.69.12.63/message', {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				'Access-Control-Allow-Origin': '*',
				Authorization: 'Bearer WkYwJlK8Cv1vR5KwYnLRBCJrVRiTQNCT',
			},
			body: JSON.stringify({
				session_id: sessionId,
				stream: true,
				message: trimmedText,
			}),
		});

		if (!apiResponse.body) return;

		// To decode incoming data as a string
		const reader = apiResponse.body.getReader();
		let incomingMessage = "";

		const readChunk = () => {
			// Read a chunk from the reader
			reader.read()
				.then(({
						value,
						done
				}) => {
					// Check if the stream is done
					if (done) {
						// Log a message
						setMessages((messages) => {
							return [
								...messages,
								{ role: "assistant", content: incomingMessage.replaceAll(/data: \\n\\n/gi, '') },
							];
						});
						setIsLoading(false);
						console.log('Stream finished');
						// Return from the function
						return;
					}
					// Convert the chunk value to a string
					const chunkString = new TextDecoder().decode(value);
					// Log the chunk string
					incomingMessage += chunkString.trim().replaceAll(/data: /gi, '').replace(/[\r\n]+/g, '');

					// Read the next chunk
					readChunk();
			})
			.catch(error => {
					// Log the error
					console.error(error);
			});
		};

		// Start reading the first chunk
		readChunk();
};

	return (
		<div className="bg-green-primary h-full flex flex-col items-center justify-center py-10 sm:py-20 px-3">
			<div className="max-w-[600px] w-full flex flex-col">
				{messages &&
					messages.length > 0 &&
					messages.map((m, index) => (
						<div
							key={index}
							className={`sm:max-w-70 mb-8 ${m.role === 'user' ? 'self-end bg-blueGrey-dark rounded-2xl p-3 text-right' : 'self-start flex gap-4'}`}
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
							<Box>
								<Typography
									variant="body1"
									style={{ marginTop: 0, whiteSpace: 'pre-wrap' }}
									dangerouslySetInnerHTML={{
										__html: m.content
									}}
								/>
							</Box>
						</div>
					))}

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

				<Box
					sx={{
						bottom: 0,
						position: 'sticky',
					}}
				>
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
		</div>
	);
};

export default ChatBot;
