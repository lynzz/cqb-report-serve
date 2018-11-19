import ReportController from './report'

declare module 'egg' {
  export interface IController {
    report: ReportController;
  }
}