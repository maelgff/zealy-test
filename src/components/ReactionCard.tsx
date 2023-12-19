import {
	Card,
	CardBody,
	Flex,
	FormControl,
	IconButton,
	Textarea,
	Text,
} from "@chakra-ui/react";
import { FaTimes } from "react-icons/fa";
import { CommentType } from "../App";

type Props = {
	label: string;
	id: string;
	comment: CommentType;
	setComment: (comment: CommentType) => void;
	ref: React.MutableRefObject<null>;
	onClose: () => void;
	cursorPosition: { x: number; y: number };
};

export const ReactionCard: React.FC<Props> = ({
	id,
	ref,
	label,
	onClose,
	cursorPosition,
	setComment,
	comment,
}) => {
	return (
		<Card
			position="absolute"
			style={{ left: cursorPosition.x, top: cursorPosition.y }}
		>
			<CardBody>
				<IconButton
					onClick={() => onClose()}
					aria-label="Close"
					bg="#fff"
					float="right"
					icon={<FaTimes />}
				/>
				<Flex mt="50px" flexDir="column">
					<Flex fontSize={35} justifyContent="space-around" mb="20px">
						{["😀", "😝", "🥰"].map(
							(emoji: string, idx: number) => {
								return (
									<Text
										display="flex"
										alignItems="center"
										justifyContent="center"
										key={`emoji-${idx}`}
										border={
											comment.emoji === emoji ? "2px" : ""
										}
										borderRadius="50%"
										w="50px"
										h="50px"
										onClick={() =>
											setComment({
												...comment,
												emoji: emoji,
											})
										}
										cursor="pointer"
									>
										{emoji}
									</Text>
								);
							}
						)}
					</Flex>
					<FormControl>
						<Textarea
							onChange={(e) =>
								setComment({
									...comment,
									content: e.target.value,
								})
							}
							ref={ref}
							id={id}
							placeholder={label}
						/>
					</FormControl>
					<IconButton aria-label={"Save"} />
				</Flex>
			</CardBody>
		</Card>
	);
};
