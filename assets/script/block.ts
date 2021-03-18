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
    // @property
    // row: number = 0;
    // @property
    // col: number = 0;
    @property(cc.Node)
    gameBoard: cc.Node = null;

    onLoad () {
        this.node.getChildByName("button").getChildByName("cat").getComponent(cc.Sprite).spriteFrame = cc.find("gameData").getComponent("gameData").catPics[Math.floor(Math.random()*100)%17];
        this.node.getChildByName("button").scale = 0;
     }
    changeStatus(){
        if(this.gameBoard.pass) return;
        if(this.exist) this.disappear();
        else this.appear();
    }
    disappear(){
        // this.board.colScoreList[this.col].getComponent("scoreBoard").dropScore();
        // this.board.rowScoreList[this.row].getComponent("scoreBoard").dropScore();
        this.exist = false;
        cc.tween(this.node.getChildByName("button")).to(0.6,{scale: 0},{easing:"cubicOut"}).start();
        this.gameBoard.totalScore--;
    }
    appear(){
        // this.board.colScoreList[this.col].getComponent("scoreBoard").gainScore();
        // this.board.rowScoreList[this.row].getComponent("scoreBoard").gainScore();
        this.exist = true;
        cc.tween(this.node.getChildByName("button")).to(0.6,{scale: 1},{easing:"cubicOut"}).start();
        this.gameBoard.totalScore++;
    }
    start () {

    }

    //update (dt) {}
}
