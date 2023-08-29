import logo from './logo.png';
import './App.css';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Use <code>feature</code> branch to push your changes / make
                    pull request. Let's keep <code>main</code> branch clear for
                    now.
                </p>
                <p>
                    We will push to main on a feature basis, once we are done
                    with homepage, we will push it to main and later on use main
                    branch to deploy our app.
                </p>
                <p>
                    {' '}
                    Also if majority of developers are comfortable using Vite
                    instead of CRA, you can replace this boilerplate app with a
                    Vite App before starting to work on the project.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default App;
