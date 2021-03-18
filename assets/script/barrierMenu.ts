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
    back:cc.Button = null;

    dataScript: cc.Component = null;
    // LIFE-CYCLE CALLBACKS:
    // @property(cc.TextAsset)
    // rawBarrierData:cc.TextAsset = null;
    // @property
    // barrierData: Array<Array<number>> = new Array<Array<number>>();//存储关卡数据
    // loadData(){
    //     // this.barrierData.push(new Array<number>());
    //     // for(let i:number = 0; i < this.rawBarrierData.text.length;++i){
    //     //     if(this.rawBarrierData.text[i]=='\n'){
    //     //         this.barrierData.push(new Array<number>());
    //     //         continue;
    //     //     }
    //     //     if(this.rawBarrierData.text[i]=='1')
    //     //     this.barrierData[this.barrierData.length-1].push(1);
    //     //     if(this.rawBarrierData.text[i]=='0')
    //     //     this.barrierData[this.barrierData.length-1].push(1);
    //     // }
    // }
    onLoad () {
        this.dataScript= cc.find("gameData").getComponent("gameData");
        for(let i = 1; i <= 20; ++i){
            if(this.dataScript.record[i-1] == -1)
            this.node.getChildByName("barr"+i).getChildByName("checkedSignal").opacity = 0;

            this.node.getChildByName("barr"+i).on("mousedown",function(){
                this.dataScript.playTouchAudio();
                this.dataScript.data = this.dataScript.barrierData[i-1];
                this.dataScript.level = i-1;
                cc.director.loadScene("game");
            },this);
        }
        
        this.node.getChildByName("backButton").on("mousedown",function(){
            this.dataScript.playTouchAudio();
            cc.director.loadScene("mainMenu");
        },this)
        // let bar1:cc.Node = this.node.getChildByName("barr1");
        // bar1.on('mousedown',this.gotoGame,this);
        //cc.log(cc.find("gameData").getComponent("gameData").data);
        // this.loadData();
    }

    start () {

    }

    // update (dt) {}
}
