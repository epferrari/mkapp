import conduxService from '../admin';

module.exports = conduxService.Hz('/demo',{
  updateData(data){
    console.log(data);
    return data;
  }
});
