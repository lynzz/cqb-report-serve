import { Service } from 'egg';
import { PDFOptions, Page } from 'puppeteer';

/**
 * 生产 pdf 的配置参数
 */
export interface GenPdfOption {
  /**
   * 要转成 pdf 的地址
   */
  url: string;

  /**
   * pdf 宽度
   *
   * @type {string}
   * @memberof GenPdfOption
   */
  width?: string;

  /**
   * pdf 页脚模板
   *
   * @type {string}
   * @memberof GenPdfOption
   */
  footerTemplate?: string;
}
/**
 * PDF 服务
 */
export default class Pdf extends Service {
  /**
   * 创建 pdf
   *
   * @param {GenPdfOption} genPdfOption
   * @returns {Promise<Buffer>}
   * @memberof Pdf
   */
  public async create(genPdfOption: GenPdfOption): Promise<Buffer> {
    let width: string = '1386px';
    let displayHeaderFooter: boolean = false;
    if (genPdfOption.width) {
      width = genPdfOption.width;
    }
    if (genPdfOption.footerTemplate) {
      displayHeaderFooter = true;
    }
    try {
      console.log('browser:', this.app.browser)
      const page: Page = await this.app.browser.newPage();
      await page.goto(genPdfOption.url, { waitUntil: 'networkidle2' });
      await page.emulateMedia('screen');
      await page.emulateMedia('print');
      const pdfOptions: PDFOptions = {
        width,
        displayHeaderFooter,
        printBackground: true,
        footerTemplate: genPdfOption.footerTemplate,
      };
      const result = await page.pdf(pdfOptions);
      page.close()
      return result;
    } catch (error) {
      console.log(error)
      return await Promise.reject(new Error(error));
    }
  }
}
