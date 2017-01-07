var CronJob = require('cron').CronJob;
var job = new CronJob({
  cronTime: '*/10 * * * * *',
  onTick: function() {
    console.log('cron tic-tac-toe');
    console.log(new Date());
  },
  start: false,
  timeZone: 'America/Los_Angeles'
});

module.exports=job;