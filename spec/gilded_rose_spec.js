const {
    GeneralItem,
    LegendaryItem,
    SpecialItem,
    Shop,
    ConjuredItem
} = require('../src/gilded_rose.js');


describe("GildedRose shop manager", () => {
    let listItems;

    beforeEach(() => {
        listItems = [];
    });

    it("Un test pour voir qualité baisse bien 1", () => {
        listItems.push(new GeneralItem("+5 Dexterity Vest", 8, 17));
        listItems.push(new GeneralItem("Mana Cake", 3, 12));

        const gildedRose = new Shop(listItems);
        const items = gildedRose.updateItems();

        const expected = [
            { sellIn: 7, quality: 16 },
            { sellIn: 2, quality: 11 },
        ];

        expected.forEach((testCase, idx) => {
            expect(items[idx].quality).toBe(testCase.quality);
            expect(items[idx].sellIn).toBe(testCase.sellIn);
        });
    });

    it("Pour un périmé avant vente,réduit la vente de UN et la qualité de DEUX", () => {
        listItems.push(new ConjuredItem("Conjured Vest", 8, 24));
        listItems.push(new ConjuredItem("Conjured Cake", 3, 9));

        const gildedRose = new Shop(listItems);
        const items = gildedRose.updateItems();

        const expected = [
            { sellIn: 7, quality: 22 },
            { sellIn: 2, quality: 7 },
        ];

        expected.forEach((testCase, idx) => {
            expect(items[idx].quality).toBe(testCase.quality);
            expect(items[idx].sellIn).toBe(testCase.sellIn);
        });
    });



    it(" Pour un produit légendaire, ne change pas sellIn, maintient la qualité à 80 ", () => {
        listItems.push(new LegendaryItem("Sulfuras Hand of Ragnaros", 2, 78));

        const gildedRose = new Shop(listItems);
        const items = gildedRose.updateItems();

        const expected = [{ sellIn: null, quality: 80 }];
        expected.forEach((testCase, idx) => {
            expect(items[idx].quality).toBe(testCase.quality);
            expect(items[idx].sellIn).toBe(testCase.sellIn);
        });
    });


    it("Tester si la qualité augmente par 3 quand il reste 5 jours ou moins (Aged Brie et Backstage passes)", () => {
        listItems.push(new SpecialItem("Backstage passes concert3", 2, 33));
        listItems.push(new SpecialItem("Aged Brie", 3, 49));

        const gildedRose = new Shop(listItems);
        const items = gildedRose.updateItems();

        const expected = [
            { sellIn: 1, quality: 36 },
            { sellIn: 2, quality: 50 },
        ];
        expected.forEach((testCase, idx) => {
            expect(items[idx].quality).toBe(testCase.quality);
            expect(items[idx].sellIn).toBe(testCase.sellIn);
        });
    });

    it("La qualité ne descends pas sous 0, si la vente n'est pas faite a 0 jour, la qualité est 0 mais jamais moins", () => {
        listItems.push(new SpecialItem("Backstage passes concert3", 0, 38));
        listItems.push(new SpecialItem("Aged Brie", 0, 49));

        const gildedRose = new Shop(listItems);
        const items = gildedRose.updateItems();

        const expected = [
            { sellIn: -1, quality: 0 },
            { sellIn: -1, quality: 0 },
        ];
        expected.forEach((testCase, idx) => {
            expect(items[idx].quality).toBe(testCase.quality);
            expect(items[idx].sellIn).toBe(testCase.sellIn);
        });


    });
});