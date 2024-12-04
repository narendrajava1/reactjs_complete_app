import {useCallback, useMemo, useState} from "react";
import {CreateEmployeeComponent} from "./CreateEmployeeComponent";
import Modal from "react-modal";
import {useLoaderData} from "react-router-dom";
import DataTable from 'react-data-table-component';

export const ListEmployeeComponent = () => {
    const [addEmp, setAddEmp] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const [toggleCleared, setToggleCleared] = useState(false);
    const employees = useLoaderData();
    const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>;
    const Button = ({children}) => <button type="button">{children}</button>;
    const closeModal = () => {
        setAddEmp(preStateAddEmp => !preStateAddEmp)
    }

    const handlePagination = {
        rowsPerPageText: 'Filas por página',
        rangeSeparatorText: 'de',
        selectAllRowsItem: true,
        selectAllRowsItemText: 'Todos',

    };

    const handleSelectedRows=useCallback(state=>{
        setSelectedRows(state.selectedRows);
    },[]);

    const contextActions=useMemo(()=>{
        const handleDelete = () => {

        if (window.confirm(`Are you sure you want to delete:\r ${selectedRows.map(r => r.title)}?`)) {
            setToggleCleared(!toggleCleared);
           employees.map(employee=>(
               selectedRows.filter(r=>!r.title.includes(employee.value))
           ))
        }
    };


return(
    <Button  onClick={handleDelete}>Delete</Button>
)
    },[employees, selectedRows, toggleCleared])

    const columns = [{
        name: 'id',
        selector: row => row.id,
        sortable: true,
    }, {
        name: 'name',
        selector: row => row.name,
        right: true,
        style: {
            backgroundColor: 'rgba(63, 195, 128, 0.9)',
            color: 'white',
        },
        sortable: true,
    }, {
        name: 'email',
        selector: row => row.email,
        left:true,
        sortable: true,
        cell:row=>(
            <h3 style={{color:"red"}}>{row.email}</h3>
        )
    }, {
        name: 'address',
        selector: row => row.address,
        sortable: true,

    }, {
        name: 'department',
        selector: row => row.deptName,
        sortable: true,

    }, {
        name: 'description',
        selector: row => row.desc,
        sortable: true,

    }]
    return (
        <div>
            <h2>Employees List</h2>
            <div>
                <button onClick={() => setAddEmp(preStateAddEmp => !preStateAddEmp)}>Add Employee</button>
                {addEmp && <CreateEmployeeComponent/>}
            </div>
            <div>
                {addEmp && <Modal isOpen={addEmp}
                                  onRequestClose={closeModal}>
                    <p>this is updateEmp</p>
                    <button onClick={closeModal}>❌</button>
                </Modal>}
            </div>
            <DataTable
            data={employees}
            columns={columns}
            expandableRows
            expandableRowsComponent={ExpandedComponent}
            selectableRows
            contextActions={contextActions}
            onSelectedRowsChange={handleSelectedRows}
            clearSelectedRows={toggleCleared}
            pagination
            paginationComponentOptions={handlePagination}
            paginationPerPage={2}
            />
        </div>
    )
}