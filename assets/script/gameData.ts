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
    gameMode: number = 0;//0为关卡模式，1为挑战模式
    pass:boolean = false;

    @property(cc.AudioClip)
    bgm1:cc.AudioClip = null;
    @property(cc.AudioClip)
    bgm2:cc.AudioClip = null;

    @property
    barrierData: Array<string> = []
    @property
    catPics: Array<cc.SpriteFrame> = []
    // LIFE-CYCLE CALLBACKS:
    @property
    record: Array<number> = [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1-1,-1,-1,-1,-1]//0-19为关卡，20：三阶 21：五阶 22：七阶
    @property (cc.AudioClip)
    touchAudio: cc.AudioClip = null;

    @property(cc.AudioClip)
    gameTouchAudio: cc.AudioClip = null;

    bgm1ID: number = -1;
    bgm2ID: number = -1;
    musicOn: boolean = true;
    audioOn: boolean = true;
    level:number = 0;//0-19为关卡，20：三阶 21：五阶 22：七阶
    onLoad () {
      this.playGlobalBGM();
      let catPicsTmp:Array<cc.SpriteFrame> = this.catPics;
      cc.resources.loadDir('cats', cc.SpriteFrame, null, function(err, spriteFrames){
        cc.find("gameData").getComponent("gameData").catPics = spriteFrames;
      });
      this.barrierData = ["140000","220001","0010010","001010111",
      "1000010011110000010010010","0010101001000100001101001","0100011110100111010100100","0101101000011101010010011","0100110010101011011110001","0010010010100010010001000","0000010011111010100101010","0100101010101010010111010",
      "0101010011110101010101000101111101010000100001001","0101010011110101010101000101111101010000100001001","0101010011110101010101000101111101010000100001001","0101010011110101010101000101111101010000100001001",
      "0000110101001001110101000101111101010000100001001","0101010011110101010101000101111101010000100001001","0101010011110101010101000101111101010000100001001","0101010011110101010101000101111101010000100001001","0101010011110101010101000101111101010000100001001"];
    }
    
    playGlobalBGM(){
      if(this.musicOn){
      let volume: number = 0;
      this.bgm1ID =  cc.audioEngine.play(this.bgm1,true,volume);
      this.schedule(function(){
        volume+=0.1;
        cc.audioEngine.setVolume(this.bgm1ID,volume)},0.2,4,0);
      }
    }
    playChallengeBGM(){
      if(this.musicOn) {
      let volume: number = 0;
      this.bgm2ID =  cc.audioEngine.play(this.bgm2,true,volume);
      this.schedule(function(){
        volume+=0.1;
        cc.audioEngine.setVolume(this.bgm2ID,volume)},0.3,4,0);
      }  
    }

    stopGlobalBGM(){
      if(this.bgm1ID!= -1)
      cc.audioEngine.stop(this.bgm1ID);
    }
    stopChallengeBGM(){
      if(this.bgm1ID!= -1)
      cc.audioEngine.stop(this.bgm2ID);
    }
    playTouchAudio(){
      if(this.audioOn)
      cc.audioEngine.playEffect(this.touchAudio,false);
    }
    playGameTouchAudio(){
      if(this.audioOn)
      cc.audioEngine.playEffect(this.gameTouchAudio,false);
    }
    start () {

    }

    // update (dt) {}
}
