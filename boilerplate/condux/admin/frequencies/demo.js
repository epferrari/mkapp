import conduxService from '../';

module.exports = conduxService.Hz('/demo',{
  getInitialData(bootstrap){
    return bootstrap || [];
  },
  updateData(data){
    return data;
  }
});
