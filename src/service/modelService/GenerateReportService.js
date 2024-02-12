import axios from "../../repository/axiosAPI";
import { saveAs } from 'file-saver';

export default class GenerateReportService {
    async downloadFile(url, name){
        try {
            const response = await axios.get(url, {
                responseType: 'arraybuffer',
            });

            const blob = new Blob([response.data], { type: 'application/vnd.ms-excel' });
            saveAs(blob, name);
        } catch (error) {
            console.error('Error fetching file:', error);
        }
    }

    async generalReport(data) {
        let queryParams = '?start_date=' + data.start_date + '&end_date=' + data.end_date + '&gym_id=' + data.gymId;

        await this.downloadFile('/excel_reports/general' + queryParams, 'General Report.xls')
    }

    async membershipsReport(data) {
        let queryParams = '?start_date=' + data.start_date + '&end_date=' + data.end_date + '&gym_id=' + data.gymId;

        await this.downloadFile('/excel_reports/memberships_bought' + queryParams, 'Memberships Report.xls')
    }

    async sessionsReport(data) {
        let queryParams = '?start_date=' + data.start_date + '&end_date=' + data.end_date + '&gym_id=' + data.gymId;

        await this.downloadFile('/excel_reports/sessions' + queryParams, 'Sessions Report.xls')
    }

    async financeReport(data) {
        let queryParams = '?start_date=' + data.start_date + '&end_date=' + data.end_date + '&gym_id=' + data.gymId;

        await this.downloadFile('/excel_reports/finance' + queryParams, 'Finance Report.xls')
    }
}