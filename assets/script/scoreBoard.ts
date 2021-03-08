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

    score: number = 0;
    goal: number = 0;
    // LIFE-CYCLE CALLBACKS:
    @property(cc.Node)
    game = null;//指向上一级游戏
    @property(cc.Component)
    gameScript: cc.Component = null;
    onLoad () {
        this.setGoal(3);
    }
    gainScore(){
        this.score++;
        this.node.getChildByName("score").getComponent(cc.Label).string = this.score+"/";
        if(this.score == this.goal) ++this.gameScript.totalScore;
        if(this.score == this.goal+1)--this.gameScript.totalScore;
    }
    dropScore(){
            this.score--;
            this.node.getChildByName("score").getComponent(cc.Label).string = this.score+"/";
            if(this.score == this.goal) ++this.gameScript.totalScore;
            if(this.score == this.goal-1)--this.gameScript.totalScore;
        }
    setGoal(n: number){
        this.goal = n;
        this.node.getChildByName("goal").getComponent(cc.Label).string = n;
    }
    start () {

    }

    // update (dt) {}
}
