import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { FloatLabel } from 'primereact/floatlabel';
import { InputSwitch } from "primereact/inputswitch";      
import { Slider } from "primereact/slider";
import { useRef, useState, useEffect } from 'react';
import PercentageButton from './components/PercentageButton';
import MarriageComponent from './components/MarriageComponent';
import CsaladiKedvezmeny from './components/CsaladiKedvezmeny';

function calcTB(grossIncome){
    const tbPercent = 18.5;
    return grossIncome * (tbPercent / 100);
}

function calcSzja(grossIncome, szjaFree){
    const szjaPercent = 15;
    const szjaMax = 499952;

    if (szjaFree){
        grossIncome = Math.max(0, grossIncome - szjaMax);
    }
    return grossIncome * (szjaPercent / 100);
}

function calcSzemAdoKedv(tax, hasSzemelyiAdoKedv){
    const szemelyiAdoKedv = 77300;
    return hasSzemelyiAdoKedv ? Math.max(0, tax - szemelyiAdoKedv) : tax;
}

function calcCsaladiKedv(tax, hasCsaladiKedv, eltartottak, kedvezmenyezettek){
    if (!hasCsaladiKedv) return tax;

    let csaladiKedvBonus = kedvezmenyezettek < 3 ? kedvezmenyezettek * 10000 : 33000;
    console.log("csaladiKedvBonus", csaladiKedvBonus);
    
    csaladiKedvBonus *= eltartottak;
    console.log("csaladiKedvBonus", csaladiKedvBonus);

    return Math.max(0, tax - csaladiKedvBonus);
}

function calculateNetIncome(person){
    let tax = 0;
    tax += calcTB(person.grossIncome);
    tax += calcSzja(person.grossIncome, person.szjaFree);

    tax = calcSzemAdoKedv(tax, person.szemelyiAdoKedv);
    tax = calcCsaladiKedv(tax, person.csaladiKedv, person.eltartottak, person.kedvezmenyezettek);

    return person.grossIncome - Math.round(tax) + (person.marriageBonus ? 5000 : 0);
}

const SalaryCalculator = ({people, setPeople, currPersonInd, setCurrPersonInd, maxIncome, maxIncomeDigits}) => {
    let data = people[currPersonInd];
    
    console.log(data);
    
    const handleInput = (name, value) => {
        // if (name === "name"){
        //     value = value.trim();
        //     // if (value === ''){
        //     //     value = "Személy " + currPersonInd;
        //     // }
        // }
        if (name === "grossIncome"){
            value = Math.min(Math.max(0, value), maxIncome);
        }
        if (name === "eltartottak"){
            value = Math.max(0, value);
            data = {...data, "kedvezmenyezettek": Math.min(data.kedvezmenyezettek, value)}
        }
        if (name === "kedvezmenyezettek"){
            value = Math.min(Math.max(0, value), Math.min(data.eltartottak, 3));
        }
        
        data = {...data, [name]: value};
        data = {...data, "netIncome": calculateNetIncome(data)};

        const newPeople = [...people];
        newPeople[currPersonInd] = { ...data};
        setPeople(newPeople);
    };

    const handleDelete = () => {
        if (people.length === 1) return;
        setPeople(people.filter((_, ind) => ind !== currPersonInd));
        setCurrPersonInd(Math.max(0, currPersonInd - 1))
    }

    return (
    <div className=' bg-gray-300 rounded-2xl w-3/4 min-w-80 p-3' style={{maxWidth: "500px"}}>
        <button className='float-right' onClick={handleDelete}><i className="pi pi-trash text-xl"></i></button>

        <h2 className="text-2xl font-bold">{data.name !== '' ? data.name.trim() : "Személy " + currPersonInd} bérének kiszámítása</h2>
        <div className="mt-6">
            <FloatLabel>
                <InputText id="name" name='name' variant='filled' 
                    value={data.name} 
                    onChange={(e) => handleInput("name", e.target.value)}
                />
                <label htmlFor="name">Név</label>
            </FloatLabel>
        </div>
        
        <div className='mt-6'>
            <FloatLabel>
                <InputNumber id='gross-income' name='grossIncome' variant='filled' value={data.grossIncome} 
                onChange={(e) => {
                    let newValue;
                    if (e.value === null || e.value === undefined){
                        newValue = 0;
                    }
                    else{
                        newValue = parseFloat(e.value.toString().slice(0, maxIncomeDigits)); // Limit to maxLength characters
                    }
                    
                    console.log("asfdasdf", newValue);
                    handleInput("grossIncome", newValue);
                  }}
                prefix='Ft ' max={maxIncome}
                />
                <label htmlFor="gross-income">Bruttó bér (0-10M Ft)</label>
            </FloatLabel>
        </div>

        <div className='mt-6'>
            <Slider value={data.grossIncome} name='grossIncome' onChange={ (e) => {
                handleInput("grossIncome", e.value);
            } } 
            min={0} max={maxIncome} step={10000}
            />
        </div>
        
        <div className='flex flex-row flex-wrap gap-2 mt-3'>
            <PercentageButton percentage={-5} grossIncome={data.grossIncome} handleInput={handleInput}/>
            <PercentageButton percentage={-1} grossIncome={data.grossIncome} handleInput={handleInput}/>
            <PercentageButton percentage={1} grossIncome={data.grossIncome} handleInput={handleInput}/>
            <PercentageButton percentage={5} grossIncome={data.grossIncome} handleInput={handleInput}/>
        </div>

        <div className='flex flex-col gap-1 mt-2'>
            <h3 className='text-lg font-bold'>Kedvezmények</h3>

            <div className='flex flex-row items-center gap-1'>
                <InputSwitch
                checked={data.szjaFree}
                onChange={(e) => {
                    handleInput("szjaFree", e.value);
                }}
                inputId='szjaFree'
                />
                <label htmlFor="szjaFree">25 év alattiak SZJA mentessége</label>
            </div>

            
            <MarriageComponent justMarried={data.justMarried} marriageBonus={data.marriageBonus} 
            marriageDate={data.marriageDate} handleInput={handleInput} />
            

            <div className='flex flex-row items-center gap-1'>
                <InputSwitch 
                checked={data.szemelyiAdoKedv} 
                onChange={(e) => {
                    handleInput("szemelyiAdoKedv", e.value);
                }}
                inputId='szemelyiAdoKedv'
                />
                <label htmlFor="szemelyiAdoKedv">Személyi adókedvezmény</label>
            </div>

            
            <CsaladiKedvezmeny csaladiKedv={data.csaladiKedv} eltartottak={data.eltartottak} 
            kedvezmenyezettek={data.kedvezmenyezettek} handleInput={handleInput}/>
        </div>

        <div className="mx-auto my-1 flex flex-col min-w-min">
            <h3 className=" font-bold mx-auto">Számított nettó bér</h3>
            <span className=" bg-slate-800 text-white p-4 rounded-md mx-auto">{data.netIncome} Ft</span>
        </div>
    </div>
    );
};

export default SalaryCalculator;
