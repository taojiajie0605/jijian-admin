import { Request, Response } from 'express';
const result = [
  {
    phone: '1',
    name: '水电费水电费',
    role: '员工',
    remarks: '发生的水电费是否',
  },
  {
    phone: '2',
    name: '大使馆的风格',
    role: '监工',
    remarks: '第三个',
  },
  {
    phone: '3',
    name: '盛世嫡妃',
    role: '员工',
    remarks: '是对方水电费',
  },
  {
    phone: '10',
    name: '2',
    role: '22222222',
    remarks: '20',
  },
  {
    phone: '10',
    name: '2',
    role: '22222222',
    remarks: '20',
  },
  {
    phone: '10',
    name: '2',
    role: '22222222',
    remarks: '20',
  },
  {
    phone: '10',
    name: '2',
    role: '22222222',
    remarks: '20',
  },
  {
    phone: '10',
    name: '2',
    role: '22222222',
    remarks: '20',
  },
  {
    phone: '10',
    name: '2',
    role: '22222222',
    remarks: '20',
  },
  {
    phone: '10',
    name: '2',
    role: '22222222',
    remarks: '20',
  },
];

const info =[
  {
    page: 1,
    result: 10,
  },
];

export default {
  'post  /api/userinfo': (req: Request, res: Response) => {
    const { results, page } = req.body;
    if (page === '1' && results === '10') {
      res.send({
        info,
        result,
        totalCount: 200,
      });
      //console.log('1111111111111111122222');
      return;
    }
    if (page === '2' && results === '10') {
      res.send({
        info,
        result,
        totalCount: 200,
      });
      return;
    }
    res.send({
      status: 'error',
    });
  },
};
