import { InputSwitch } from "primereact/inputswitch";     
import IncDecButton from "./IncDecButton";


const CsaladiKedvezmeny = ({csaladiKedv, eltartottak, kedvezmenyezettek, handleInput}) => {
    return (
        <div className='flex flex-col flex-wrap'>
            <div className="flex flex-row items-center flex-wrap gap-1">
                <InputSwitch
                    checked={csaladiKedv}
                    onChange={(e) => {
                        handleInput("csaladiKedv", e.value);
                    }}
                    inputId='csaladiKedv'
                />
                <label htmlFor="csaladiKedv">Családi kedvezmény</label>
            </div>

            {csaladiKedv && (
                <div className="flex flex-row flex-wrap">
                    <div className="flex flex-row items-center">
                        <IncDecButton text={"-"} onClick={() => handleInput("eltartottak", eltartottak - 1)} />
                        <span className="text-xs mx-1">{eltartottak}</span>
                        <IncDecButton text={"+"} onClick={() => handleInput("eltartottak", eltartottak + 1)} />
                    </div>


                    <div className="flex flex-row items-center">
                        <span className="text-xs mx-1">eltartott, ebből kedvezményezett:</span>
                        <IncDecButton text={"-"} onClick={() => handleInput("kedvezmenyezettek", kedvezmenyezettek - 1)}/>
                        <span className="text-xs mx-1">{kedvezmenyezettek}</span>
                        <IncDecButton text={"+"} onClick={() => handleInput("kedvezmenyezettek", kedvezmenyezettek + 1)}/>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CsaladiKedvezmeny;