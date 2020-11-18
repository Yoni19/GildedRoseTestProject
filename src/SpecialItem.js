import Item from "./Item";

class specialItem extends Item {
    constructor(name, sellIn, quality) {
        super(name, sellIn, quality);
        this.regularQualityChannge = 1;
        this.regularQualityChannge2 = 2;
        this.regularQualityChannge3 = 3;
        this.selledQualityChange = -4;
        this.toLateToSell = 10;
        this.toLateToSell2 = 5;
        this.toLateToSell3 = 0;
        this.dropSellIn = -1;
        this.qualityMax = 50;
        this.qualityMin = 0;

    }

    controlOfQuality() {
        if (this.quality > this.qualityMax) {
            this.quality = this.qualityMax;
        }
        if (this.quality < this.qualityMin) {
            this.quality = this.qualityMin;
        }
    };

    update() {
        this.sellIn += this.dropSellIn;
        this.controlOfQuality();
        if (this.sellIn > this.toLateToSell) {
            this.quality += this.toLateToSell;
        } else if (this.sellIn > this.toLateToSell2) {
            this.quality += this.regularQualityChannge2;
        } else if (this.sellIn > this.toLateToSell3) {
            this.quality += this.regularQualityChannge3;
        } else {
            this.quality = this.qualityMin;
        }
        this.controlOfQuality();
    };
}

export default specialItem;