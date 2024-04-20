const PercentageButton = ({ percentage, grossIncome, handleInput }) => {
    let color = percentage > 0 ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700";

    const className = color + " text-white p-2 rounded-md";

    return (
        
        <button className={className}
        onClick={() => {
            grossIncome += Math.round(percentage / 100 * grossIncome);
            handleInput("grossIncome", grossIncome);
        }}>
            {percentage > 0 ? "+" : ""}{percentage}%
        </button>
        
    );
}

export default PercentageButton;