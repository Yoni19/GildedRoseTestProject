import Item from "./Item"

class ConjuredItem extends Item {
    constructor(name, sellIn, quality) {
        super(name, sellIn, quality);
        this.regularQualityChannge = -2;
        this.selledQualityChange = -4;
        this.dropSellIn = -1;
        this.qualityMax = 50;
        this.qualityMin = 0;
        this.toLateToSell = 0;
    }


    controlOfQuality() {
        if (this.quality > this.qualityMax) {
            this.quality = this.qualityMax
        }
        if (this.quality < this.qualityMin) {
            this.quality = this.qualityMin
        }
    };

    update() {
        this.sellIn = this.sellIn + this.dropSellIn; //-1 decrease
        this.controlOfQuality();
        if (this.sellIn > this.toLateToSell) {
            this.quality = this.quality + this.regularQualityChannge
        } else {
            this.quality = this.quality + this.selledQualityChange
        }
        this.controlOfQuality();
    };
}

export default ConjuredItem;