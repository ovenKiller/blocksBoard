// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    dataScript:cc.Component = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.dataScript = cc.find("gameData").getComponent("gameData");
        let status: boolean = this.dataScript.musicOn;
        if(status) {
            this.node.getChildByName("on").opacity = 255;
            this.node.getChildByName("off").opacity = 0;
        }
        else{
            this.node.getChildByName("on").opacity = 0;
            this.node.getChildByName("off").opacity = 255;
        }
        this.node.on("mousedown",function(){
            this.dataScript.musicOn = !this.dataScript.musicOn;
            let status: boolean = this.dataScript.musicOn;
            if(status) {
                this.node.getChildByName("on").opacity = 255;
                this.node.getChildByName("off").opacity = 0;
                if(this.dataScript.gameMode == 0) this.dataScript.playGlobalBGM();
                else this.dataScript.playChallengeBGM();
            }
            else{
                this.node.getChildByName("on").opacity = 0;
                this.node.getChildByName("off").opacity = 255;
                cc.audioEngine.stopAll();
            }
        },this)
    }

    start () {

    }

    // update (dt) {}
}
