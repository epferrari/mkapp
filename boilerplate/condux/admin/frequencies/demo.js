import conduxService from '../';

module.exports = conduxService.Hz('/demo',{
  updateData(data){
    return data;
  }
});
