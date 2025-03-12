import Table from 'cli-table3'
import {getTimeEntriesWithJira} from "@src/services/getTimeEntriesWithJiraStatus.js";

export const printDailyStandup = async () => {
    const data = await getTimeEntriesWithJira()

    const table = new Table({
      head: ['Task', 'Description', 'Status', 'Tags', 'Date', 'Duration', 'Sprint', 'Link'],
      colWidths: [45, 20]
    })

    data.forEach((items) => {
      table.push(Object.values(items))
    })

    console.log(table.toString());
}
