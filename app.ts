import * as puppeteer from 'puppeteer';
import {Browser} from 'puppeteer'
import { Application } from 'egg';

export default function (app: Application) {
  console.log('app....')
  app.beforeStart(async () => {
    try {
      console.log('before start...')
      app.browser = await puppeteer.launch();
      console.log('app start:', app.browser)
    } catch (error) {
      console.log(error)
    }
  })
}

declare module 'egg' {
  interface Application {
    browser: Browser
  }
}