// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property
    time: string = '00:00';

    @property(cc.Node)
    gameBoard:cc.Node = null;
    @property(cc.Label)
    timeInfo:(cc.Label) = null;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        this.timeInfo = this.node.getComponent(cc.Label);
        this.timingStart();
    }
    timingStart(){
        let second:number = 0;
        let minite: number = 0;
        this.timeInfo.schedule(function()
        {
            if(second == 59){
                minite++;
            }
            second = (second+1)%60;
            this.string = ""+minite+":"+second;
        },1)
    }
    timingEnd(){
        this.timeInfo.unscheduleAllCallbacks();
    }
    // update (dt) {}
}
