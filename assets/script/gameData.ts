// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

 //   @property(cc.Label)
  //  label: cc.Label = null;

    @property
    data: string = '';
    @property
    gameMode: number = 0;

    @property
    barrierData: Array<string> = []

    @property
    catPics: Array<cc.SpriteFrame> = []
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
      let catPicsTmp:Array<cc.SpriteFrame> = this.catPics;
      cc.resources.loadDir('cats', cc.SpriteFrame, null, function(err, spriteFrames){
        cc.find("gameData").getComponent("gameData").catPics = spriteFrames;
      });
      this.barrierData = ["010001000","101001100","001001100","001010111",
      "1000010011110000010010010","0010101001000100001101001","0100011110100111010100100","0101101000011101010010011","0100110010101011011110001","0010010010100010010001000","0000010011111010100101010","0100101010101010010111010",
      "0101010011110101010101000101111101010000100001001","0101010011110101010101000101111101010000100001001","0101010011110101010101000101111101010000100001001","0101010011110101010101000101111101010000100001001",
      "0000110101001001110101000101111101010000100001001","0101010011110101010101000101111101010000100001001","0101010011110101010101000101111101010000100001001","0101010011110101010101000101111101010000100001001","0101010011110101010101000101111101010000100001001"];
    }

    start () {

    }

    // update (dt) {}
}
