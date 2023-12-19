import { Box, Flex, Text, useDisclosure } from "@chakra-ui/react";
import { ReactionCard } from "./components/ReactionCard";
import { useRef, useState } from "react";

export type CommentType = {
	content: string;
	emoji: string;
};

const App: React.FC<Record<string, never>> = () => {
	const { onOpen, onClose, isOpen } = useDisclosure();
	const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
	const firstFieldRef = useRef(null);
	const [newComment, setNewComment] = useState<CommentType>({
		content: "",
		emoji: "",
	});

	const createComment = (e: React.MouseEvent<Element>) => {
		const x = e.clientX;
		const y = e.clientY;

		setCursorPosition({ x, y });
		onOpen();
	};
	return (
		<>
			<Box
				minH="100vh"
				position="relative"
				bg="linear-gradient(249.91deg, rgb(255, 248, 244) 0%, rgb(222, 241, 255) 48.96%, rgb(255, 248, 244) 100%)"
				onClick={(e: React.MouseEvent<Element>) => createComment(e)}
			>
				<Flex padding={10}>
					<Text>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit,
						sed do eiusmod tempor incididunt ut labore et dolore
						magna aliqua. Ut enim ad minim veniam, quis nostrud
						exercitation ullamco laboris nisi ut aliquip ex ea
						commodo consequat. Duis aute irure dolor in
						reprehenderit in voluptate velit esse cillum dolore eu
						fugiat nulla pariatur. Excepteur sint occaecat cupidatat
						non proident, sunt in culpa qui officia deserunt mollit
						anim id est laborum.
					</Text>
				</Flex>
			</Box>
			{isOpen && (
				<ReactionCard
					label="Add your comment"
					onClose={onClose}
					id={"comment"}
					comment={newComment}
					setComment={setNewComment}
					ref={firstFieldRef}
					cursorPosition={cursorPosition}
				/>
			)}
		</>
	);
};

export default App;
