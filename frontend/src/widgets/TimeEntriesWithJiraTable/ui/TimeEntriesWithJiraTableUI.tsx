import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import {useMemo, useState} from "react";
import { ColDef, themeQuartz, GridReadyEvent } from "ag-grid-community";
import {getTimeEntriesWithJiraStatus} from "@src/widgets/TimeEntriesWithJiraTable/api/getTimeEntriesWithJiraStatus.ts";
import { useDarkMode } from 'usehooks-ts'

ModuleRegistry.registerModules([AllCommunityModule]);

const LinkRenderer = (props: { value: string }) => {
  return (
    <a href={props.value} target="_blank" rel="noopener noreferrer" style={{
      color: '#0397f0'
    }}>
      {props.value}
    </a>
  );
};

const defaultTheme = {
  accentColor: 'rgb(60 234 184)',
  borderRadius: 0,
  wrapperBorderRadius: 0
};

export const TimeEntriesWithJiraTableUI = () => {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const { isDarkMode} = useDarkMode()

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
      field: 'tags'
    },
    {
      field: 'date'
    },
    {
      field: 'duration',
      sort: 'desc'
    },
    {
      field: 'link',
      cellRenderer: LinkRenderer
    }
  ] as ColDef[], [])

  const theme = themeQuartz
    .withParams(isDarkMode ? {
      ...defaultTheme,
      backgroundColor: "rgb(23 24 29)",
      browserColorScheme: "dark",
      chromeBackgroundColor: {
        ref: "foregroundColor",
        mix: 0.07,
        onto: "backgroundColor"
      },
      foregroundColor: "#FFF",
    } : {
      ...defaultTheme
    });

  return (
    <div style={{ height: window.innerHeight }}>
      <AgGridReact
        theme={theme}
        rowData={data}
        columnDefs={columnDefs}
        onGridReady={onGridReady}
        loading={isLoading}
      />
    </div>
  )
}
