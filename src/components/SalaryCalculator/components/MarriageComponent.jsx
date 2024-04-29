import { InputSwitch } from "primereact/inputswitch";
import { Dialog } from 'primereact/dialog';
import { Calendar } from 'primereact/calendar';
import { useState } from "react";

function hasMarriageBonus(date) {
    if (!date) return false;
    
    const currentDate = new Date();
    
    const oneMonthEarlierDate = new Date(currentDate);
    oneMonthEarlierDate.setMonth(currentDate.getMonth() - 1);

    const twoYearsEarlierDate = new Date(currentDate);
    twoYearsEarlierDate.setFullYear(currentDate.getFullYear() - 2);

    return date <= oneMonthEarlierDate && date > twoYearsEarlierDate && date <= currentDate;
}

const MarriageComponent = ({ justMarried, marriageBonus, marriageDate, handleInput }) => {
    const [visible, setVisible] = useState(false);

    const pColor = marriageBonus ? "bg-green-700" : "bg-red-600";
    const pClassName = pColor + " text-white text-xs p-1 rounded-2xl";

    
    return (
        <div className='flex flex-row flex-wrap items-center gap-1'>
            <InputSwitch
                checked={justMarried}
                onChange={(e) => {
                    handleInput("justMarried", e.value);
                    if (!e.value){
                        handleInput("marriageBonus", false);
                        handleInput("marriageDate", null);
                    }
                    console.log("justmarried");
                }}
                inputId='justMarried'
            />
            <label htmlFor="justMarried">Friss házasok kedvezménye</label>

            {justMarried && (
                <div className='flex flex-row flex-wrap items-center'>
                    <button className="text-xs text-white bg-slate-800 hover:bg-slate-500 rounded-2xl p-1 m-1"
                        onClick={() => setVisible(true)}
                    >
                        {marriageDate ? "Dátum módosítása" : "Dátum hozzáadása"}
                    </button>
                    {marriageDate && (
                        <p className={pClassName}>{marriageBonus ? "Jogosult" : "Nem jogosult"}</p>
                    )}
                </div>
            )}
            <Dialog header="Dátum megadása" visible={visible} position="top" onHide={() => setVisible(false)}>
                <p>
                    A kedvezmény először a házasságkötést követő hónapra vehető igénybe és a házassági életközösség alatt legfeljebb 24 hónapon keresztül jár.
                </p>
                <Calendar value={marriageDate} 
                onChange={(e) => {
                    console.log(e.value);
                    handleInput("marriageDate", e.value);
                    handleInput("marriageBonus", hasMarriageBonus(e.value));
                }} 
                dateFormat="yy/mm/dd"
                showIcon
                showButtonBar
                />
            </Dialog>
        </div>
    );
}

export default MarriageComponent;