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

    @property
    exist:boolean = false;//方块是否存在
    // LIFE-CYCLE CALLBACKS:
    @property
    row: number = 0;
    @property
    col: number = 0;
    @property(cc.Node)
    board: cc.Node = null;
    onLoad () {
            this.node.on('mousedown',this.changeStatus,this);
    }
    changeStatus(){
        if(this.exist) this.disappear();
        else this.appear();
    }
    disappear(){
        this.board.colScoreList[this.col].getComponent("scoreBoard").dropScore();
        this.board.rowScoreList[this.row].getComponent("scoreBoard").dropScore();
        this.exist = false;
        cc.tween(this.node).to(0.3,{opacity: 50}).start();
    }
    appear(){
        this.board.colScoreList[this.col].getComponent("scoreBoard").gainScore();
        this.board.rowScoreList[this.row].getComponent("scoreBoard").gainScore();
        this.exist = true;
        cc.tween(this.node).to(0.3,{opacity: 255}).start();
    }
    start () {

    }

    //update (dt) {}
}
