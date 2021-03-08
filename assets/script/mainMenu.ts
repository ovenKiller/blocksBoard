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

    @property(cc.Button)
    barrierMode: cc.Button = null;
    // LIFE-CYCLE CALLBACKS:


    onLoad () {
        cc.game.addPersistRootNode(cc.find("gameData"));
        this.barrierMode = this.node.getChildByName("barrierButton");
        this.barrierMode.on('mousedown',this.gotoBarrier,this);
    }
    gotoBarrier(){
        cc.find("gameData").getComponent("gameData").gameMode = 0;
        cc.director.loadScene("barrierMenu");
    }

    start () {

    }

    // update (dt) {}
}
