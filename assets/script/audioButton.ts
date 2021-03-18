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
    @property(cc.Component)
    dataScript: cc.Component = null;
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.dataScript = cc.find("gameData").getComponent("gameData");
        let status: boolean = this.dataScript.audioOn;
        if(status) {
            this.node.getChildByName("on").opacity = 255;
            this.node.getChildByName("off").opacity = 0;
        }
        else{
            this.node.getChildByName("on").opacity = 0;
            this.node.getChildByName("off").opacity = 255;
        }
        this.node.on("mousedown",function(){
            this.dataScript.audioOn = !this.dataScript.audioOn;
            let status: boolean = this.dataScript.audioOn;
            if(status) {
                this.node.getChildByName("on").opacity = 255;
                this.node.getChildByName("off").opacity = 0;
            }
            else{
                this.node.getChildByName("on").opacity = 0;
                this.node.getChildByName("off").opacity = 255;
            }
        },this)
    }
    start () {

    }

    // update (dt) {}
}
