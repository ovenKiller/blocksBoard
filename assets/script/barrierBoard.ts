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
    // @property
    // boardData: Array<number> = [];//加载工作应该在上一级完成。(比如barrierMenu)
    @property
    text: string = 'hello';

    @property
    capacity: number = 3;//默认为3×3的棋盘
    @property
    level: number = 0;
    @property
    blockSize: number = 300
    @property
    scoreBoardSize: number = 300
    @property(cc.Prefab)
    blockPrefab:cc.Prefab = null;
    @property(cc.Prefab)
    scoreBoardPrefab:cc.Prefab = null;
    @property(cc.Component)
    dataScript: cc.Component = null;
    @property(cc.Node)
    timerNode: cc.Node = null;
    @property
    rowScoreList: Array<cc.Node>=null;//scoreBoard对象
    @property
    colScoreList: Array<cc.Node>=null;
   // blocks:Array<cc.Node>;
    // LIFE-CYCLE CALLBACKS:
    @property(cc.Label)
    passSignal: cc.Label = null;
    
    @property
    totalScore: number = 0;
    onLoad () {
        this.passSignal.node.z = -1;
        this.dataScript = cc.find("gameData").getComponent("gameData");
        this.node.getChildByName("backButton").on('mousedown',this.gotoMenu,this);
     //   cc.log(this.dataScript.data);
        this.creatBoard();
    }
    gotoMenu(){
        if(this.dataScript.gameMode == 0)
        cc.director.loadScene("barrierMenu");
        else{
            cc.director.loadScene("challengeMenu");
        }
    }
    creatBoard(){
        this.capacity = parseInt(Math.sqrt(this.dataScript.data.length));
        this.rowScoreList = new Array<cc.Node>();
        this.colScoreList = new Array<cc.Node>();
        let start: number = -(this.capacity/2-0.5);
        for(let i = 0; i < this.capacity; i++){
            //rowScoreList记录一行的得分，其排列为竖列。
            this.rowScoreList.push(this.spawnScoreBoard((start-1)*this.blockSize+50,(start+i)*this.blockSize));

            //cc.log("OK");
            //colScoreList记录一列的得分，其排列是横列。

            this.colScoreList.push(this.spawnScoreBoard((start+i)*this.blockSize+50,(-start+1)*this.blockSize));
            for(let j = 0; j < this.capacity; j++){
                this.spawnBlocks((start+j)*this.blockSize+50,(start+i)*this.blockSize,i,j);
            }
        }
        let i = 0;
        for(i = 0; i < this.capacity*this.capacity; i+=this.capacity){/*每列数据*/
            let tmp = 0;
            for(let j = i; j < i+this.capacity; ++j){
                tmp += Number((this.dataScript.data[j]));
            }
            this.rowScoreList[parseInt(i/this.capacity)].getChildByName("goal").getComponent(cc.Label).string = tmp;
            this.rowScoreList[parseInt(i/this.capacity)].getComponent("scoreBoard").goal = tmp;
            if(tmp == 0) this.totalScore++;
            
            //;goalNode.getComponent(cc.Label).string = tmp;
          //  goalNode.getComponent("scoreBoard").goal = tmp;
        }
        for(i = 0; i < this.capacity; i++){/*每列数据*/
            let tmp = 0;
            for(let j = i; j < this.capacity*this.capacity; j+=this.capacity){
                tmp += Number((this.dataScript.data[j]));
            }
            if(tmp == 0) this.totalScore++;
           this.colScoreList[i].getChildByName("goal").getComponent(cc.Label).string = tmp;
           this.colScoreList[i].getComponent("scoreBoard").goal = tmp;
        }
    }

    spawnBlocks(x:number = 0.1, y:number = 0.1,row:number, col:number){
        let newblock = cc.instantiate(this.blockPrefab);
        newblock.setPosition(x,y);
        let blockScript = newblock.getComponent("block")
        blockScript.row = row;
        blockScript.col = col;
        blockScript.board = this;
        newblock.width = this.blockSize;
        newblock.height = this.blockSize;
        this.node.addChild(newblock);
      //  this.blocks.push(newblock);
    }
    spawnScoreBoard(x:number = 0.1, y:number = 0.1):cc.Node {
        let newboard = cc.instantiate(this.scoreBoardPrefab);
        newboard.setPosition(x,y);
        newboard.getComponent("scoreBoard").game = this.node;
        newboard.getComponent("scoreBoard").gameScript = this;
        newboard.width = this.scoreBoardSize;
        newboard.height = this.scoreBoardSize;
        this.node.addChild(newboard);
        return newboard;
    }
    start () {

    }

    update (dt) {
        if(this.totalScore == 2* this.capacity)
        {this.passSignal.node.opacity = 255;
            this.timerNode.getComponent("timer").timingEnd();
        }
        else
        this.passSignal.node.opacity = 0;
    }
}
