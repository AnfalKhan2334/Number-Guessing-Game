import { useState } from 'react';
import './App.css';

function App() {
  // State to store the user's guess, random number, and game status
  const [guess, setGuess] = useState('');
  const [randomNumber, setRandomNumber] = useState(generateRandomNumber());
  const [message, setMessage] = useState('');
  const [hint, setHint] = useState(''); // New state to store the hint
  const [attempts, setAttempts] = useState(0);

  // Function to generate a random number
  function generateRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
  }

  // Handle when the user submits their guess
  const handleSubmit = (e) => {
    e.preventDefault();
    const userGuess = parseInt(guess, 10);
    const difference = Math.abs(randomNumber - userGuess); // Calculate the difference
    setAttempts(attempts + 1);

    // Provide feedback on the guess
    if (userGuess > randomNumber) {
      setMessage('Too high!');
    } else if (userGuess < randomNumber) {
      setMessage('Too low!');
    } else {
      setMessage(`You guessed it in ${attempts + 1} attempts!`);
      setHint(''); // Reset hint when the game is won
    }

    // Set a hint based on how close the guess is
    if (difference > 30) {
      setHint('You are far off.');
    } else if (difference > 15) {
      setHint('You are getting closer!');
    } else if (difference > 5) {
      setHint('You are very close!');
    } else if (difference > 0) {
      setHint('You are extremely close!');
    }

    setGuess('');
  };

  // Function to restart the game
  const restartGame = () => {
    setRandomNumber(generateRandomNumber());
    setGuess('');
    setMessage('');
    setHint(''); // Reset hint on restart
    setAttempts(0);
  };

  return (
    <div className="game-container">
      <h1 style={{ fontFamily: 'sans-serif' }}>Number Guessing Game</h1>
      <p style={{ fontFamily: 'sans-serif' }}>Guess a number between 1 and 100</p>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          min="1"
          max="100"
          required
        />
        <button type="submit">Guess</button>
      </form>
      <p>{message}</p>
      {hint && <p style={{ color: 'orange' }}>{hint}</p>} {/* Show hint */}
      {message.includes('guessed it') && (
        <button onClick={restartGame}>Play Again</button>
      )}
    </div>
  );
}

export default App;
