import { Request, Response } from 'express';
const result = [
  {
    id: '1',
    overseerid: '2',
    overseername: '22222222',
    number: '20',
    time: '1',
    status: 'success'
  },
  {
    id: '2',
    overseerid: '2',
    overseername: '22222222',
    number: '20',
    time: '1',
    status: 'success'
  },
  {
    id: '3',
    overseerid: '2',
    overseername: '22222222',
    number: '20',
    time: '1',
    status: 'undefine'
  },
  {
    id: '4',
    overseerid: '2',
    overseername: '22222222',
    number: '20',
    time: '5',
    status: 'success'
  },
  {
    id: '5',
    overseerid: '2',
    overseername: '22222222',
    number: '20',
    time: '1',
    status: 'success'
  },
  {
    id: '6',
    overseerid: '2',
    overseername: '22222222',
    number: '20',
    time: '1',
    status: 'undefine'
  },
  {
    id: '7',
    overseerid: '2',
    overseername: '22222222',
    number: '20',
    time: '1',
    status: 'success'
  },
  {
    id: '8',
    overseerid: '2',
    overseername: '22222222',
    number: '20',
    time: '1',
    status: 'success'
  },
  {
    id: '9',
    overseerid: '2',
    overseername: '22222222',
    number: '20',
    time: '1',
    status: 'success'
  },
  {
    id: '10',
    overseerid: '2',
    overseername: '22222222',
    number: '20',
    time: '1',
    status: 'undefine'
  },
];

const info =[
  {
    page: 1,
    result: 10,
  },
];

export default {
  'post  /api/confirm': (req: Request, res: Response) => {
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
