// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    @property(cc.Component)
    dataScript: cc.Component = null;



    onLoad () {
        this.dataScript = cc.find("gameData").getComponent("gameData");
        this.dataScript.stopGlobalBGM();
        this.dataScript.stopChallengeBGM();
        this.dataScript.playChallengeBGM();
        let scriptTmp = this.dataScript;
        for(let i = 0; i < 3; ++i){
            this.node.getChildByName("level"+(2*i+3)).on("mousedown",function(){

                this.dataScript.playTouchAudio();
                this.generateData(2*i+3);
                // let strTmp:string = ""+(2*i+3)+(2*i+3);
                this.dataScript.level = i+20;
                // // for(let j = 0;j < (2*i+3)*(2*i+3)-1; ++j){
                // //     tmp = Math.floor(Math.random()*10)%2;
                // //     a += tmp;
                // //     strTmp+=tmp;
                // // }
                // // if(a % 2 == 0){
                // //     strTmp+=1；
                // // }
                // // else strTmp+=0;
                // for(let k: number = 0; k < 2*i+3; ++k){
                //     let a:number = 0;
                //     let tmp: number = 0;
                //     for(let t: number = 0; t < 2*i+2; ++t){
                //         tmp = Math.floor(Math.random()*10)%2;
                //         a += tmp;
                //         strTmp += tmp;
                //     }
                // if((a % 2) == 0){
                //     strTmp += 1;
                // }
                // else strTmp+=0;

                // }
                // scriptTmp.data = strTmp;
                cc.director.loadScene("game");
            },this)
        }
        this.node.getChildByName("backButton").on("mousedown",function(){
            this.dataScript.playTouchAudio();
            this.dataScript.stopGlobalBGM();
            this.dataScript.stopChallengeBGM();
            this.dataScript.playGlobalBGM();
            cc.director.loadScene("mainMenu");
        },this)
    }

    generateData(rowSize: number){
        let origin: Array<number> = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
        let t: number = (Math.floor(Math.random()*113)%5)*2+3;
        for(let i:number = 0; i < t; ++i)
        this.changeArray(origin,rowSize,Math.floor(Math.random()*113)%(rowSize*rowSize));
        this.dataScript.data = ""+rowSize+rowSize+origin.join("").substr(0,rowSize*rowSize);
    }

    changeArray(origin: Array<number>,rowLength:number,k:number){
        let row:number = Math.floor(k / rowLength);
        let col = k % rowLength;
    
        for (let i = col; i < rowLength * rowLength; i += rowLength) {
            origin[i] = (origin[i]==0)?1:0;
        }
        for (let i = rowLength * row; i < rowLength * (row + 1); ++i) {
            origin[i] = (origin[i]==0)?1:0;
        }
        origin[k] = (origin[k]==0)?1:0;
    }

    start () {

    }

    // update (dt) {}
}
