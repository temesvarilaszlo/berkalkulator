import HouseholdSalaryCalculator from "./components/HouseholdSalaryCalculator";
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

function App() {
    return (
        <div>
            <h1 className="text-4xl font-bold">Bérkalkulátor alkalmazás</h1>
            <HouseholdSalaryCalculator />
        </div>
    );
}

export default App;
