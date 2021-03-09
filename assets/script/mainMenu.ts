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

    @property(cc.Node)
    barrierMode: cc.Node = null;
    @property(cc.Node)
    challengeMode: cc.Node = null;
    // LIFE-CYCLE CALLBACKS:


    onLoad () {
        cc.game.addPersistRootNode(cc.find("gameData"));
     //   this.barrierMode = this.node.getChildByName("barrierButton");
        this.barrierMode.on('mousedown',this.gotoBarrier,this);
        this.challengeMode.on('mousedown',this.gotoChallenge,this);
    }
    gotoBarrier(){
        cc.find("gameData").getComponent("gameData").gameMode = 0;
        cc.director.loadScene("barrierMenu");
    }
    gotoChallenge(){
        cc.find("gameData").getComponent("gameData").gameMode = 1;
        cc.director.loadScene("challengeMenu");
    }

    start () {

    }

    // update (dt) {}
}
