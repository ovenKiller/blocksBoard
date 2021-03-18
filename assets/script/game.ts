// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    // @property
    // boardData: Array<number> = [];//加载工作应该在上一级完成。(比如barrierMenu)
    // @property
    // capacity: number = 3;//默认为3×3的棋盘
    // @property
    // level: number = 0;
    vectory :boolean = false;
    @property
    blockScale: number = 0.3
    @property
    scoreBoardSize: number = 300
    @property(cc.Prefab)
    blockPrefab:cc.Prefab = null;
    @property(cc.Prefab)
    passSignalPrefab:cc.Prefab = null;
    @property
    pass:boolean = false;
    @property(cc.AudioClip)
    vectoryAudio: cc.AudioClip = null;
    // @property(cc.Prefab)
    // scoreBoardPrefab:cc.Prefab = null;
    @property(cc.Component)
    dataScript: cc.Component = null;
    @property(cc.Node)
    timerNode: cc.Node = null;
    @property
    rowScoreList: Array<cc.Node>=null;//scoreBoard对象
    @property
    colScoreList: Array<cc.Node>=null;
    @property
    blocksScript: Array<Array<cc.Component>> = [];
    rowSize: number = 0;
    colSize: number = 0;
   // blocks:Array<cc.Node>;
    // LIFE-CYCLE CALLBACKS:
    passSignalNode: cc.Node = null;
    
    @property
    totalScore: number = 0;
    onLoad () {
        this.dataScript = cc.find("gameData").getComponent("gameData");
        this.node.getChildByName("restartButton").on("mousedown",this.restart,this);
        this.node.getChildByName("backButton").on('mousedown',this.gotoMenu,this);

     //   cc.log(this.dataScript.data);

        this.creatBoard();
        this.creatPassSignal();
        this.setHandle();
        this.setNextLevelButton();

    }
    creatPassSignal(){
        this.passSignalNode = cc.instantiate(this.passSignalPrefab);
        this.passSignalNode.setPosition(0,0);
        this.passSignalNode.opacity = 255;
        this.node.addChild(this.passSignalNode);
    }
    gotoMenu(){
        this.dataScript.playTouchAudio();
        cc.audioEngine.resumeAll();
        if(this.dataScript.gameMode == 0)
        cc.director.loadScene("barrierMenu");
        else{
            cc.director.loadScene("challengeMenu");
        }
    }
    creatBoard(){
        // this.capacity = parseInt(Math.sqrt(this.dataScript.data.length));
        this.colSize = Number(this.dataScript.data[0]);//共有几行
        this.rowSize = Number(this.dataScript.data[1]);//共有几列
        // this.rowScoreList = new Array<cc.Node>();
        // this.colScoreList = new Array<cc.Node>();
        let rowStart: number = 0.5-(this.rowSize/2);
        let colStart: number = 0.5-(this.colSize/2);
        for(let i = 0; i < this.colSize; i++){
            // //rowScoreList记录一行的得分，其排列为竖列。
            // this.rowScoreList.push(this.spawnScoreBoard((start-1)*this.blockSize+50,(start+i)*this.blockSize));

            // //cc.log("OK");
            // //colScoreList记录一列的得分，其排列是横列。
            // this.colScoreList.push(this.spawnScoreBoard((start+i)*this.blockSize+50,(-start+1)*this.blockSize));
            for(let j = 0; j < this.rowSize; j++){
                this.spawnBlocks((rowStart+j)*(150*this.blockScale*0.95),(colStart+i)*(150*this.blockScale),i,j);
            }
        }
        // let i = 0;
        // for(i = 0; i < this.capacity*this.capacity; i+=this.capacity){/*每列数据*/
        //     // let tmp = 0;
        //     for(let j = i; j < i+this.capacity; ++j){
        //         tmp += Number((this.dataScript.data[j]));
        //     }
        //     // this.rowScoreList[parseInt(i/this.capacity)].getChildByName("goal").getComponent(cc.Label).string = tmp;
        //     // this.rowScoreList[parseInt(i/this.capacity)].getComponent("scoreBoard").goal = tmp;
        //     if(tmp == 0) this.totalScore++;
            
        //     //;goalNode.getComponent(cc.Label).string = tmp;
        //   //  goalNode.getComponent("scoreBoard").goal = tmp;
        // }
        // for(i = 0; i < this.capacity; i++){/*每列数据*/
        //     let tmp = 0;
        //     for(let j = i; j < this.capacity*this.capacity; j+=this.capacity){
        //         tmp += Number((this.dataScript.data[j]));
        //     }
        //     if(tmp == 0) this.totalScore++;
        //    this.colScoreList[i].getChildByName("goal").getComponent(cc.Label).string = tmp;
        //    this.colScoreList[i].getComponent("scoreBoard").goal = tmp;
        // }
    }
    restart(){
        this.dataScript.playTouchAudio();
        this.vectory = false;
        for(let i:number = 0; i < this.colSize; ++i){
            for(let j:number = 0; j < this.rowSize; ++j){
                if(this.blocksScript[i][j].exist && (this.dataScript.data[2 + i*this.rowSize+j]=='0')){
                    this.blocksScript[i][j].changeStatus();
                }
                if((this.dataScript.data[2+ i*this.rowSize+j]=='1')&&(this.blocksScript[i][j].exist == false)){
                    this.blocksScript[i][j].changeStatus();
                }
            }
        }
          cc.audioEngine.resumeAll();
    }
    spawnBlocks(x:number = 0.1, y:number = 0.1,row:number, col:number){
        let newblock = cc.instantiate(this.blockPrefab);
        newblock.scale = this.blockScale;
        newblock.setPosition(x,y);
        let blockScript = newblock.getComponent("block");
        // blockScript.row = row;
        // blockScript.col = col;
        blockScript.gameBoard = this;
        // newblock.width = this.blockSize;
        // newblock.height = this.blockSize;
        this.node.addChild(newblock);
        if(row == this.blocksScript.length){
            this.blocksScript.push(Array<cc.Component>());
        }
        if(this.dataScript.data[row*this.rowSize+col+2]=='1')
        newblock.getComponent("block").appear();
        // newblock.on("mousedown",function(){
        //     for(let i: number = 0; i < 3; ++i){
        //         if(i == col) continue;
        //         cc.log(this.blockScript);
        //         this.blocksScript[row][i].changeStatus();
        //     }
        // });
        this.blocksScript[row].push(blockScript);
        // cc.log(this.blocksScript);
      //  this.blocks.push(newblock);
    }

    setNextLevelButton(){
      
        this.node.getChildByName("nextButton").on("mousedown",function(){
            cc.audioEngine.resumeAll();
            this.dataScript.playTouchAudio();
            if(this.dataScript==false) return;
            if((this.dataScript.level < 0)||(this.dataScript.level>=19))
            return;
            // this.destroyBoard();
            this.dataScript.level += 1;
            this.dataScript.data = this.dataScript.barrierData[this.dataScript.level];
            // this.dataScript.pass = false;
            // this.creatBoard();
            // this.setHandle();
            cc.director.loadScene("testScene");
        },this);
    }
    // destroyBoard(){
    //     for(let i = 0; i < this.colSize; ++i){
    //         for(let j = 0; j < this.rowSize; ++j){
    //             this.blocksScript[i][j].node.destroy();
    //         }
    //     }
    // }
    setHandle(){
        let colSizeTmp:number = this.colSize;
        let rowSizeTmp:number = this.rowSize;
        for(let i:number = 0; i < colSizeTmp; ++i){
            for(let j:number = 0; j < rowSizeTmp; ++j){
            let blockScriptTmp = this.blocksScript;
                this.blocksScript[i][j].node.on("mousedown",function(){
                    this.dataScript.playGameTouchAudio();
                    if(this.dataScript.pass == true)
                    return;
                    for(let k = 0; k < rowSizeTmp; ++k){
                        if(k == j) continue;
                        blockScriptTmp[i][k].changeStatus();
                    }
                    for(let k = 0; k < colSizeTmp; ++k){
                        blockScriptTmp[k][j].changeStatus();
                    }
                },this);
            }
        }
    }

    // handleBlock(row: number, col:number){
    //     for(let i: number = 0; i < this.capacity; ++i){
    //         if(i == col) continue;
    //         this.blocksScript.changeStatus();
    //     }
    // }

    // spawnScoreBoard(x:number = 0.1, y:number = 0.1):cc.Node {
    //     let newboard = cc.instantiate(this.scoreBoardPrefab);
    //     newboard.setPosition(x,y);
    //     newboard.getComponent("scoreBoard").game = this.node;
    //     newboard.getComponent("scoreBoard").gameScript = this;
    //     newboard.width = this.scoreBoardSize;
    //     newboard.height = this.scoreBoardSize;
    //     this.node.addChild(newboard);
    //     return newboard;
    // }
    start () {

    }

    gameOver(){
        this.vectory = true;
        cc.audioEngine.pauseAll();
        cc.audioEngine.playEffect(this.vectoryAudio,false);
        this.dataScript.pass = true;
        this.passSignalNode.opacity = 255;
        if(this.dataScript.level < 20 )
        this.node.getChildByName("nextButton").opacity = 255;
        this.timerNode.getComponent("timer").timingEnd();
        if(this.dataScript.gameMode == 1){
            let timeIntTmp = this.node.getChildByName("timer").getComponent("timer").getTimeInt();
            if((this.dataScript.record[this.dataScript.level] == -1)||(timeIntTmp < this.dataScript.record[this.dataScript.level])){
                this.dataScript.record[this.dataScript.level] = timeIntTmp;
                // this.node.getChildByName("newRecordSignal").opacity = 255;
            }
        }
        else{
            this.dataScript.record[this.dataScript.level] = 1;
        }
    }

    update (dt) {
        if(this.totalScore == this.colSize* this.rowSize)
        {   if(!this.vectory)
            this.gameOver();
        }
        else
        {
            this.passSignalNode.opacity = 0;
            this.dataScript.pass=false;
            this.node.getChildByName("nextButton").opacity = 0;
            // this.node.getChildByName("newRecordSignal").opacity = 0;
        }
    }
}
