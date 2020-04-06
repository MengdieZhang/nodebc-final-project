const http=require('https');
const fs=require('fs');
const cheerio=require('cheerio');
const request=require('request');


for(i=2;i>=1;i--){
  var url=`https://www.amazon.co.uk/Best-Sellers-Books/zgbs/books/ref=zg_bs_pg_2?_encoding=UTF8&pg=${i}`;
  http.get(url,function(res){
    var html='';
    res.setEncoding('utf-8');

    res.on('data',function(chunk){
        html+=chunk;
      });
    res.on('end',function(){
      var $=cheerio.load(html);
      var groups=$('.zg-item-immersion');
      groups.each(function(item){
        var group=$(this);
        var groupRank=group.find('.zg-badge-text').text().trim();
        var groupTitle=group.find('.p13n-sc-truncate').text().trim();
        var groupPoint=group.find('.a-icon-star').text().trim();
        var groupPrice=group.find('.p13n-sc-price').text().trim();
        var groupContent=groupRank+' Title:'+groupTitle+';  Book rating:'+groupPoint+';  Price:'+groupPrice+'\n';
        console.log(groupContent)
        var imgSrc=group.find('img').attr('src');
        fs.appendFile('input.txt',groupContent,function(err){
          if(err){
            console.log(err);
          }
        });
        request(imgSrc).pipe(fs.createWriteStream('./image/'+groupRank+'.jpg'));
      });
    });
});
}