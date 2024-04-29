import { useState } from "react";
import { TabMenu } from 'primereact/tabmenu';

const FamilyMemberTabs = ({people, setPeople, currPersonInd, setCurrPersonInd, defaultPersonState}) => {
    const tabItems = people.map((person, index) => {
        return {
            label: person.name !== '' ? person.name.trim() : "Személy " + index,
            index: index,
            icon: 'pi pi-user'
        };
    });
    tabItems.push({
        index: tabItems.length,
        icon: 'pi pi-plus',
        command: () => {
            setPeople([...people, {...defaultPersonState}]);
        }
    });

    return (
        <div className="card">
            <TabMenu 
                model={tabItems} 
                activeIndex={currPersonInd} 
                onTabChange={(e) => setCurrPersonInd(e.index)} 
            />
        </div>
    );
};

export default FamilyMemberTabs;
