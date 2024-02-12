import '../App.css';
import Header from "./Header";
import Navbar from "./navigation/Navbar";
import '../styles/styles.css'

const App = () => {
    return (
        <div style={{'margin-left': '5px', 'margin-right': '15px'}}>
            <Header/>
            <Navbar/>
        </div>
    );
};

export default App;