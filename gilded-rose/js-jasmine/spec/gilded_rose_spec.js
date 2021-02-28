var {Shop, Item} = require('../src/gilded_rose.js');

describe("Gilded Rose", function() {

  it("should degrade standard items correctly - 1 per day and 2 per day after sellIn day", function() {
    const originalQuality = 5;
    const originalSellInDays = 2;
    let standardItem = new Item("foo", originalSellInDays, originalQuality);
    
    const gildedRose = new Shop([standardItem]);
    
    let items;
    for (let days = 1; days <= originalSellInDays; days++) {
      items = gildedRose.updateQuality();
      expect(items[0].quality).toEqual(originalQuality - days);
    }
    
    let sellInDayQuality = items[0].quality;
    items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(sellInDayQuality - 2);
  });
  
  it("should improve antique items - 1 per day and 2 per day after sellIn day", function() {
    const originalQuality = 5;
    const originalSellInDays = 2;
    let antiqueItem = new Item("Aged Brie", originalSellInDays, originalQuality);
    
    const gildedRose = new Shop([antiqueItem]);
    
    let items;
    for (let days = 1; days <= originalSellInDays; days++) {
      items = gildedRose.updateQuality();
      expect(items[0].quality).toEqual(originalQuality + days);
    }
    
    let sellInDayQuality = items[0].quality;
    items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(sellInDayQuality + 2);
  });
  
  it("should handle event passes with more than 10 days to sellIn day", function() {
    const originalQuality = 5;
    const originalSellInDays = 15;
    let antiqueItem = new Item("Backstage passes to a TAFKAL80ETC concert", originalSellInDays, originalQuality);
    
    const gildedRose = new Shop([antiqueItem]);
    
    let items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(originalQuality + 1);
  });
  
  it("should handle event passes between 10 and 5 days to sellIn day", function() {
    const originalQuality = 5;
    const originalSellInDays = 10;
    let antiqueItem = new Item("Backstage passes to a TAFKAL80ETC concert", originalSellInDays, originalQuality);
    
    const gildedRose = new Shop([antiqueItem]);
    
    let items;
    let currentExpectedQuality = originalQuality;
    for (let days = originalSellInDays; days > 5; days--) {
      items = gildedRose.updateQuality();
      currentExpectedQuality += 2;
      expect(items[0].quality).toEqual(currentExpectedQuality);
    }
  });
  
  it("should expire event passes after sellIn day", function() {
    const originalQuality = 50;
    const originalSellInDays = 0;
    let antiqueItem = new Item("Backstage passes to a TAFKAL80ETC concert", originalSellInDays, originalQuality);
    
    const gildedRose = new Shop([antiqueItem]);
    
    let items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(0);
  });
  
  it("should handle event passes between 5 and 0 days to sellIn day", function() {
    const originalQuality = 5;
    const originalSellInDays = 5;
    let antiqueItem = new Item("Backstage passes to a TAFKAL80ETC concert", originalSellInDays, originalQuality);
    
    const gildedRose = new Shop([antiqueItem]);
    
    let items;
    let currentExpectedQuality = originalQuality;
    for (let days = originalSellInDays; days > 0; days--) {
      items = gildedRose.updateQuality();
      currentExpectedQuality += 3;
      expect(items[0].quality).toEqual(currentExpectedQuality);
    }
  });
  
  it("should never degrade legendary items", function() {
    const originalQuality = 5;
    const originalSellInDays = 0;
    let legendaryItem = new Item("Sulfuras, Hand of Ragnaros", originalSellInDays, originalQuality);
    
    const gildedRose = new Shop([legendaryItem]);
    
    let items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(originalQuality);
    
    items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(originalQuality);
  });
  
  it("should never degrade the quality of an item below 0", function() {
    const originalQuality = 0;
    const originalSellInDays = 0;
    
    let inventory = [];
    inventory.push(new Item("foo", originalSellInDays, originalQuality));
    inventory.push(new Item("Aged Brie", originalSellInDays, originalQuality));
    inventory.push(new Item("Sulfuras, Hand of Ragnaros", originalSellInDays, originalQuality));
    inventory.push(new Item("Backstage passes to a TAFKAL80ETC concert", originalSellInDays, originalQuality));
    
    const gildedRose = new Shop(inventory);
    items = gildedRose.updateQuality();
    items.forEach(item => {
      expect(item.quality).toBeGreaterThanOrEqual(0);
    });
    
  });

});
