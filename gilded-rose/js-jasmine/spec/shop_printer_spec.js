var fs = require('fs'); 
var {Shop, Item} = require('../src/gilded_rose.js');
var {ShopPrinter} = require('../src/shop_printer.js');

describe("Gilded Rose Printer", () => {

  it("should initialize a valid printer", () => {
    expect(() => {
      let shopPrinter = new ShopPrinter();
    }).toThrow();
    
    const gildedRose = new Shop([]);
    const shopPrinter = new ShopPrinter(gildedRose);
  });
  
  it("should print the inventory", () => {
    const items = getFixtureItems();
    const gildedRose = new Shop(items);
    const shopPrinter = new ShopPrinter(gildedRose);
    
    const fixturePrintOutput = getFixtureFile("./spec/fixtures/10DaysInventory.txt");
    let nOfDays = 10;
    expect(shopPrinter.print(nOfDays)).toEqual(fixturePrintOutput);
  });

});

const getFixtureItems = () => {
  const items = [
    new Item("+5 Dexterity Vest", 10, 20),
    new Item("Aged Brie", 2, 0),
    new Item("Elixir of the Mongoose", 5, 7),
    new Item("Sulfuras, Hand of Ragnaros", 0, 80),
    new Item("Sulfuras, Hand of Ragnaros", -1, 80),
    new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
    new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49),
    new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49),
  ];
  
  return items;
};

const getFixtureFile = (path) => {
  return fs.readFileSync(path, 'utf8');
};