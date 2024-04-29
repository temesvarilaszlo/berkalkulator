import FamilyMemberTabs from "./FamilyMemberTabs/FamilyMemberTabs";
import HouseholdSummary from "./HouseholdSummary/HouseholdSummary";
import SalaryCalculator from "./SalaryCalculator/SalaryCalculator";
import { useState } from "react";

const defaultPersonState = {
    name: "",
    grossIncome: 0,
    szjaFree: false, 
    szemelyiAdoKedv: false,
    justMarried: false,
    marriageBonus: false,
    marriageDate: null,
    csaladiKedv: false,
    eltartottak: 0,
    kedvezmenyezettek: 0,
    netIncome: 0,
}

const HouseholdSalaryCalculator = () => {
    const maxIncome = 5000000;
    const maxIncomeDigits = maxIncome.toString().length;

    const [currPersonInd, setCurrPersonInd] = useState(0);

    const [people, setPeople] = useState([{...defaultPersonState}]);

    return (
        <>
            <header>
                <FamilyMemberTabs 
                    people={people}
                    setPeople={setPeople}
                    currPersonInd={currPersonInd}
                    setCurrPersonInd={setCurrPersonInd}
                    defaultPersonState={{...defaultPersonState}}
                />
            </header>
            <main className="flex flex-row flex-wrap justify-around gap-2">
                <SalaryCalculator
                    people={people}
                    setPeople={setPeople}
                    currPersonInd={currPersonInd}
                    setCurrPersonInd={setCurrPersonInd}
                    maxIncome={maxIncome} maxIncomeDigits={maxIncomeDigits}
                />
                <HouseholdSummary people={people}/>
            </main>
        </>
    );
};

export default HouseholdSalaryCalculator;
