import { Box, Flex, Text, useDisclosure } from "@chakra-ui/react";
import { ReactionCard } from "./components/ReactionCard";
import { useState } from "react";
import { CommentsCreated } from "./components/CommentsCreated";

export type CommentType = {
	content: string;
	emoji: string;
	date?: string;
	x?: number;
	y?: number;
};

const App: React.FC<Record<string, never>> = () => {
	const { onOpen, onClose, isOpen } = useDisclosure();
	const [commentsCreated, setCommentsCreated] = useState<CommentType[]>([]);
	const [newComment, setNewComment] = useState<CommentType>({
		content: "",
		emoji: "",
	});

	const createComment = (e: React.MouseEvent<Element>) => {
		setNewComment({
			...newComment,
			x: e.clientX,
			y: e.clientY,
			date: new Date().toLocaleString(),
		});
		onOpen();
	};

	const saveComment = () => {
		setCommentsCreated([...commentsCreated, newComment]);
		setNewComment({
			content: "",
			emoji: "",
		});
		onClose();
	};

	const resetComment = () => {
		setNewComment({
			content: "",
			emoji: "",
		});
		onClose();
	};
	return (
		<>
			<Box
				minH="100vh"
				cursor="copy"
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
			{commentsCreated.map((comment: CommentType, idx: number) => {
				return <CommentsCreated comment={comment} idx={idx} />;
			})}
			{isOpen && (
				<ReactionCard
					label="Add your comment"
					onClose={resetComment}
					id={"comment"}
					comment={newComment}
					setComment={setNewComment}
					saveComment={saveComment}
				/>
			)}
		</>
	);
};

export default App;
