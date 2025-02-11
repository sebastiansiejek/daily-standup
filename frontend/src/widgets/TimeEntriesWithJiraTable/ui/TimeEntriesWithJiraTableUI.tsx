import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import {useMemo, useState} from "react";
import { ColDef, themeQuartz, GridReadyEvent } from "ag-grid-community";
import {getTimeEntriesWithJiraStatus} from "@src/widgets/TimeEntriesWithJiraTable/api/getTimeEntriesWithJiraStatus.ts";

ModuleRegistry.registerModules([AllCommunityModule]);

const LinkRenderer = (props: { value: string }) => {
  return (
    <a href={props.value} target="_blank" rel="noopener noreferrer">
      {props.value}
    </a>
  );
};

export const TimeEntriesWithJiraTableUI = () => {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const onGridReady = (params: GridReadyEvent) => {
    params.api.sizeColumnsToFit()

    setIsLoading(true)

    getTimeEntriesWithJiraStatus()
      .then(data => {
        setData(data)
      })
      .catch(error => {
        console.log(error)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }
  const columnDefs = useMemo(() => [
    {
      field: 'task',
    },
    {
      field: 'description'
    },
    {
      field: 'status'
    },
    {
      field: 'date'
    },
    {
      field: 'duration'
    },
    {
      field: 'link',
      cellRenderer: LinkRenderer
    }
  ] as ColDef[], [])

  return (
    <div style={{ height: window.innerHeight }}>
      <AgGridReact
        theme={themeQuartz}
        rowData={data}
        columnDefs={columnDefs}
        onGridReady={onGridReady}
        loading={isLoading}
      />
    </div>
  )
}
