const NetIncomeComponent = ({person}) => {
    return (
        <div className="mx-auto my-1 flex flex-col min-w-min">
            <h3 className=" font-bold mx-auto">Számított nettó bér</h3>
            <span className=" bg-slate-800 text-white p-4 rounded-md mx-auto">{person.netIncome} Ft</span>
        </div>
    );
}

export default NetIncomeComponent;