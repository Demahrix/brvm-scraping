import { parse } from "node-html-parser";
import { Utils } from "./utils.js";

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;


class BrvmUtils {

    static async getStock() {
        const response = await fetch('https://www.brvm.org/fr/cours-actions/0');
        const content = await response.text();
        if (!response.ok)
            throw Error(content);

        const root = parse(content);
        const date = Utils.parseDate(root.getElementById('block-tools-date-maj').textContent.trim());
        const table = root.getElementsByTagName('table')[3];

        const rows = table.getElementsByTagName('tbody')[0].getElementsByTagName('tr');

        return rows.map(e => {
            const colums = e.getElementsByTagName('td');

            return {
                symbol: colums[0].textContent.trim(),
                name: colums[1].textContent.trim(),
                volume: Utils.parseNumber(colums[2].textContent.trim()),
                previousDayPrice: Utils.parseNumber(colums[3].textContent.trim()),
                openPrice: Utils.parseNumber(colums[4].textContent.trim()),
                closePrice: Utils.parseNumber(colums[5].textContent.trim()),
                date
            }
        });
    }

}

export { BrvmUtils };