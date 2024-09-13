import '../App.css';
import { useNavigate } from 'react-router-dom';

function App() {
  return (
    <div className="flex">
      <header className="Home-header">
        <p className="text-center">Welcome to my Basketball Stats application!</p>
      </header>
      <MyButton />
    </div>
  );
}

function MyButton() {
  const navigate = useNavigate();

  const goToStats = () => {
    navigate('/stats');
  };

  return (
    <div>
      <button onClick={goToStats}>Go to Stats Page</button>
    </div>
  );
}

export default App;
