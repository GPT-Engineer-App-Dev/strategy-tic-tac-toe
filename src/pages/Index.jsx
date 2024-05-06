import { useState } from 'react';
import { Box, Button, Container, Flex, Heading, Text } from '@chakra-ui/react';

const Index = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (index) => {
    if (winner || board[index]) return;
    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
    const gameWinner = calculateWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
    }
  };

  const renderSquare = (index) => (
    <Button
      h="60px"
      w="60px"
      m="1"
      fontSize="2xl"
      onClick={() => handleClick(index)}
      colorScheme={board[index] ? "teal" : "gray"}
    >
      {board[index]}
    </Button>
  );

  const handleReset = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  return (
    <Container centerContent maxW="container.md" p={4}>
      <Flex direction="column" align="center" justify="center" mb={4}>
        <Heading mb={4}>Tic-Tac-Toe Game</Heading>
        <Text fontSize="xl">{winner ? `Winner: ${winner}` : `Next Player: ${isXNext ? 'X' : 'O'}`}</Text>
      </Flex>
      <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={1} mb={4}>
        {Array.from({ length: 9 }).map((_, index) => renderSquare(index))}
      </Box>
      <Button colorScheme="blue" onClick={handleReset}>Reset Game</Button>
    </Container>
  );
};

export default Index;