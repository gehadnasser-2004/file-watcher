const fs = require('fs');
var fsTimeout
prefiles=[];
currfiles=[];
fs.readdir('watch-folder',(err,filename) => {
  if(err)
    console.log(err);
  else
  prefiles=filename;
})


fs.watch('watch-folder', (eventType, filename) => {
  const date=new Date();
 
  fs.readdir('watch-folder',(err,files) => {
    if(err)
      console.log(err);
    else{
       currfiles=files;
      if(currfiles.length<prefiles.length)
      {
       
        console.log(`${filename} is deleted at${date}`);
      }
      else if(currfiles.length>prefiles.length){
        
        console.log(`${filename} is added at${date}`);
      }
      prefiles=currfiles;}
   
  })

  if (!fsTimeout && eventType === 'change') {
   
    console.log(`${filename} is changed at${date}`);
    fsTimeout = setTimeout(function() { fsTimeout=null }, 5000) // give 5 seconds for multiple events
}
 
});