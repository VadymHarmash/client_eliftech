import Dashboard from './components/Dashboard';
import './App.scss'
import Context from './context/Context'

function App() {
    return (
        <div className="App">
            <Context>
                <Dashboard />
            </Context>
        </div>
    );
}

export default App;
