import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc.js'
import timezone from 'dayjs/plugin/timezone.js'
dayjs().format()
dayjs.extend(utc)
dayjs.extend(timezone)
class DayService {
    formatDateTime(daytime: string){
        return dayjs.unix(parseInt(daytime)).toDate();
    }
}
export const dayService = new DayService()