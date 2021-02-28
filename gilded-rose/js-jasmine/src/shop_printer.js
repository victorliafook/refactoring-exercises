class ShopPrinter {
  constructor(shop) {
    if (!!shop === false) {
      throw new Error();
    }
    this.shop = shop;
  }
  
  print(days) {
    let returnValue = "";
    
    for (let day = 0; day < days; day++) {
      returnValue += `-------- day ${day} --------\n`;
      returnValue += "name, sellIn, quality\n";
      this.shop.items.forEach(item => {
        returnValue += `${item.name}, ${item.sellIn}, ${item.quality}\n`
      });
      returnValue += "\n";
      
      this.shop.updateQuality();
    }
    
    return returnValue;
  }
}

module.exports = {
  ShopPrinter
}