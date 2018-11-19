import { Controller } from 'egg';
import { request, summary, body, tags } from 'egg-swagger-decorator';
const pdfSchema = {
  url: { type: 'string', required: true, description: 'pdf 预览地址' },
  width: {
    type: 'string',
    required: false,
    example: '1386px',
    description: '页面宽度'
  }
}
export default class ReportController extends Controller {
  /**
   * 生成 PDF
   */
  @request('post', '/api/pdf/create')
  @summary('生成 PDF')
  @tags(['PDF'])
  @body(pdfSchema)
  public async create() {
    const { ctx } = this;
    console.log('create pdf...')
    // ctx.response.set('Accept', 'application/json')
    ctx.body = {
      data: await ctx.service.pdf.create(ctx.request.body)
    };
    ctx.status = 200
  }
}
