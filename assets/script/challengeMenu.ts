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

    // LIFE-CYCLE CALLBACKS:

    @property(cc.Component)
    dataScript: cc.Component = null;
    onLoad () {
        this.dataScript = cc.find("gameData").getComponent("gameData");
        let scriptTmp = this.dataScript;
        for(let i = 0; i < 3; ++i){
            this.node.getChildByName("level"+(2*i+3)).on("mousedown",function(){
                let strTmp:string = "";
                for(let j = 0;j < (2*i+3)*(2*i+3); ++j){
                    strTmp+=Math.floor(Math.random()*10)%2;
                }
                scriptTmp.data = strTmp;
                cc.log(scriptTmp.data);
                cc.director.loadScene("barrierGame");
            })
        }
        this.node.getChildByName("backButton").on("mousedown",function(){
            cc.director.loadScene("mainMenu");
        })
    }

    start () {

    }

    // update (dt) {}
}
