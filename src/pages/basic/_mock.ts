import { Request, Response } from 'express';
const result = [
  {
    id: '1',
    workname: '11111111',
    number: '100',
    price:'16515',
    overseername: '22222222',
    time: '1',
    count: "1651500"
  },
  {
    id: '1',
    workname: '11111111',
    number: '100',
    price:'16515',
    overseername: '22222222',
    time: '1',
    count: "1651500"
  },
  {
    id: '1',
    workname: '11111111',
    number: '100',
    price:'16515',
    overseername: '22222222',
    time: '1',
    count: "1651500"
  },
  {
    id: '1',
    workname: '11111111',
    number: '100',
    price:'16515',
    overseername: '22222222',
    time: '1',
    count: "1651500"
  },
  {
    id: '1',
    workname: '11111111',
    number: '100',
    price:'16515',
    overseername: '22222222',
    time: '1',
    count: "1651500"
  },
  {
    id: '1',
    workname: '11111111',
    number: '100',
    price:'16515',
    overseername: '22222222',
    time: '1',
    count: "1651500"
  },
  {
    id: '1',
    workname: '11111111',
    number: '100',
    price:'16515',
    overseername: '22222222',
    time: '1',
    count: "1651500"
  },
  {
    id: '1',
    workname: '11111111',
    number: '100',
    price:'16515',
    overseername: '22222222',
    time: '1',
    count: "1651500"
  },
  {
    id: '1',
    workname: '11111111',
    number: '100',
    price:'16515',
    overseername: '22222222',
    time: '1',
    count: "1651500"
  },
  {
    id: '1',
    workname: '11111111',
    number: '100',
    price:'16515',
    overseername: '22222222',
    time: '1',
    count: "1651500"
  },
];

const info =[
  {
    page: 1,
    result: 10,
  },
];

export default {
  'post  /api/profile/basic': (req: Request, res: Response) => {
    const { results, page } = req.body;
    if (page === '1' && results === '2') {
      res.send({
        info,
        result,
        totalNum: 150,
        totalAccount: 500000,
      });
      //console.log('1111111111111111122222');
      return;
    }
    if (page === '2' && results === '2') {
      res.send({
        info,
        result,
        totalNum: 150,
        totalAccount: 400000,
      });
      return;
    }
    res.send({
      status: 'error',
    });
  },
};
