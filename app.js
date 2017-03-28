(function(){
'use strict';
angular.module('ShoppingListCheckOff',[])
.controller('ToBuyController',ToBuyController)
.controller('AlreadyBoughtController',AlreadyBoughtController)
.service('ShoppingListCheckOffService',ShoppingListCheckOffService);
ToBuyController.$inject=['ShoppingListCheckOffService'];
AlreadyBoughtController.$inject=['ShoppingListCheckOffService'];

function ShoppingListCheckOffService(){
  var service=this;
  var boughtItem={};
  var ToBoughtItems=[];
  var ToBoughtMsg = {};
  ToBoughtMsg.message = "Nothing bought yet";
  var ToBuyMsg={};
  ToBuyMsg.message=" ";
  var ToBuyItems=[
    {
      "name":"Cookies",
      "quantity":"10"
    },
    {
      name:"Chips",
      quantity:"5"
    },
    {
      name:"Cacke",
      quantity:"8"
    },
    {
      name:"Fries",
      quantity:"6"
    },
    {
      name:"Bescuits",
      quantity:"4"
    }
  ];

  service.getitems=function(){
    return ToBuyItems;
  }
  service.bought=function(itemindex){
    boughtItem=ToBuyItems.splice(itemindex,1);
    ToBoughtItems.push(boughtItem[0]);
    ToBoughtMsg.message="";
    if(ToBuyItems.length==0){
    ToBuyMsg.message="Everything is bought!";
  }
  }
  service.show = function(){
    return ToBoughtItems;
  }
  service.IfNoBoughtItems = function(){
    return ToBoughtMsg;
  }

  service.IfNoBuyItems = function(){
    return ToBuyMsg;
}
}

function ToBuyController(ShoppingListCheckOffService){
  var buy=this;
  buy.ToBuyItems=ShoppingListCheckOffService.getitems();
  buy.boughtitem=function(itemindex){
  ShoppingListCheckOffService.bought(itemindex)
  };
  buy.ShowMessage=ShoppingListCheckOffService.IfNoBuyItems();
}

function AlreadyBoughtController(ShoppingListCheckOffService){
  var bought=this;

  bought.ShowMessage=ShoppingListCheckOffService.IfNoBoughtItems();

  bought.ToBoughtItems=ShoppingListCheckOffService.show();

}
})();
