import {
	useDisclosure,
	Popover,
	PopoverTrigger,
	PopoverContent,
	FocusLock,
	PopoverArrow,
	PopoverCloseButton,
	Text,
	Flex,
	FormControl,
	IconButton,
	Textarea,
} from "@chakra-ui/react";
import { CommentType } from "../App";
import { useRef, useState } from "react";
import { FiSend } from "react-icons/fi";

type Props = {
	comment: CommentType;
	saveAnswer: (answer: string, comment: CommentType) => void;
};

export const CommentsCreated: React.FC<Props> = ({ comment, saveAnswer }) => {
	const firstFieldRef = useRef(null);
	const [answer, setAnswer] = useState<string>("");
	const { onOpen, onClose, isOpen } = useDisclosure();

	const addAnswer = (answer: string, comment: CommentType) => {
		saveAnswer(answer, comment);
		setAnswer("");
	};

	return (
		<Popover
			isOpen={isOpen}
			onOpen={onOpen}
			onClose={onClose}
			placement="right"
			initialFocusRef={firstFieldRef}
		>
			<PopoverTrigger>
				<Text
					position="absolute"
					fontSize="25px"
					cursor="pointer"
					style={{ left: comment.x, top: comment.y }}
				>
					{comment.emoji}
				</Text>
			</PopoverTrigger>
			<PopoverContent p={5}>
				<FocusLock>
					<PopoverArrow />
					<PopoverCloseButton />
					<Flex justifyContent="space-between" mt="8px">
						<Text>{comment.emoji}</Text>
						<Text fontFamily="circular" color="#b0b0b0">
							{comment.date}
						</Text>
					</Flex>
					<Text fontFamily="circular" fontSize="20px">
						{comment.content}
					</Text>
					{comment.answers?.map((answer: string, idx: number) => {
						return (
							<Text
								key={`answer${idx}`}
								fontFamily="circular"
								fontSize="20px"
								color={idx % 2 ? "inherit" : "grey"}
							>
								Answer : {answer}
							</Text>
						);
					})}
					<Flex mt="10px">
						<FormControl>
							<Textarea
								ref={firstFieldRef}
								value={answer}
								fontFamily="circular"
								onChange={(e) => setAnswer(e.target.value)}
								placeholder="Type your answer"
							/>
						</FormControl>
						<IconButton
							isDisabled={
								comment.content === "" || comment.emoji === ""
							}
							_hover={{
								border: "none",
								bg: "transparent",
							}}
							zIndex={100}
							w="min-content"
							right="25px"
							bottom="25px"
							position="absolute"
							bg={"transparent"}
							border={"none"}
							color="#0180ff"
							icon={<FiSend size="30px" />}
							aria-label={"Save"}
							onClick={() => addAnswer(answer, comment)}
						/>
					</Flex>
				</FocusLock>
			</PopoverContent>
		</Popover>
	);
};
