import { Timestamp } from 'firebase-admin/firestore'

export class DateConvert {
  toTime = (date: Date) => {
    return Timestamp.fromDate(date)
  }
  toDate = (timestamp: Date) => {
    return timestamp.toDate()
  }
}
