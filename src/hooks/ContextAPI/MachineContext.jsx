import { Children, createContext, useState } from "react";

export const MachineContext = createContext();


export const MachineProvider = ({ children }) => {

    const myName = "TFK";

    const [alertMachineData, setAlertMachineData] = useState([]);

    const [machineForCharts, setMachinesForCharts] = useState([]);

    const [machineInstalled, setMachineInstalled] = useState([]);
    const [machineRunning, setMachineRunning] = useState([]);
    const [totalCollection, setTotalCollection] = useState([]);
    const [totalItemDispensed, setTotalItemDispensed] = useState([]);

    const [dropDownWardNames, setDropDownWardNames] = useState([]);
    const [dropDownZoneNames, setDropDownZoneNames] = useState([]);
    const [dropDownBeatNames, setDropDownBeatNames] = useState([]);
    const [dropDownMachineNames, setDropDownMachineNames] = useState([]);
    const [datePicker, setDatePicker] = useState([]);
    
    const [iSelectedMachines , setIselectedMachines] =  useState([]);

    //Toggle Button State
    const [isToggled, setIsToggled] = useState(false);

    // New states for date pickers
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);


    return <MachineContext.Provider value={{
        myName,
        alertMachineData, setAlertMachineData,
        machineInstalled, setMachineInstalled,
        machineRunning, setMachineRunning,
        totalCollection, setTotalCollection,
        totalItemDispensed, setTotalItemDispensed,
        dropDownWardNames, setDropDownWardNames,
        dropDownZoneNames, setDropDownZoneNames,
        dropDownBeatNames, setDropDownBeatNames,
        dropDownMachineNames, setDropDownMachineNames,
        isToggled, setIsToggled,
         startDate, setStartDate,
            endDate, setEndDate,
            iSelectedMachines , setIselectedMachines
    }}>
        {children}
    </MachineContext.Provider>
}