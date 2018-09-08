let isMobile = new WeakMap();
let vrEnabled = new WeakMap();

export class GameModel {

	constructor() {

        this.setIsMobile(false);
        this.setVrEnabled(false);
        
    };

    getIsMobile(){
        return isMobile.get(this);
    };

    setIsMobile(value){
        isMobile.set(this, value);
    };

    getVrEnabled(){
        return vrEnabled.get(this);
    };

    setVrEnabled(value){
        if(value === undefined)vrEnabled.set(this, !this.getVrEnabled());
            else vrEnabled.set(this, value);
    };

}