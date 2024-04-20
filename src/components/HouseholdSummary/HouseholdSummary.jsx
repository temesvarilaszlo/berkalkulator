const HouseholdSummary = ({people}) => {
    return (
        <div className='bg-gray-300 rounded-2xl w-3/4 min-w-80 p-3' style={{maxWidth: "500px"}}>
            <h2 className="font-bold text-xl">Összesített jövedelmek</h2>
            <table className="table-auto min-w-full bg-white border border-black shadow-md rounded-lg overflow-hidden">
                <thead>
                    <tr>
                        <th className="border border-black px-4 py-2 text-center">Név</th>
                        <th className="border border-black px-4 py-2 text-center">Nettó bér</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        people.map((person, index) => (
                            <tr key={index}>
                                <td className="border border-black px-4 py-2 text-center">
                                    {person.name !== '' ? person.name.trim() : "Személy " + index}
                                </td>
                                <td className="border border-black px-4 py-2 text-center">
                                    {person.netIncome} Ft
                                </td>
                            </tr>
                        ))
                    }
                        
                    <tr>
                        <td className="border border-black px-4 py-2 text-center font-bold">
                            Összesen
                        </td>
                        <td className="border border-black px-4 py-2 text-center">
                            {people.reduce((sum, person) => person.netIncome + sum, 0)} Ft
                        </td>
                    </tr>
                        
                    
                </tbody>
            </table>
        </div>
    );
};

export default HouseholdSummary;
